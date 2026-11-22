# Practitioner methods: turning observed AI failures into durable, general rules and checks (not case logs)

Research date: 22 Nov 2026. Source note: quotes were pulled from the pages listed through a fetch tool that returns extracted text. They should be close to verbatim, but check any quote against the URL before publishing it as an exact quote. Where a page was paywalled, blocked or only available through secondary summaries, this is noted.

## 1. Hamel Husain and Shreya Shankar: error analysis, axial coding, binary judges, and when (not) to build an evaluator

### Takeaway
Husain and Shankar's method runs bottom-up. Read real traces and write free-form notes (open coding). Cluster the notes into a small set of failure modes (axial coding). Fix the cheap, obvious specification gaps in the prompt first. Build an automated evaluator only for a failure that survives the prompt fix, that you will iterate on repeatedly, and whose cost of checking is justified. Each evaluator is one binary pass/fail judge per failure mode. Because "criteria drift" means criteria come from looking at outputs, the taxonomy and rules must be revisited, not frozen.

### Cited Findings
**Error analysis as the core activity**
- "Error analysis is the most important activity in evals." — [Hamel Husain & Shreya Shankar, LLM Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- "Error analysis - the single most valuable activity in AI development and consistently the highest-ROI activity." — [Husain, A Field Guide to Rapidly Improving AI Products](https://hamel.dev/blog/posts/field-guide/)
- Open coding: "review and write open-ended notes about traces, noting any issues." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- Open coding is "a technique of writing open-ended notes about observed problems"; "it is important to avoid predefined checklists of errors" such as hallucination or toxicity. — [Husain & Shankar in Pragmatic Engineer, "A pragmatic guide to LLM evals"](https://newsletter.pragmaticengineer.com/p/evals) (partly paywalled)
- Axial coding: "Group your open-ended notes into 5-10 themes", with an LLM suggesting clusters and a human refining them. — [Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/evals)
- "Axial coding is the most important step." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- Stopping rule (theoretical saturation): "Continue until new traces stop revealing failure modes or changing existing ones." "We recommend reviewing at least 100 traces." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- Annotate the first upstream failure: "Errors tend to compound, which means you can prioritize earlier ones to save time." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/). A secondary summary of Husain's Arize talk says to "identify and annotate the first thing that went wrong and move on", because fixing the root cause often fixes downstream symptoms. — [Arize, "Why AI evals fail before the evaluation begins"](https://arize.com/blog/rise-of-the-ai-engineer-why-ai-evals-fail-before-the-evaluation-begins/) (paraphrase via search summary)
- Bottom-up beats generic metrics: "The more effective bottom-up approach forces you to look at actual data and let metrics naturally emerge." "Generic metrics are worse than useless – they actively impede progress"; teams end up "tracking vanity metrics that don't correlate with real user problems." — [Field Guide](https://hamel.dev/blog/posts/field-guide/)
- "Use LLMs to scale what you've learned, not to avoid looking at data." "Quality is more important than quantity." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- "Writing a rubric before you review examples can get in the way." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)

**Three gulfs, used to diagnose which fix applies**
- Gulf of Comprehension: "The gap between a developer and a true understanding of their data and the model's behavior at scale." Gulf of Specification: "The gap between what we want the LLM to do, and what our prompts actually instruct it to do." Gulf of Generalization: "The gap between a well-written prompt and the model's ability to apply those instructions reliably" across unfamiliar inputs. — [Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/evals)
- Specification gaps call for prompt or instruction fixes. Generalization gaps can persist "even with perfect instructions", which is where evaluators and other interventions earn their cost (secondary summary of the framework). — [ByteByteGo, "Evals for AI Engineers" excerpt](https://blog.bytebytego.com/p/evals-for-ai-engineers)
- Husain warns that when the product fails to gather the constraints the model needs, "the model has to guess". Some failures belong to the product or context, not the prompt or the evaluator (secondary summary). — [Arize](https://arize.com/blog/rise-of-the-ai-engineer-why-ai-evals-fail-before-the-evaluation-begins/)

**When not to write an evaluator (rule vs one-off fix)**
- "Focus automated evaluators on failures that persist after fixing your prompts." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- "Fix these obvious gaps first before building complex evaluation infrastructure." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- "Only build expensive evaluators for problems you'll iterate on repeatedly." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- "Write evaluators for errors you discover, not errors you imagine." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- Cost tiering: "If you can catch an error with a simple assertion or regex check, the cost is minimal and probably worth it. But if you need to align an LLM-as-judge evaluator, consider whether the failure mode warrants that investment." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- "If a failure can be verified with code, always use a code-based eval." Code evals are "cheaper to create and maintain." LLM judges are for nuance: "A code-based test can't evaluate this kind of nuance." — [Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/evals)
- "Be wary of optimizing for high eval pass rates." "If you're passing 100% of your evals, you're likely not challenging your system enough." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)

**Binary pass/fail criteria and judge scoping**
- "Binary evaluations force clearer thinking and more consistent labeling." With Likert scales, "annotators often default to middle values to avoid making hard decisions." "Start with binary labels to understand what 'bad' looks like." "Numeric labels are advanced and usually not necessary." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- "a binary pass/fail forces evaluators to make a clear judgment: did this output achieve its purpose or not?" — [Field Guide](https://hamel.dev/blog/posts/field-guide/)
- "People don't know what to do with a 3 or 4." — [Husain, "Creating a LLM-as-a-Judge That Drives Business Results"](https://hamel.dev/blog/posts/llm-judge/)
- Pair each verdict with a written critique: "In addition to the pass/fail decision, the domain expert should write a critique that explains their reasoning." It "should be detailed enough so that you can use it in a few-shot prompt for a LLM judge"; "Being too terse is a common mistake." — [LLM-judge post](https://hamel.dev/blog/posts/llm-judge/)
- One judge per failure mode: "we recommend building a separate judge for each type of failure." "The most common mistake people make is directing their LLM judge to catch too many different kinds of errors at once." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- Scope a judge's context: "Do not give every judge the same full trace by default." "Extra context can cause context rot and make the judge worse." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- Judge alignment is iterated against one principal expert: "It took us only three iterations to achieve > 90% agreement between the LLM and Phillip." — [LLM-judge post](https://hamel.dev/blog/posts/llm-judge/)
- "The real value of this process is looking at your data and doing careful analysis." Husain calls the judge a "hack" to "trick people into carefully looking at their data!" — [LLM-judge post](https://hamel.dev/blog/posts/llm-judge/)

**Criteria drift: rules come out of observation**
- "we identify a phenomenon we dub criteria drift: users need criteria to grade outputs, but grading outputs helps users define criteria." "some criteria appears dependent on the specific LLM outputs observed", "raising serious questions for approaches that assume the independence of evaluation from observation of model outputs." — [Shankar, Zamfirescu-Pereira, Hartmann, Parameswaran, Arawjo, "Who Validates the Validators?" (arXiv 2404.12272)](https://arxiv.org/abs/2404.12272)
- "it is impossible to completely determine evaluation criteria prior to human judging of LLM outputs." — [Field Guide](https://hamel.dev/blog/posts/field-guide/)
- Optimizers cannot replace this step: automated prompt optimization "can refine a prompt to perform better on known failures, but it cannot discover _new_ ones"; "evaluation is an iterative, human-driven sensemaking process, not a static target that can be set once and handed off to an optimizer." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)

**Regression (CI) evals and guardrails**
- "CI evals protect against known regressions before deployment." "Test datasets for CI are small (in many cases 100+ examples) and purpose-built." "Favor assertions or other deterministic checks over LLM-as-judge evaluators." From production, "add representative examples to your CI dataset." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- Guardrails are "inline safety checks". "Apply guardrails for immediate protection against objective failures requiring intervention." "Use evaluators for monitoring and improving subjective or nuanced criteria." "you would almost never use a slow or non-deterministic LLM-as-Judge as a synchronous guardrail." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)

### Inferences
- These sources imply a promotion ladder for a failure: (1) a note in open coding (the case record), (2) membership in an axial-coded failure mode (the class), (3) a prompt or spec fix when it is a specification gap, and (4) a standing evaluator only if it persists after the fix and recurs. Rung 4 is a deterministic assertion when the failure can be checked by code, and a narrow binary judge otherwise.
- "Errors you discover, not errors you imagine" and "only for problems you'll iterate on repeatedly" together act as a recurrence and cost filter against rule bloat.
- The written critique that goes with each pass/fail label works as a store for the rule's rationale and examples. It keeps the case detail out of the rule text while keeping it available to calibrate the check.

### Gaps
- The exact phrase "don't write evals for every failure" was not found verbatim. The closest wording is "Write evaluators for errors you discover, not errors you imagine" and "Focus automated evaluators on failures that persist after fixing your prompts."
- The full course or book wording linking "Gulf of Specification" to "fix the prompt" and "Gulf of Generalization" to "build an evaluator" was not retrieved (the Pragmatic Engineer piece is paywalled; the O'Reilly book was not accessed). That mapping rests on secondary summaries.
- The FAQ page is about 154k characters, and the extraction may have missed relevant sections such as "how many evals", synthetic data and RAG.

## 2. Eugene Yan, agent-rule conventions (AGENTS.md, Cursor rules, Claude Code CLAUDE.md): rules that stay short, scoped, actionable and checkable

### Takeaway
Practitioner conventions agree on a few points. Standing instructions must be short and scoped by path or condition, and should hold only what the agent cannot infer itself. Add a rule only after a repeated mistake ("correct twice", "same mistake repeatedly"). Rules that must never have exceptions should move out of prose into deterministic enforcement (hooks, CI, lint). Eugene Yan adds the evaluator-side discipline: one evaluator per dimension, binary labels, and dev/test splits to measure whether an evaluator generalizes rather than overfits.

### Cited Findings
**Eugene Yan (evaluator generalization)**
- "Focus on binary pass/fail or win/lose labels." "Binary labels mitigate this issue by forcing a clear decision boundary." — [Eugene Yan, "Product Evals in Three Simple Steps"](https://eugeneyan.com/writing/product-evals/)
- "Have one evaluator per dimension"; "build individual evaluators and combine them via simple heuristics". — [Eugene Yan](https://eugeneyan.com/writing/product-evals/)
- "Evaluate these evaluators on precision, recall, and Cohen's Kappa." "The benchmark is human performance, not perfection." — [Eugene Yan](https://eugeneyan.com/writing/product-evals/)
- Held-out testing of the check: "split the data into development and test sets", "hold out the remaining 25% as the test set", "measuring how well our evaluator generalizes to new data rather than overfitting". — [Eugene Yan](https://eugeneyan.com/writing/product-evals/)
- "Finally, run our eval harness with each change", so "we can easily identify improvements or regressions." — [Eugene Yan](https://eugeneyan.com/writing/product-evals/)

**Cursor rules**
- Four trigger types: "Always Apply" ("Apply to every chat session"), "Apply Intelligently" ("When Agent decides it's relevant based on description"), "Apply to Specific Files" ("When file matches a specified pattern", via `globs`), and "Apply Manually" ("When @-mentioned in chat"). — [Cursor docs, Rules](https://cursor.com/docs/context/rules)
- "Good rules are focused, actionable, and scoped." "Keep rules under 500 lines." "Split large rules into multiple, composable rules." "Provide concrete examples or referenced files." "Reference files instead of copying their contents." — [Cursor docs](https://cursor.com/docs/context/rules)
- Recurrence threshold: "Add rules only when you notice Agent making the same mistake repeatedly." "Start simple." "Reuse rules when repeating prompts in chat." — [Cursor docs](https://cursor.com/docs/context/rules)

**AGENTS.md**
- AGENTS.md is "a dedicated, predictable place to provide the context and instructions to help AI coding agents" work on a project. It should give "precise, agent-focused guidance" that complements the README rather than repeating it. — [agents.md](https://agents.md/)
- Scoping by proximity: agents "automatically read the nearest file in the directory tree, so the closest one takes precedence"; "The closest AGENTS.md to the edited file wins; explicit user chat prompts override everything." — [agents.md](https://agents.md/)
- Mechanical checks, not prose: the file lists test commands so the agent "will attempt to execute relevant programmatic checks and fix failures before finishing the task." It calls AGENTS.md "living documentation". — [agents.md](https://agents.md/)

**Claude Code best practices (Anthropic)**
- Instructions are either non-deterministic ("Claude (the model) reads it... there's no *guarantee* that it'll follow your instructions") or deterministic ("Claude Code (the harness) *has* to execute this. This can be a hook, a deny rule, or a managed setting"). — [Claude Code docs, Best practices](https://code.claude.com/docs/en/best-practices)
- "Almost every guideline has exceptions... With the actual code in front of it, Claude is usually better placed to make that call than a rule you wrote in advance." — [Claude Code best practices](https://code.claude.com/docs/en/best-practices)
- Escalation test: "If you keep adding emphasis to a `CLAUDE.md` line and Claude still misses it, that's a sign the line belongs in a hook. The reverse holds too: if you have hooks for things that are only preferences, delete them and let Claude decide." — [Claude Code best practices](https://code.claude.com/docs/en/best-practices)
- "If Claude keeps ignoring a line that *is* in `CLAUDE.md`, adding IMPORTANT probably won't fix it. Either the file has grown long enough that the line gets lost, or the line is a rule that can't have exceptions, in which case it belongs in a hook." — [Claude Code best practices](https://code.claude.com/docs/en/best-practices)
- Inclusion filter: "Only write down what Claude can't find by reading the repo, or what it would otherwise spend time rediscovering every session." Each CLAUDE.md line "takes a little of Claude's attention on *every* task, whether it's relevant or not." Content that qualifies includes the exact verify commands, "Places where the code is misleading", "Decisions that aren't in the repo", and "Anything you've had to correct twice already". — [Claude Code best practices](https://code.claude.com/docs/en/best-practices)
- Size: the memory guide "recommends staying under 200" lines. `/doctor prompt-audit` "flags instructions that were written for older models, point at files that no longer exist, or contradict each other." — [Claude Code best practices](https://code.claude.com/docs/en/best-practices)
- "A line like `Always typecheck before you finish` in this file works most of the time, not every time"; enforcing it is "a job for a `Stop` hook". — [Claude Code best practices](https://code.claude.com/docs/en/best-practices)
- Trigger scoping: rules for one area go in `.claude/rules/` "with a `paths:` filter so it only loads when Claude is actually working there". Procedures go in skills, where Claude "sees the name and description in every session, but only reads the full file when the task calls for it." — [Claude Code best practices](https://code.claude.com/docs/en/best-practices)

### Inferences
- Across Cursor, AGENTS.md and Claude Code, a well-formed rule has three parts: (a) a trigger (glob, path filter, description or pause point), (b) one imperative behavior, ideally with a referenced example file, and (c) a check (a command or hook) that proves compliance. Case narratives belong elsewhere.
- "Correct twice" (Anthropic) and "same mistake repeatedly" (Cursor) are the closest published wording to a "rule-of-two occurrences" threshold for promoting a correction into a standing rule.
- Anthropic's "if you keep adding emphasis ... it belongs in a hook" is a concrete escalation criterion from prose rule to mechanical check. Its reverse (delete hooks that are only preferences) is a de-escalation criterion against over-constraint.

### Gaps
- Simon Willison's and Lilian Weng's material on agent memory and rule generalization was not fetched within the tool budget. No quotes from them are included.
- Jason Liu's material was not retrieved.
- No source found here describes testing a new agent rule on a held-out project before promoting it. Eugene Yan's dev/test split is for evaluators, not for instruction rules. That transfer is an inference.

## 3. Google SRE blameless postmortems: incident record vs action items vs systemic fixes, and turning incidents into automated checks

### Takeaway
Google SRE treats the postmortem as the incident record (impact, timeline, root causes) and requires that it produce tracked, owned, verifiable action items that fix systems rather than people. Good action items generalize past the proximate failure ("audit all systems capable of..."). The SRE material also states that changing automated systems is more reliable than changing human behavior, which is the rationale for turning lessons into checks.

### Cited Findings
- Definition: "A postmortem is a written record of an incident, its impact, the actions taken to mitigate or resolve it, the root cause(s), and the follow-up actions to prevent the incident from recurring." — [Google SRE Book, ch. 15 "Postmortem Culture"](https://sre.google/sre-book/postmortem-culture/)
- Blameless: "it must focus on identifying the contributing causes of the incident without indicting any individual or team for bad or inappropriate behavior"; "You can't 'fix' people, but you can fix systems and processes." — [SRE Book ch. 15](https://sre.google/sre-book/postmortem-culture/)
- Trigger criteria set in advance: "define postmortem criteria before an incident occurs". Examples include "User-visible downtime or degradation beyond a certain threshold", "Data loss of any kind", "On-call engineer intervention (release rollback, rerouting of traffic, etc.)" and "A monitoring failure (which usually implies manual incident discovery)". — [SRE Book ch. 15](https://sre.google/sre-book/postmortem-culture/)
- Review gate: "An unreviewed postmortem might as well never have existed." Review questions include "Was the root cause sufficiently deep?" and "Is the action plan appropriate and are resulting bug fixes at appropriate priority?" — [SRE Book ch. 15](https://sre.google/sre-book/postmortem-culture/)
- Action items must be concrete: "The action items have a verifiable end state"; "All action items have both an owner and a tracking number"; "All action items are assigned a priority level." In the bad example, items "use ambiguous phrases like 'Improve' and 'Make better'", and "Using unclear language makes it difficult to measure and understand success criteria." — [SRE Workbook ch. 10 "Postmortem Culture: Learning from Failure"](https://sre.google/workbook/postmortem-culture/)
- Class, not instance: the good example's action items include "Audit all systems capable of turning live servers into paperweights (i.e., not just repairs and diskerase workflow)" and "Disallow any single operation from affecting servers spanning namespace/class boundaries." The analysis goes deep "Rather than only investigating the proximate area of the system failure." — [SRE Workbook ch. 10](https://sre.google/workbook/postmortem-culture/)
- Prevent/mitigate themes: "Each action item 'theme' has Prevent/Mitigate action items that help avoid outage recurrence." — [SRE Workbook ch. 10](https://sre.google/workbook/postmortem-culture/)
- Automate rather than exhort: "In general, trying to change human behavior is less reliable than changing automated systems and processes." Example fixes include adding "sanity checks" and "Monitoring target safety checks should not allow you to push a change that cannot be rolled back." — [SRE Workbook ch. 10](https://sre.google/workbook/postmortem-culture/)
- Tracking closure: "Without a formal tracking process, action items from postmortems are often forgotten, resulting in outages." "Any resulting action items are filed as bugs in our centralized bug tracking system", so "we can monitor the closure of action items from each postmortem." — [SRE Workbook ch. 10](https://sre.google/workbook/postmortem-culture/)
- "To our users, a postmortem without subsequent action is indistinguishable from no postmortem." — [SRE Workbook ch. 10](https://sre.google/workbook/postmortem-culture/)
- Repeat incidents are a signal that rules are missing: "Are the right action items being captured in the first place?" — [SRE Workbook ch. 10](https://sre.google/workbook/postmortem-culture/)
- Write-ups should avoid narrative drama: "Animated language and dramatic descriptions of events distract from the key message and erode psychological safety." — [SRE Workbook ch. 10](https://sre.google/workbook/postmortem-culture/)

### Inferences
- There are two artifacts. The incident record (timeline, impact, contributing causes) is the case log. The action items are separate, tracked artifacts with an owner, a priority and a "verifiable end state". The standing rule is the action item turned into a system change (sanity check, safety check, guardrail), not the postmortem prose.
- The "audit all systems capable of ..." pattern is a concrete template for generalizing: restate the failure as a capability or class ("any operation that can X") and fix every member of the class.

### Gaps
- Google's static-analysis practice (Tricorder; "Lessons from Building Static Analysis Tools at Google", CACM 2018) covers how bug patterns become checks under a low "effective false positive" bar. The CACM page returned 403 and the Google Research page showed only the abstract, so no criteria are quoted. The abstract notes that findings are "fixed by engineers, by their own choice, before the problematic code is checked into the codebase." — [Google Research](https://research.google/pubs/lessons-from-building-static-analysis-tools-at-google/)
- Neither SRE chapter explicitly prescribes a template that separates "narrative" from "action items" (the fetch tool noted this). The separation is implied by the distinct sections (timeline, lessons learned, action items table).

## 4. Aviation and medical checklist design (Gawande, Boorman, Degani & Wiener) as a model for compact gate checks

### Takeaway
Checklist literature treats a checklist as a short verification at a defined pause point, not a full procedure. It holds roughly 5–9 "killer items": the steps most dangerous to miss and most likely to be skipped. Each checklist runs in either do-confirm or read-do mode, uses simple, exact wording, and is tested in real use before release. The primary NASA sources (Degani & Wiener) exist, but only their abstracts were accessible here. The Boorman and Gawande points come from secondary summaries.

### Cited Findings
- Degani & Wiener, "Human Factors of Flight-Deck Checklists: The Normal Checklist", NASA CR-177549 (1991). The abstract notes that the checklist is central to pilot standardization and safety yet had been neglected by human factors research, and the report ends with design guidelines for normal checklists. — [NASA NTRS 19910017830](https://ntrs.nasa.gov/citations/19910017830)
- Journal version: Degani & Wiener, "Cockpit Checklists: Concepts, Design, and Use", *Human Factors* 35(2), 1993. It covers checklist functions, format, design, length and usage, plus sociotechnical factors such as airline culture, CRM and production pressure. — [NASA NTRS 19930068509](https://ntrs.nasa.gov/citations/19930068509)
- A later FAA document cites Wiener's point that a major weakness of paper checklists is the lack of a visual indication of which items are complete (search summary). — [FAA, Electronic Checklists](https://www.faa.gov/sites/faa.gov/files/2023-12/E_Checklists_0.pdf)
- Boorman's principles as summarized from *The Checklist Manifesto* (secondary sources): define a clear pause point; choose do-confirm (perform from memory, then stop and confirm) or read-do (perform each step as it is read, like a recipe); keep it to about five to nine items; focus on "killer items", the steps most dangerous to skip; use simple, exact wording; fit it on one page; test it in the real world. — [SafetyCulture/Mitti, "Lessons we can learn from aviation checklists"](https://mitti.com/blog/lessons-we-can-learn-from-aviation-checklists); [Shortform, "Boeing Checklist"](https://www.shortform.com/blog/boeing-checklist/)
- Nuance from aviation training material: abnormal procedures are strictly read-do, and time-critical emergencies start with memory items followed by a read-do verification (search summary). — [Flight Test Safety Committee, "Developing Critical Checklists" tutorial](https://flighttestsafety.org/images/Developing_Critical_Checklists_-_Tutorial_Part_Two.pdf)
- NASA flight-cognition researchers (Berman & Dismukes) studied checklist failure in practice; their work is listed in the search results. — [Berman & Dismukes, AeroSafety World, Jul 2010](https://hsi.arc.nasa.gov/flightcognition/Publications/Berman&Dismukes_asw_jul10.pdf) (not fetched)

### Inferences
- For an agent "gate", the checklist model suggests: a fixed trigger (pause point, e.g. "before reporting done" or "before render"), at most about 7 items, only killer items (high consequence, historically skipped), and do-confirm mode (the agent works freely, then confirms). Each item should be binary and observable, matching Husain's pass/fail criteria.
- The checklist rule that lists are "not comprehensive how-to guides" maps onto the CLAUDE.md "keep it short" and skill-for-procedures split: procedure goes in a skill (read-do), and the gate holds only confirm items.

### Gaps
- No Gawande or Boorman primary text was retrieved (newyorker.com fetch was blocked). The exact Gawande wording on killer items and pause points is unverified.
- Pronovost's central-line checklist study (NEJM 2006) is widely cited as evidence that short checklists reduce harm, but the PubMed page could not be loaded (cookie wall). No figures are reported here.
- The NASA "EA Checklist Design" PDF fetch failed, so the full NASA design guidelines are not quoted.

## 5. Testing whether a rule generalizes before promoting it (held-out cases, rule-of-two)

### Takeaway
No source found states a formal "apply the rule to a different held-out project before promoting it" procedure for agent instructions. Pieces of it do exist: Eugene Yan's held-out test split for evaluators, Husain's saturation stopping rule and his warning about 100% pass rates, Cursor's and Anthropic's "repeated mistake" or "correct twice" threshold, SRE's "audit all systems capable of..." class generalization, and Shankar's criteria drift, which implies rules should be re-checked against fresh outputs.

### Cited Findings
- Recurrence thresholds: "Anything you've had to correct twice already" belongs in CLAUDE.md. — [Claude Code best practices](https://code.claude.com/docs/en/best-practices). "Add rules only when you notice Agent making the same mistake repeatedly." — [Cursor docs](https://cursor.com/docs/context/rules)
- Discovered, not imagined: "Write evaluators for errors you discover, not errors you imagine." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- Held-out validation of a check: split into dev and test, "hold out the remaining 25% as the test set", "measuring how well our evaluator generalizes to new data rather than overfitting". — [Eugene Yan](https://eugeneyan.com/writing/product-evals/)
- Optimizing to known failures overfits: prompt optimization "can refine a prompt to perform better on known failures, but it cannot discover _new_ ones." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- A rule set that never fails is suspect: "If you're passing 100% of your evals, you're likely not challenging your system enough." — [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- Criteria are output-dependent, so validate against new outputs: "some criteria appears dependent on the specific LLM outputs observed." — [Shankar et al. 2024](https://arxiv.org/abs/2404.12272)
- Class-level restatement: "Audit all systems capable of turning live servers into paperweights (i.e., not just repairs and diskerase workflow)." — [SRE Workbook ch. 10](https://sre.google/workbook/postmortem-culture/)
- Pruning stale or contradictory rules: `/doctor prompt-audit` flags instructions "written for older models", pointing "at files that no longer exist", or that "contradict each other". The reverse escalation applies too: delete hooks "for things that are only preferences". — [Claude Code best practices](https://code.claude.com/docs/en/best-practices)

### Inferences
- These pieces combine into a promotion test. A candidate rule needs (1) two or more independent occurrences, (2) a class-level restatement with no case-specific nouns (project names, file names, dates), and (3) a binary check. It is then (4) validated on held-out cases or a different project it was not written from, where it should catch the failure and not fire falsely on good outputs, in the spirit of Eugene Yan's dev/test split and precision/recall. Finally (5) it is re-audited periodically for drift and staleness. This is a synthesis; no single source prescribes it.
- False positives matter as much as recall. A rule that misfires on a held-out project is over-fitted to its origin case. Google's static-analysis "effective false positive" idea (not quoted here, see Gaps) is the adjacent-field precedent.

### Gaps
- No primary source found for a named "rule of two" in AI agent rule-writing, beyond "correct twice" (Anthropic) and "repeatedly" (Cursor).
- No published method found for cross-project held-out validation of natural-language agent rules (as opposed to evaluators).
- Lint/static-analysis acceptance criteria (Tricorder's under-10% effective false positive bar, the "Not useful" feedback button) could not be verified because the CACM full text was blocked. Treat them as unverified until checked against the paper.
