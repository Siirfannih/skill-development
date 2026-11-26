#!/usr/bin/env python3
"""Mechanical governance checks for the skill-development repo.

Usage:
    python3 steward_check.py [REPO_ROOT] [--only CHECKS] [--all] [--files PATH ...]
                             [--summary | --json] [--strict]

Scope (which .md files are scanned for archive banners, references and dates):
    default   instruction files only: AGENTS.md, CLAUDE.md, PETA.md and every file under
              claude/, except SUMBER.md, RETRO.md, evals/results/, cookbook/_vault/ and
              guide/referensi/. archive/, _archive/ and steward/ are never in scope.
    --all     every active .md file in the repo (the old full scan; history and report
              files included).
    frontmatter and budget always read claude/*/SKILL.md and the always-loaded files.

Checks (names usable with --only, comma-separated):
    frontmatter   every claude/*/SKILL.md has valid YAML frontmatter; name matches
                  the folder, <= 64 chars, [a-z0-9-]; description 1..1024 chars (error).
    budget        SKILL.md body <= 500 lines and <= ~5000 tokens (warning);
                  any always-loaded file (AGENTS.md, CLAUDE.md) <= ~2000 tokens (warning).
    half-archive  a file outside archive/ or _archive/ whose first 15 lines contain a line
                  starting with an archive banner (arsip referensi, diarsipkan, archived,
                  deprecated) (error: a file is either active or archived).
    archive-ref   a file that points to an archived file (warning; files named in
                  ARCHIVE_REF_ALLOW may point to archives on purpose).
    dead-ref      a reference that does not exist (warning). References are backticked
                  paths (`x.md`, `dir/x.py`) and markdown link targets [x](path).
    section-ref   "`file.md` §Heading" references whose heading does not exist (warning).
    dated-text    a date in instruction text, written as yyyy-mm-dd or as a day and month
                  name with or without a year (English or Indonesian month names)
                  (warning; SUMBER.md and steward/ hold provenance and are not checked).

How references resolve:
    - against the citing file's folder, then each ancestor folder up to the repo root;
    - a bare file name (no "/") resolves only that way and is never reported dead: bare
      names are often files a project creates at run time (REF-SPEC.md, palet.json);
    - a path containing "/" may also match as a path suffix anywhere in the repo; an
      active match is preferred over one under archive/ or _archive/;
    - placeholders (<...>, *) and URLs are not checked.

Options:
    --files PATH ...  report only findings in these repo-relative files, to compare the files
                      a change touches against main. Put REPO_ROOT before this option.
    --summary         print only the count per check and level.
    --json            print a JSON list of findings.
    --strict          warnings also fail (exit 2).

Exit codes: 0 clean (warnings allowed), 1 errors, 2 warnings only with --strict,
3 usage error (bad option, not the repo).
Read-only: this script never modifies the repo. Needs Python 3.8+; PyYAML is optional
(without it, frontmatter is read by a simple key: value parser and YAML syntax errors are not caught).
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path
from urllib.parse import unquote

try:
    import yaml  # PyYAML
except ImportError:  # pragma: no cover
    yaml = None

ARCHIVE_DIRS = ("archive", "_archive")
SKIP_DIRS = {".git", "node_modules", "__pycache__", "projects", "research_notes",
             "reports", "external", "_vault"}
STATE_DIR = "steward"  # the steward's state folder: never an instruction file
# Default scope: instruction files (skill-steward SKILL.md section 2) minus history and notes.
ROOT_INSTRUCTION = ("AGENTS.md", "CLAUDE.md", "PETA.md")
NOT_INSTRUCTION_NAMES = {"SUMBER.md", "RETRO.md"}
NOT_INSTRUCTION_DIRS = (("evals", "results"), ("cookbook", "_vault"), ("guide", "referensi"))
# A banner is a line that STARTS with the archive marker (optionally quoted/bold), not a mention.
ARCHIVE_BANNER = re.compile(
    r"^(?:>\s*)?[*_]*\s*(?:arsip referensi|diarsipkan|archived|deprecated)\b", re.I | re.M)
# Files allowed to point at archives (migration maps, provenance logs).
ARCHIVE_REF_ALLOW = {"MIGRASI-LANTAI.md", "SUMBER.md", "CHANGELOG.md", "MIGRATION.md"}
ALWAYS_LOADED = ("AGENTS.md", "CLAUDE.md")
NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
PATH_RE = re.compile(r"`([A-Za-z0-9_./-]+\.(?:md|py|sh|ts|tsx|json|ya?ml))`")
SECTION_RE = re.compile(r"`([A-Za-z0-9_./-]+\.md)`\s*§\s*([^,;:.()`\n|]+)")
LINK_RE = re.compile(r"\[[^\]\n]*\]\(\s*<?([^)\s>]+)>?(?:\s+\"[^\"]*\")?\s*\)")
_MONTH = (r"(?:Jan(?:uary|uari)?|Feb(?:ruary|ruari)?|Mar(?:ch|et)?|Apr(?:il)?|May|Mei|Jun(?:e|i)?"
          r"|Jul(?:y|i)?|Aug(?:ust)?|Agu(?:stus)?|Agt|Sep(?:t|tember)?|Oct(?:ober)?|Okt(?:ober)?"
          r"|Nov(?:ember)?|Dec(?:ember)?|Des(?:ember)?)")
DATE_RE = re.compile(rf"\b(?:\d{{4}}-\d{{2}}-\d{{2}}|\d{{1,2}}\s+{_MONTH}(?:\s+\d{{4}})?)\b")
ALL_CHECKS = ("frontmatter", "budget", "half-archive", "archive-ref", "dead-ref", "section-ref",
              "dated-text")
SKIP = object()  # resolve(): a bare name not found near the citing file but present elsewhere


def tokens(text: str) -> int:
    """Rough token estimate: ~3.5 bytes per token for mixed Indonesian/English/code."""
    return int(len(text.encode("utf-8")) / 3.5)


def is_archived_path(rel: Path) -> bool:
    return bool(rel.parts) and rel.parts[0] in ARCHIVE_DIRS


def declares_archive(text: str) -> bool:
    head = "\n".join(text.splitlines()[:15])
    return bool(ARCHIVE_BANNER.search(head))


def active_md_files(root: Path):
    for p in root.rglob("*.md"):
        rel = p.relative_to(root)
        if any(part in SKIP_DIRS for part in rel.parts) or is_archived_path(rel):
            continue
        yield p, rel


def _has_dirs(parts: tuple, pair: tuple) -> bool:
    return any(parts[i:i + 2] == pair for i in range(len(parts) - 1))


def is_instruction(rel: Path) -> bool:
    """Default scope: AGENTS.md, CLAUDE.md, PETA.md and claude/** minus history and notes."""
    parts = rel.parts
    if len(parts) == 1:
        return rel.name in ROOT_INSTRUCTION
    if parts[0] != "claude" or rel.name in NOT_INSTRUCTION_NAMES:
        return False
    return not any(_has_dirs(parts, pair) for pair in NOT_INSTRUCTION_DIRS)


SCOPE = {"all": False}


def scanned_md_files(root: Path):
    """The files this run reports on: instruction files, or every active file with --all."""
    for p, rel in active_md_files(root):
        if rel.parts[0] == STATE_DIR:
            continue
        if SCOPE["all"] or is_instruction(rel):
            yield p, rel


def find(level, check, rel, msg):
    return {"level": level, "check": check, "file": str(rel), "message": msg}


def simple_frontmatter(block: str) -> dict:
    """Fallback when PyYAML is not installed: top-level `key: value` lines only, quotes stripped.
    Enough for name/description checks; a YAML syntax error is not detected without PyYAML."""
    out = {}
    for line in block.splitlines():
        if line[:1] in (" ", "\t", "#", "-") or ":" not in line:
            continue
        key, val = line.split(":", 1)
        val = val.strip()
        if len(val) >= 2 and val[0] == val[-1] and val[0] in "\"'":
            val = val[1:-1]
        out[key.strip()] = val
    return out


def check_frontmatter(root: Path):
    out = []
    for skill in sorted((root / "claude").glob("*/SKILL.md")):
        rel = skill.relative_to(root)
        text = skill.read_text(encoding="utf-8", errors="replace")
        m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
        if not m:
            out.append(find("error", "frontmatter", rel, "missing YAML frontmatter"))
            continue
        try:
            meta = yaml.safe_load(m.group(1)) if yaml else simple_frontmatter(m.group(1))
        except Exception as e:  # noqa: BLE001
            out.append(find("error", "frontmatter", rel, f"YAML does not parse: {e.__class__.__name__}"))
            continue
        name = str((meta or {}).get("name", ""))
        desc = str((meta or {}).get("description", ""))
        folder = skill.parent.name
        if not name:
            out.append(find("error", "frontmatter", rel, "name missing"))
        elif not NAME_RE.match(name) or len(name) > 64:
            out.append(find("error", "frontmatter", rel, f"name '{name}' must be <=64 chars of [a-z0-9-]"))
        elif name != folder:
            out.append(find("error", "frontmatter", rel, f"name '{name}' != folder '{folder}'"))
        if not desc:
            out.append(find("error", "frontmatter", rel, "description missing"))
        elif len(desc) > 1024:
            out.append(find("error", "frontmatter", rel, f"description {len(desc)} chars > 1024"))
    return out


