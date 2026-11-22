# Agents that learn from accumulated textual lessons: mechanisms against overfitting, context bloat and degradation (literature notes, Nov 2026)

## Q1. ACE (Agentic Context Engineering, Zhang et al., 2025): roles, bullet metadata, delta updates, grow-and-refine, brevity bias, context collapse

### Takeaway
ACE treats the context as a growing set of small itemized bullets with IDs and helpful/harmful counters. It changes them only through small "delta" edits that non-LLM code merges deterministically, and it removes redundancy by embedding-based deduplication. The motivation is two measured failure modes of LLM-rewritten memories: brevity bias, and context collapse, where one rewrite shrank an 18,282-token context to 122 tokens and accuracy fell below the no-memory baseline. Every gain comes from AppWorld and two finance tasks (FiNER, Formula) run on DeepSeek-V3.1, and ACE degrades when there is no reliable feedback signal.

### Cited Findings
- **Three roles.** The **Generator** produces reasoning trajectories and flags which bullets were useful or misleading. The **Reflector** critiques the traces to extract lessons, optionally refining them over several rounds (main experiments cap refinement rounds and offline epochs at 5). The **Curator** turns lessons into compact "delta" entries, which "non-LLM logic" merges deterministically into the existing context. All three roles use the same backbone (non-thinking DeepSeek-V3.1), with batch size 1. — [ACE, arXiv 2510.04618](https://arxiv.org/html/2510.04618)
- **Bullet format.** The context is a set of itemized bullets, not a monolithic prompt. Each bullet has metadata (a unique identifier, plus counters of how often it was marked helpful or harmful) and content, which is a small unit such as a reusable strategy, a domain concept or a common failure mode. — [ACE](https://arxiv.org/html/2510.04618)
- **Delta updates vs. rewriting.** ACE produces small sets of candidate bullets ("delta contexts") instead of regenerating the full context. Updates are localized and can be merged in parallel. The paper contrasts this with full LLM rewrites, which "risk abrupt erasure of accumulated knowledge." — [ACE](https://arxiv.org/html/2510.04618)
- **Grow-and-refine.** New bullets are appended with new IDs, and existing bullets are updated in place (for example, by incrementing their counters). Bullets are deduplicated by comparing semantic embeddings. Refinement is either proactive (after each delta) or lazy (only when the context window is exceeded). The fetched text gave no numeric deduplication threshold. — [ACE](https://arxiv.org/html/2510.04618)
- **Brevity bias.** Prompt optimizers tend to collapse toward short, generic instructions. ACE cites Gao et al., who found that iterative methods repeatedly produced near-identical instructions such as "Create unit tests to ensure methods behave as expected." — [ACE](https://arxiv.org/html/2510.04618)
- **Context collapse, measured case.** Dynamic Cheatsheet on AppWorld had 18,282 tokens and 66.7 accuracy at step 60. At the next step, a monolithic rewrite reduced the context to 122 tokens and accuracy fell to 57.1, below the 63.7 no-adaptation baseline. — [ACE](https://arxiv.org/html/2510.04618)
- **AppWorld results** (DeepSeek-V3.1; ReAct baseline average 42.4). These are benchmark-specific.
  - Offline ACE with ground-truth labels: average 59.4 (+17.0).
  - Offline ACE without ground-truth labels: 57.2 (+14.8).
  - Online ACE without labels: 59.5 (+17.1). This is the figure the paper reports with offline warm-up; plain online is 56.1.
  - Baselines: ICL 46.0, GEPA 46.4, and online Dynamic Cheatsheet with labels 51.9.
  - The paper's text says ACE beats ICL and GEPA by "12.3%" and "11.9%," but the table averages imply about 13.4 and 13.0 points. — [ACE](https://arxiv.org/html/2510.04618)
- **Finance results** (benchmark-specific; baseline FiNER 70.7, Formula 67.5).
  - Offline ACE with labels: FiNER 78.3, Formula 85.5, average 81.9 (+12.8).
  - Online ACE: average 76.6 (+7.5).
  - Online Dynamic Cheatsheet: 71.8 (+2.7). — [ACE](https://arxiv.org/html/2510.04618)
- **Cost and latency.**
  - Against GEPA on AppWorld (offline): latency −82.3% (53,898 s → 9,517 s), rollouts −75.1% (1,434 → 357).
  - Against Dynamic Cheatsheet on FiNER (online): latency −91.5%, token cost −83.6% ($17.7 → $2.9).
  - A GPT-5.1 study found 91.8% of input tokens served from the KV cache, which cut billed input cost by 82.6%. — [ACE](https://arxiv.org/html/2510.04618)
- **Ablations** (AppWorld offline, average). Without the Reflector or multi-epoch training: 55.1. Without multi-epoch only: 56.8. Full ACE: 59.4. — [ACE](https://arxiv.org/html/2510.04618)
- **Limitations the paper states.**
  - It "relies on a reasonably strong Reflector." Without useful insights the context "may become noisy or even harmful."
  - Without reliable feedback (ground-truth labels or execution outcomes), ACE and Dynamic Cheatsheet can degrade. Finance online without labels fell to FiNER 67.3 (−3.4 below baseline).
  - Tasks such as HotPotQA and Game of 24 need only concise guidance, so rich contexts add little. — [ACE](https://arxiv.org/html/2510.04618)

### Inferences
- ACE's defence against collapse is structural: the LLM never rewrites the whole store, and only code merges edits. That rule carries over to a skill or lessons file: append or edit single items by ID, and never have a model "rewrite the file cleanly."
- The helpful/harmful counters are a cheap form of cross-task validation, since a bullet's worth is judged by its effect on later tasks, not only the task that produced it.
- Two of ACE's claims point in opposite directions: "rich, long contexts are fine" (against brevity bias) and "concise guidance is enough for some tasks." Whether a long playbook helps appears to depend on the domain. AppWorld (API-heavy, many domain specifics) and finance (domain rules) benefit; simple reasoning tasks do not.
- ACE's own result that it degrades without labels (FiNER −3.4) means lessons should only be committed when an outcome signal exists, such as a test, an execution result or a human verdict.

### Gaps
- The exact deduplication threshold, the prompts, and how counters are used to prune were not in the fetched portion (the appendix was truncated at 100k characters). I could not confirm whether harmful-count bullets are deleted automatically or only de-prioritized.
- I did not verify the abstract's headline percentages, so cite the table numbers above instead.

## Q2. Dynamic Cheatsheet (Suzgun et al., 2025) and ExpeL (Zhao et al., 2023): what is stored, curation, insight operations, counters

### Takeaway
Both papers store distilled, transferable artifacts rather than transcripts.
- **Dynamic Cheatsheet (DC)** has a self-curating "cheatsheet" of strategies and code snippets that an LLM rewrites after each query, without labels. It produces large gains on narrow, repetitive benchmarks (Game of 24, an equation balancer, AIME). Its failure modes are hurt to weak models, amplified wrong heuristics, and lossy rewrites.
- **ExpeL** extracts insights by comparing failure/success pairs and lists of successes. It maintains them with ADD/EDIT/UPVOTE/DOWNVOTE operations on an importance count that starts at 2, and it deletes an insight when the count reaches 0. Insights are always in context, while past trajectories are retrieved.

### Cited Findings
- **What DC stores.** "Strategies, code snippets, and general problem-solving insights": heuristics and short textual artifacts, not full transcripts. Examples are a Python brute-force solver for Game of 24, a formula "toolkit" for MMLU-Pro, and reference guides for physics and engineering. — [Dynamic Cheatsheet, arXiv 2504.07952](https://arxiv.org/html/2504.07952)
- **DC variants.**
  - DC-Cu (cumulative): answer from the current memory, then the curator updates the memory. No retrieval.
  - DC-RS (retrieval and synthesis): retrieve the top-3 similar past input/output pairs (text-embedding-3-small), update memory, then generate. — [DC](https://arxiv.org/html/2504.07952)
- **DC curation goals.** The curator has no ground-truth labels and judges correctness itself. It keeps answers that are correct or give generalizable insight, refines or removes wrong or superseded entries, and consolidates "to retain succinct, high-impact references and heuristics." Memory is "self-curated, focusing on concise, transferable snippets rather than entire transcripts." The paper states no explicit rule against instance-specific content, no size limit and no usage counters. The curation prompt itself is shown only as an image. — [DC](https://arxiv.org/html/2504.07952)
- **DC results** (benchmark-specific).
  - Game of 24 (GPT-4o): 10.0 → 99.0 with DC-RS.
  - Math Equation Balancer (Claude 3.5 Sonnet): 44.8 → 100 with DC-Cu.
  - AIME 2024 (Claude 3.5 Sonnet): 23.3 → 50.0 with DC-Cu.
  - GPQA-Diamond (Claude 3.5 Sonnet): 59.6 → 68.7.
  - Full-history context (no curation) did much worse than curated memory: Claude AIME 2024 went from 23.3 (baseline) to 26.7 (full history) and 50.0 (DC-Cu); GPT-4o went from 20.0 (baseline) to 13.3 (full history) and 40.0 (DC-RS). — [DC](https://arxiv.org/html/2504.07952)
- **DC failure modes.**
  - Weak models are hurt. GPT-4o-mini's GPQA fell from 34.3 to 32.3, and its AIME 2024 fell below baseline (16.7 → 13.3).
  - Faulty heuristics "can be equally amplified."
  - Retrieval noise hurt GPT-4o on GPQA.
  - The rewriting model sometimes abbreviated prior memory as "Previous content […] preserved," which is a lossy rewrite and a precursor of context collapse.
  - Gains for R1 and o1 were minimal.
  - Transferring memory between models gave mixed results. — [DC](https://arxiv.org/html/2504.07952)
- **ExpeL insight extraction.** Two kinds of comparison feed it: fail/success pairs on the same task, and lists of L successes (L = 8 for HotpotQA and ALFWorld, 4 for WebShop). The insight set starts empty. The model is gpt-4-0613, which followed the operators better than gpt-3.5. — [ExpeL, arXiv 2308.10144](https://arxiv.org/html/2308.10144)
- **ExpeL operations and counters.** The four operations are ADD, EDIT, UPVOTE and DOWNVOTE.
  - A new insight starts with an importance count of 2.
  - UPVOTE and EDIT increment the count; DOWNVOTE decrements it.
  - "If an insight's importance count reaches zero, it will be removed."
  - The authors' rationale is that this "robustifies the process since even successful trajectories can be suboptimal." — [ExpeL](https://arxiv.org/html/2308.10144)
- **ExpeL retrieval vs. always-loaded.** The full insight list is concatenated into every task prompt. Successful trajectories are retrieved as examples by task similarity (Faiss, all-mpnet-base-v2, k = 6 for HotpotQA, 2 for ALFWorld and WebShop, 3 for FEVER). The authors note that "retrieval could be a feasible solution" if the insight list grows large. — [ExpeL](https://arxiv.org/html/2308.10144)
- **ExpeL results** (benchmark-specific).
  - HotpotQA: ReAct 28.0 → ExpeL 39.0 (insights only 36, retrieval only 31).
  - ALFWorld: 40.0 → 59.0 (insights only 50, retrieval only 55).
  - Transfer of HotpotQA insights to FEVER: ReAct 63 → 70.
  - Ablation: hand-crafted insights scored 32.0, insights built from Reflexion-style reflections 29.0, and gpt-3.5-generated insights 32.0, against 39.0 for full ExpeL. Retrieval by task similarity (59.0) beat reasoning similarity (48.5) and random sampling (42.5) on ALFWorld. — [ExpeL](https://arxiv.org/html/2308.10144)

### Inferences
- ExpeL's counter rule (start at 2, −1 on DOWNVOTE, delete at 0) is the clearest published pruning rule. A new insight dies after two net downvotes, so one bad experience cannot entrench a rule, and one contradiction does not kill it either.
- The success-vs-failure contrast is ExpeL's abstraction mechanism: an insight must explain a difference between outcomes, which makes it less likely to encode incidental details of one instance.
- DC's full-history result (GPT-4o 20.0 → 13.3) is direct evidence that dumping raw experience into the context hurts, and that curation is what creates the gain.
- In ExpeL, insights extracted from contrasts beat hand-written insights (39 vs. 32) and insights built from per-task reflections (29). This suggests lessons should be induced across several tasks rather than written down after a single episode.

### Gaps
- DC's exact curator prompt (Figures 14–15) was image-only in the HTML. I could not extract its literal instructions about instance-specific content.
- ExpeL's insight list size over time (how many insights survive) was not in the fetched text.

## Q3. Reflexion, Agent Workflow Memory, Voyager, ReasoningBank, and 2025–2026 work on memory generalization, error propagation and poisoning

### Takeaway
- **Reflexion** is within-task episodic memory: 1–3 reflections, reused across retries of the same task. It fails on tasks that need diverse exploration.
- **Agent Workflow Memory (AWM)** and **Voyager** show that abstraction (variables in place of concrete values) and verification before storing are what make reuse generalize.
- **ReasoningBank** adds lessons from failures.
- **2025–2026 empirical work** shows memory degrades itself under add-all policies through "experience-following" error propagation. Quality-gated addition and usage-based deletion fix much of this.
- **Memory stores are an attack surface:** MINJA, AgentPoison, and the 2026 "benign alone, harmful together" composition attack.

### Cited Findings
- **Reflexion mechanism.** Agents "verbally reflect on task feedback signals" and keep reflective text "in an episodic memory buffer to induce better decision-making in subsequent trials." HumanEval pass@1 was 91% against GPT-4's 80%. — [Reflexion, arXiv 2303.11366](https://arxiv.org/abs/2303.11366)
- **Reflexion memory bound.** Memory is bounded by "a maximum number of stored experiences, Ω (usually set to 1-3)": the last 3 reflections in ALFWorld, and 1 in programming. The loop retries the same task until the evaluator accepts it. — [Reflexion (ar5iv)](https://ar5iv.labs.arxiv.org/html/2303.11366)
- **Reflexion limitations.**
  - It "may still succumb to non-optimal local minima solutions."
  - Long-term memory is limited to "a sliding window with maximum capacity."
  - It relies on the LLM's self-evaluation.
  - On WebShop, "Reflexion is unable to solve tasks that require a significant amount of diversity and exploration" (no significant gain over ReAct after 4 trials).
  - Ablation: self-reflection gives an 8% absolute boost over episodic memory alone on HotPotQA. — [Reflexion (ar5iv)](https://ar5iv.labs.arxiv.org/html/2303.11366)
- **ExpeL vs. Reflexion.** ExpeL's single-attempt ALFWorld score (59.0) exceeded ReAct+Reflexion after 3 retries (54.4). Insights built from reflections scored worse than ExpeL's cross-task insights (29.0 vs. 39.0 on HotpotQA). — [ExpeL](https://arxiv.org/html/2308.10144)
- **AWM induction.** An LM extracts repeated sub-routines from past trajectories at finer granularity than whole tasks (for example "search for a product on Amazon"). Example-specific values are replaced by placeholders ("dry cat food" becomes {product-name}). In online mode, an LM evaluator labels trajectories, and only successes become workflows. — [AWM, arXiv 2409.07429](https://arxiv.org/html/2409.07429)
- **AWM results** (benchmark-specific).
  - WebArena: 35.5% vs. 23.5% for BrowserGym (51.1% relative), also beating human-written SteP workflows (33.0%).
  - Mind2Web step success: 36.2 → 45.1 (24.6% relative).
  - Online generalization: cross-task 43.6 vs. 36.2, cross-website 33.9 vs. 30.1, cross-domain 35.5 vs. 18.6. "Gains widen as the train-test gap grows." — [AWM](https://arxiv.org/html/2409.07429)
- **AWM ablations and failure modes.**
  - Abstract workflows beat concrete full-example retrieval (Synapse) by about 5 points of element accuracy and about 4 of step success. The paper attributes this to less bias from example-specific details.
  - Adding raw HTML to the workflows lowered step success (34.6 → 32.9).
  - Over-guidance: action F1 fell to 57.3, against 60.6 for MindAct, because workflows did not fit the page state.
  - Wrong workflows can come from mislabeled trajectories.
  - Workflows exposed as callable actions were used in only 18.5% of tasks.
  - Mixing offline and online workflow sets performed worse than either alone. — [AWM](https://arxiv.org/html/2409.07429)
- **Voyager.** A skill is added "until self-verification validates the task's completion, at which point we add this new skill to the skill library." Skills are keyed by an embedding of a GPT-3.5-generated description, and the top-5 relevant skills are retrieved. Ablations: removing self-verification cut discovered items by 73%, and Voyager without the skill library "plateau[s] in the later stages." In a new world, full Voyager solved 4/4 tasks at 3/3 each; AutoGPT alone solved 0. — [Voyager (ar5iv)](https://ar5iv.labs.arxiv.org/html/2305.16291); headline numbers (3.3x more items, 15.3x faster milestones): [Voyager abstract](https://arxiv.org/abs/2305.16291)
- **ReasoningBank (2025).**
  - Memory items have a title, a one-sentence description and distilled content, with "at most three memory items" per trajectory.
  - An LLM-as-judge labels success or failure without ground truth. Successes yield strategies; failures yield pitfalls.
  - Retrieval defaults to top-1 into the system prompt. Consolidation is "a simple addition operation" with no deduplication.
  - WebArena (Gemini-2.5-flash): 40.5 → 48.8, against AWM 44.1 and Synapse 42.1.
  - Adding failure trajectories helped ReasoningBank (46.5 → 49.7) but hurt AWM (44.4 → 42.2).
  - Judge accuracy was 72.7%. Simulated judge accuracy of 70–90% gave similar results. — [ReasoningBank, arXiv 2509.25140](https://arxiv.org/html/2509.25140)
- **Experience-following and error propagation** (Xiong et al., arXiv 2505.16067, ACL 2026).
  - High similarity between a new input and a retrieved record leads to highly similar outputs (Pearson r ≈ 1 in the synthetic RegAgent setup).
  - Wrong stored outputs get copied, amplified, and written back into memory. — [Xiong et al.](https://arxiv.org/html/2505.16067v2); [ACL 2026](https://aclanthology.org/2026.acl-long.27/)
- **Add-all vs. strict selective addition** (Xiong et al., GPT-4o-mini). In every case add-all fell below a fixed memory, and strict addition beat both.
  - EHRAgent: 13.05 (add-all) vs. 38.50 (strict), against 16.75 for fixed memory.
  - AgentDriver: 32.32 vs. 51.00.
  - CIC-IoT: 59.90 vs. 85.40.
  - Strict addition also used fewer records (EHRAgent 1,012 vs. 2,411). — [Xiong et al.](https://arxiv.org/html/2505.16067v2)
- **Deletion** (Xiong et al.).
  - History-based deletion (records retrieved at least 3–5 times whose downstream success rate falls below a threshold such as 0.5–0.7) gave the best scores: EHRAgent 42.06, CIC-IoT 89.60.
  - Combined periodic and history-based deletion gave the smallest memory (EHRAgent 248 records at 42.34).
  - Retained records were more often correct than deleted ones (CIC-IoT 78.9 vs. 56.7), with one exception (AgentDriver with the 4o-mini evaluator).
  - Recommendation: future task outcomes serve as free quality labels, and bounded memory suffices. — [Xiong et al.](https://arxiv.org/html/2505.16067v2)
- **Memory poisoning.**
  - MINJA injects malicious records through queries alone: 98.2% injection success and 76.8% attack success. — [MINJA, arXiv 2503.03704](https://arxiv.org/html/2503.03704v5)
  - AgentPoison reaches 82% retrieval success and 63% end-to-end attack success with a poisoning ratio under 0.1%, assuming write access to memory. — [AgentPoison, arXiv 2407.12784](https://arxiv.org/pdf/2407.12784)
- **Composition attack (Aug 2026).** "Benign Alone, Harmful Together" (Yan et al.) argues that experiences which are individually harmless "may jointly weaken an agent's safety boundary" in self-evolving agents. The EvoBreak attack induces complementary benign experiences. The abstract gives no frameworks or numbers. — [arXiv 2608.01759](https://arxiv.org/abs/2608.01759)

### Inferences
- Three independent lines of evidence converge on the same rule: store only after an outcome check. Voyager's self-verification (−73% items without it), AWM's success-only filter and Xiong et al.'s strict addition (+18.7 to +25.5 points over add-all) all point this way.
- Abstraction is the main generalization lever. AWM's variable substitution beats concrete examples, and its gains grow with distribution shift (cross-domain 18.6 → 35.5). Concrete traces instead induce experience-following, where the agent copies the old output.
- Reflexion-style per-episode reflection is the wrong unit for cross-task lessons. Lessons should be distilled across several episodes (ExpeL contrasts), not copied from one post-mortem.
- Usage-based retirement is supported empirically: Xiong et al.'s history-based deletion and ExpeL's downvote-to-zero rule. ACE's counters supply the needed statistics.
- If lessons come from content written by others (reviews, user messages), the poisoning results imply they need provenance and human review before entering an always-loaded file.

### Gaps
- I found no study that directly measures "over-specific rules" as a named failure in a text-lesson store. AWM reports over-guidance and ReasoningBank keeps consolidation naive, but neither quantifies specificity.
- I found no independent replications of the MINJA or AgentPoison numbers. The 2608.01759 abstract gives no metrics or defenses.
- I did not find ReasoningBank's analysis of whether a larger k hurts (truncated appendix).

## Q4. Context Rot (Chroma, 2025) and Lost in the Middle (Liu et al., 2023): how many rules to keep always loaded

### Takeaway
Model performance falls as input grows, even on trivial tasks with fixed difficulty. Distractors, meaning content similar to but different from the relevant item, add further damage. Information in the middle of a long context is used worst, sometimes worse than giving no context at all. Together these argue for a small always-loaded core plus retrieval of focused items, rather than an ever-growing always-loaded rule file.

### Cited Findings
- **Context Rot setup.** Chroma evaluated 18 LLMs, including GPT-4.1, Claude 4, Gemini 2.5 and Qwen3. "Across all experiments, model performance consistently degrades with increasing input length," with task complexity held constant. — [Chroma, Context Rot](https://www.trychroma.com/research/context-rot)
- **Similarity and distractors.** "Lower similarity needle-question pairs increases the rate of performance degradation." "Even a single distractor reduces performance relative to the baseline," and four distractors compound the drop. — [Chroma](https://www.trychroma.com/research/context-rot)
- **Coherent text hurts more than shuffled text.** "Structural coherence consistently hurts model performance": shuffled haystacks beat coherent ones across all 18 models. — [Chroma](https://www.trychroma.com/research/context-rot)
- **LongMemEval.** Focused prompts (about 300 tokens) did significantly better than full prompts (about 113k tokens) across all models. "What matters more is how that information is presented." — [Chroma](https://www.trychroma.com/research/context-rot)
- **Lost in the Middle.** Performance is highest when relevant information is at the beginning or end, and "significantly degrades" in the middle, "even for explicitly long-context models." — [Liu et al., arXiv 2307.03172](https://arxiv.org/abs/2307.03172)
- **Lost in the Middle numbers** (GPT-3.5-Turbo, 20 documents): 75.8% with the answer in first position, 53.8% in the middle (index 9), 63.2% last, against 56.1% closed-book. "In the worst case, performance in 20- and 30-document settings is lower than performance without any input documents." With 30 documents the middle position falls to 50.5%. — [Liu et al. (ar5iv)](https://ar5iv.labs.arxiv.org/html/2307.03172)
- **Saturation and extended context.** Reader performance saturates before retriever recall: going beyond 20 documents adds only about 1.5% for GPT-3.5-Turbo and about 1% for Claude-1.3. "Extended-context models are not necessarily better" at using their context. — [Liu et al. (ar5iv)](https://ar5iv.labs.arxiv.org/html/2307.03172)
- **Agent-memory corroboration.** ExpeL's authors anticipate that lifelong agents need retrieval over insights to manage the context window. ACE itself reports that rich contexts add little for tasks that need only concise guidance (HotPotQA, Game of 24). — [ExpeL](https://arxiv.org/html/2308.10144); [ACE](https://arxiv.org/html/2510.04618)

### Inferences
- Lessons on the same theme are near-duplicates of each other, which makes them exactly Chroma's "distractors" (similar but not the same). Redundant lessons are therefore a measured harm, not just wasted tokens. This is the strongest argument for ACE-style deduplication.
- Long-context studies do not support a single numeric cap on the rule count. They support placing the most important rules at the start or end, keeping the always-loaded part short, and retrieving the rest by task (ExpeL's insights + retrieval design, Voyager's top-5 and ReasoningBank's top-1).
- The ACE result (long playbooks help on AppWorld) and Context Rot (length hurts) are compatible if the playbook is dense, relevant to the domain and deduplicated. Context Rot's coherence finding suggests that format and organization matter, not only token count.

### Gaps
- None of these studies tests "N always-loaded imperative rules" directly. The evidence is from retrieval and QA tasks, so any threshold such as "keep it under X rules" would be an extrapolation.
- Chroma gives no concrete engineering recommendations beyond the importance of context engineering.

## Q5. Synthesis: which mechanisms make accumulated lessons generalize, and the known failure modes

### Takeaway
The mechanisms with empirical support are:
1. Abstract from instances to rules (placeholders, contrastive extraction).
2. Gate addition on an outcome signal.
3. Track per-item usefulness with counters and retire items that fail.
4. Edit by small itemized deltas, never by a full LLM rewrite.
5. Deduplicate.
6. Keep a small core always loaded and retrieve the rest.

The failure modes with evidence are context collapse, brevity bias, error propagation through experience-following, distractor- and length-driven context rot, middle-position loss, harm to weak models, over-guidance, and poisoning.

### Cited Findings
- **Abstraction.** AWM's placeholder variables beat concrete examples, and its gains grow with domain shift. ExpeL's contrastive insights beat reflection-derived and hand-written insights. — [AWM](https://arxiv.org/html/2409.07429); [ExpeL](https://arxiv.org/html/2308.10144)
- **Validation before storing.** Voyager's self-verification (−73% items without it), strict selective addition (+15.5 to +25.5 points over add-all), and ReasoningBank's LLM judge (robust from 70% to 90% judge accuracy). — [Voyager](https://ar5iv.labs.arxiv.org/html/2305.16291); [Xiong et al.](https://arxiv.org/html/2505.16067v2); [ReasoningBank](https://arxiv.org/html/2509.25140)
- **Counters and retirement.** ExpeL's importance count (start 2, delete at 0); ACE's helpful/harmful counters; Xiong et al.'s history-based deletion (minimum 3–5 retrievals, success threshold around 0.5–0.7). — [ExpeL](https://arxiv.org/html/2308.10144); [ACE](https://arxiv.org/html/2510.04618); [Xiong et al.](https://arxiv.org/html/2505.16067v2)
- **Delta vs. rewrite.** Collapse from 18,282 to 122 tokens, with accuracy dropping from 66.7 to 57.1 (below the 63.7 baseline), and DC's "Previous content […] preserved" truncation. — [ACE](https://arxiv.org/html/2510.04618); [DC](https://arxiv.org/html/2504.07952)
- **Negative transfer from weak or noisy memory.** GPT-4o-mini dropped below baseline with DC. ACE fell 3.4 points below baseline on FiNER without labels. Add-all memory fell below a fixed memory on all four agents in Xiong et al. — [DC](https://arxiv.org/html/2504.07952); [ACE](https://arxiv.org/html/2510.04618); [Xiong et al.](https://arxiv.org/html/2505.16067v2)
- **Over-guidance.** AWM's workflows lowered action F1 (57.3 vs. 60.6) when they did not fit the current state. — [AWM](https://arxiv.org/html/2409.07429)

### Inferences
- A practical lesson-file protocol consistent with this literature:
  1. Every lesson has an ID, a "when it applies" trigger, an abstract rule, and an evidence count from more than one task.
  2. Lessons are added only after an outcome check or a human verdict.
  3. Lessons are edited by appending or editing single items, never by a whole-file rewrite.
  4. Each lesson carries helpful/harmful counts, and is retired at a threshold (ExpeL-style).
  5. Lessons are deduplicated or merged before the file grows.
  6. Only a short core is loaded always; the rest is retrieved by task type.
- Most quantitative evidence comes from narrow benchmarks (AppWorld, FiNER, WebArena, ALFWorld, AIME, Game of 24) with strong API models. Transfer to open-ended creative or production work is plausible but untested.

### Gaps
- I found no paper that measures the optimal number of always-loaded lessons, or compares a single "rules" file against retrieval for coding or creative agents in production.
- I found no head-to-head comparison of ACE-style counters with ExpeL-style vote pruning.