def check_budget(root: Path):
    out = []
    for skill in sorted((root / "claude").glob("*/SKILL.md")):
        rel = skill.relative_to(root)
        text = skill.read_text(encoding="utf-8", errors="replace")
        body = re.sub(r"^---\n.*?\n---\n", "", text, count=1, flags=re.S)
        lines, tok = body.count("\n") + 1, tokens(body)
        if lines > 500 or tok > 5000:
            out.append(find("warning", "budget", rel, f"body {lines} lines / ~{tok} tokens (limit 500 / 5000)"))
    for name in ALWAYS_LOADED:
        p = root / name
        if p.exists():
            tok = tokens(p.read_text(encoding="utf-8", errors="replace"))
            if tok > 2000:
                out.append(find("warning", "budget", Path(name), f"always-loaded file ~{tok} tokens (limit 2000)"))
    return out


def check_half_archive(root: Path):
    out = []
    for p, rel in scanned_md_files(root):
        if declares_archive(p.read_text(encoding="utf-8", errors="replace")):
            out.append(find("error", "half-archive", rel,
                            "declares itself archived but lives outside archive/: move it or remove the banner"))
    return out


def archived_paths(root: Path) -> set[Path]:
    """Files that are archived: banner-declared active files (half-archives) plus archive dirs."""
    out = {p.resolve() for p, _ in active_md_files(root)
           if declares_archive(p.read_text(encoding="utf-8", errors="replace"))}
    for d in ARCHIVE_DIRS:
        if (root / d).exists():
            out |= {p.resolve() for p in (root / d).rglob("*.md")}
    return out


_INDEX: dict[Path, list[str]] = {}


def repo_index(root: Path) -> list[str]:
    """All file paths in the repo (posix, relative), excluding VCS and dependency folders."""
    if root not in _INDEX:
        _INDEX[root] = [str(p.relative_to(root)).replace("\\", "/") for p in root.rglob("*")
                        if p.is_file() and not ({".git", "node_modules", "__pycache__"} & set(p.parts))]
    return _INDEX[root]


def resolve(root: Path, src: Path, ref: str):
    """Resolve a reference (rules in the module docstring). Returns the resolved path, SKIP for
    a bare name that exists elsewhere but not near the citing file, or None when it is dead.
    Placeholders count as resolved."""
    if any(c in ref for c in "<>*"):
        return src
    base = src.parent
    while True:
        cand = base / ref
        if cand.exists():
            return cand.resolve()
        if base == root or base == base.parent:
            break
        base = base.parent
    ref = ref.lstrip("./").rstrip("/")
    if "/" not in ref:
        return SKIP  # bare names are not checked for existence (often per-project outputs)
    matches = [rel for rel in repo_index(root) if rel == ref or rel.endswith("/" + ref)]
    if not matches:
        return None
    matches.sort(key=lambda rel: is_archived_path(Path(rel)))  # active before archived
    return (root / matches[0]).resolve()


def references(text: str) -> set[str]:
    """Backticked repo paths plus local markdown link targets."""
    refs = set(PATH_RE.findall(text))
    for target in LINK_RE.findall(text):
        if "://" in target or target.startswith(("#", "mailto:")):
            continue
        target = unquote(target.split("#", 1)[0].split("?", 1)[0])
        if target:
            refs.add(target)
    return refs


def check_archive_ref(root: Path):
    out = []
    archived = archived_paths(root)
    for p, rel in scanned_md_files(root):
        if rel.name in ARCHIVE_REF_ALLOW or p.resolve() in archived:
            continue
        text = p.read_text(encoding="utf-8", errors="replace")
        hits = set()
        for ref in references(text):
            if ref.lstrip("./").split("/", 1)[0] in ARCHIVE_DIRS:
                continue  # an explicit archive/... path is a deliberate mention, not a rule source
            r = resolve(root, p, ref)
            if isinstance(r, Path) and r in archived:
                hits.add(str(r.relative_to(root.resolve())))
        if hits:
            out.append(find("warning", "archive-ref", rel, "points to archived file(s): " + ", ".join(sorted(hits))))
    return out


def check_dead_ref(root: Path):
    out = []
    for p, rel in scanned_md_files(root):
        text = p.read_text(encoding="utf-8", errors="replace")
        dead = sorted({r for r in references(text) if resolve(root, p, r) is None})
        if dead:
            out.append(find("warning", "dead-ref", rel, "missing: " + ", ".join(dead[:8]) + (" …" if len(dead) > 8 else "")))
    return out


def headings(path: Path) -> list[str]:
    return [h.lstrip("#").strip().lower() for h in path.read_text(encoding="utf-8", errors="replace").splitlines()
            if h.startswith("#")]


def check_section_ref(root: Path):
    out = []
    for p, rel in scanned_md_files(root):
        text = p.read_text(encoding="utf-8", errors="replace")
        for ref, sec in SECTION_RE.findall(text):
            target = resolve(root, p, ref)
            if not isinstance(target, Path) or not target.is_file() or (
                    target == p.resolve() and any(c in ref for c in "<>*")):
                continue
            key = sec.strip().lower()
            key = re.split(r"\s+(butir|item|step)\b", key)[0].strip()
            key = re.sub(r"[\s\d–\-+·→,]+$", "", key).strip()  # drop trailing item numbers / ranges
            hs = headings(target)
            num = re.match(r"^(\d+)", sec.strip())
            ok = any(re.match(rf"^{num.group(1)}\b", h) for h in hs) if num else (not key or any(key in h for h in hs))
            if not ok:
                out.append(find("warning", "section-ref", rel, f"`{ref}` §{sec.strip()} has no matching heading"))
    return out


def check_dated_text(root: Path):
    out = []
    for p, rel in scanned_md_files(root):
        if rel.name == "SUMBER.md":
            continue
        hits = [f"{m.group(0)} (line {n})"
                for n, line in enumerate(p.read_text(encoding="utf-8", errors="replace").splitlines(), 1)
                for m in DATE_RE.finditer(line)]
        if hits:
            out.append(find("warning", "dated-text", rel, "dates belong in SUMBER.md: " + ", ".join(hits[:5])
                            + (f" … (+{len(hits) - 5})" if len(hits) > 5 else "")))
    return out


CHECKS = {
    "frontmatter": check_frontmatter, "budget": check_budget, "half-archive": check_half_archive,
    "archive-ref": check_archive_ref, "dead-ref": check_dead_ref, "section-ref": check_section_ref,
    "dated-text": check_dated_text,
}


class Parser(argparse.ArgumentParser):
    def error(self, message):  # usage errors exit 3, not argparse's 2 (2 means warnings)
        print(f"steward_check.py: {message} (see --help)", file=sys.stderr)
        sys.exit(3)


def main(argv: list[str]) -> int:
    ap = Parser(prog="steward_check.py", description=__doc__, usage=argparse.SUPPRESS,
                formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("root", nargs="?", default=".", help=argparse.SUPPRESS)
    ap.add_argument("--only", default=",".join(ALL_CHECKS), help=argparse.SUPPRESS)
    ap.add_argument("--all", action="store_true", help=argparse.SUPPRESS)
    ap.add_argument("--files", nargs="+", default=None, help=argparse.SUPPRESS)
    out_mode = ap.add_mutually_exclusive_group()
    out_mode.add_argument("--json", action="store_true", help=argparse.SUPPRESS)
    out_mode.add_argument("--summary", action="store_true", help=argparse.SUPPRESS)
    ap.add_argument("--strict", action="store_true", help=argparse.SUPPRESS)
    a = ap.parse_args(argv)
    only = [c.strip() for c in a.only.split(",") if c.strip()]
    if not only or any(c not in CHECKS for c in only):
        print(f"unknown check in --only; valid: {','.join(ALL_CHECKS)}", file=sys.stderr)
        return 3
    root = Path(a.root)
    if not (root / "claude").is_dir():
        print(f"{root} does not look like the skill-development repo (no claude/ folder)", file=sys.stderr)
        return 3
    SCOPE["all"] = a.all
    findings = [f for c in only for f in CHECKS[c](root)]
    if a.files:
        wanted = {Path(f).as_posix().lstrip("./") for f in a.files}
        findings = [f for f in findings if Path(f["file"]).as_posix() in wanted]
    errs = sum(f["level"] == "error" for f in findings)
    if a.json:
        print(json.dumps(findings, ensure_ascii=False, indent=1))
    else:
        if a.summary:
            for (check, level), n in sorted(Counter((f["check"], f["level"]) for f in findings).items()):
                print(f"{level.upper():7} {check:12} {n}")
        else:
            for f in findings:
                print(f"{f['level'].upper():7} {f['check']:12} {f['file']}: {f['message']}")
        print(f"\n{errs} error(s), {len(findings) - errs} warning(s)")
    if errs:
        return 1
    if findings and a.strict:
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
