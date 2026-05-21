---
title: "Are Agents Probabilistic Automation?"
date: "2026-05-21T12:00:00"
description: "A small ambiguity in a coding agent session made me think about long-running uncertainty, explicit workflows, and why serious agent systems need guardrails."
tags: ["agents", "llm", "automation", "engineering", "reliability"]
category: "engineering"
---

I started with a tiny ambiguity.

A coding agent asked whether it should inspect a pull request before closing it, or close it directly because the ticket looked stale. I replied with one word:

```text
yes
```

Then I interrupted the run, went back in the chat, and submitted the same `yes` again. I did that four times.

The agent mostly chose the safer path. It decided to inspect first before closing. That part was reassuring. But the reasoning was not the same each time. One run treated `yes` as clear approval to inspect. Another run explicitly said the answer was ambiguous. Another leaned on previous context and said this matched a pattern that had saved useful work earlier. One run had prose saying "inspect first" while the task label still looked like "closing".

That made me pause.

Not because this is a benchmark. Four runs tell us almost nothing about the true probability of any behavior. The useful part is smaller: a normal chat response had become an action selector.

## The four runs

Here is the rough shape of what happened.

| Run | Same input | How the agent interpreted it | Direction | What stood out |
|---:|---|---|---|---|
| 1 | `yes` | "yes, peek at the PR contents first" | Inspect first | Direct interpretation. No long explanation. |
| 2 | `yes` | "yes" is ambiguous, so choose the cautious move | Inspect first | Best handling. It noticed both possible meanings. |
| 3 | `yes` | Peek-then-decide matches a prior safety pattern | Inspect first | The decision came from context and memory of earlier work. |
| 4 | `yes` | Read as inspect first, but the task label still said closing | Inspect first, with confusing framing | The prose and task label were not perfectly aligned. |

The agent was not obviously wrong. In fact, I think it behaved reasonably. But the interface was weak. The user had said `yes` to a question with two possible actions.

![Ambiguous chat response as an action selector](/assets/blog/are-agents-probabilistic-automation/ambiguous-action-selector.svg)

That is the whole problem in miniature. Natural language is flexible. Automation wants sharper edges.

## The problem is not only sampling

It is tempting to say this is just sampling. Same context, same input, different generations. That is part of it, but I think it misses the more important point.

Sampling chooses among plausible continuations. Ambiguity creates the set of plausible continuations in the first place.

In this case, `yes` could reasonably mean:

| Interpretation | Result |
|---|---|
| Yes, inspect first | Safe, mostly read-only |
| Yes, close directly | Side effect |
| Yes is ambiguous | Ask the user |
| Use the safer default | Inspect first |
| Continue the current task label | Maybe close, maybe inspect first |

If the model picks the safe branch, everything feels fine. But the safety came from inference, not from the interface contract. That distinction matters once agents can edit files, close tickets, post comments, delete records, deploy code, or run database migrations.

The issue is not that models sample tokens. The issue is that we sometimes let sampled text become operational authority.

## Small uncertainty compounds

A single ambiguous decision is usually not the end of the world. The human can interrupt. The agent can ask a follow-up. A test can fail.

Long-running sessions are different. They contain many small branch points, and the human often cannot keep up with all of them. The agent is reading, editing, running commands, interpreting failures, updating plans, and carrying context forward.

I am also not claiming there is a fixed number of such decisions in a complex task. That number depends heavily on the context and requirements we provide. A well-defined task with clear constraints, examples, test commands, and boundaries creates fewer ambiguous branch points. An ill-defined task forces the agent to infer more. Every missing requirement becomes another place where the system has to guess.

Even if each ambiguous decision is usually right, "usually" gets uncomfortable over many decisions.

![Reliability decay for repeated ambiguous decisions](/assets/blog/are-agents-probabilistic-automation/reliability-decay.svg)

The math here is intentionally simple. If each ambiguous branch has probability `p` of matching user intent, then the probability that all `n` branches match intent is `p^n`.

| Ambiguous decisions | 99% correct each | 98% correct each | 95% correct each | 90% correct each |
|---:|---:|---:|---:|---:|
| 1 | 99.0% | 98.0% | 95.0% | 90.0% |
| 5 | 95.1% | 90.4% | 77.4% | 59.0% |
| 10 | 90.4% | 81.7% | 59.9% | 34.9% |
| 20 | 81.8% | 66.8% | 35.8% | 12.2% |
| 50 | 60.5% | 36.4% | 7.7% | 0.5% |
| 100 | 36.6% | 13.3% | 0.6% | ~0.0% |

This is illustrative, not measured. Real sessions are messier. Decisions are not independent. Some mistakes are recoverable. Tests and guardrails catch some failures. Human checkpoints can reset the path.

Still, the direction is hard to ignore. Good local judgment does not automatically become reliable long-running behavior.

## Toy ambiguity, real blast radius

The `yes` example is harmless enough. The same pattern shows up in more dangerous language.

| Phrase | Safe interpretation | Dangerous interpretation |
|---|---|---|
| "Clean up old records" | Archive stale test records | Delete production records |
| "Close stale PRs" | Inspect and preserve useful work first | Close without preserving context |
| "Reset the environment" | Reset local or dev | Reset staging or production |
| "Remove generated files" | Delete build artifacts | Delete hand-written files mistaken as generated |
| "Fix duplicate charges" | Produce a reconciliation report | Mutate billing records without enough checks |
| "Disable the old flow" | Feature-flag it for a test cohort | Break users still using a fallback path |

Most bad automation stories are not about a system being malicious. They are about a plausible instruction being executed in the wrong scope, at the wrong time, or with the wrong assumption.

Agents make this easier to trigger because natural language becomes the control plane.

![How one wrong branch can become durable state](/assets/blog/are-agents-probabilistic-automation/cascading-failure.svg)

They do not need to be wildly wrong. They only need to be slightly wrong at the wrong branch point.

## Agents feel more like probabilistic automation than coworkers

I keep coming back to an ML analogy.

In classical ML, we often choose a function form and estimate parameters. In deep learning, we learn more of the function from data. Coding agents feel like another step: a learned policy operating inside a tool environment.

The input is not just the user request. It includes the repo, conversation history, tool outputs, system prompt, memory, workflow instructions, and the current sampled trajectory. The output is not just text. It can be code edits, shell commands, comments, tickets, deployments, and other side effects.

| ML or systems idea | Coding agent equivalent |
|---|---|
| Input distribution | The kinds of repos, prompts, and tasks the agent handles well |
| Distribution shift | Hidden conventions, weird codebases, unclear requirements |
| Model uncertainty | The agent should ask, pause, or state assumptions |
| Evaluation | Tests, review, repeated-run checks, golden tasks |
| Guardrails | Permissions, hooks, linters, protected actions |
| Feedback loop | CI, type checks, runtime logs, human review |
| Drift | Long session context moves away from the original goal |
| Side effects | Code edits, deletes, comments, deploys, data mutations |

This is why I do not like treating coding agents as magic coworkers. They are useful, but they are not deterministic workers. They are probabilistic automation systems with tools.

That framing changes how I want to use them.

## Learning before execution

If I can do the task without an LLM, I should be able to specify it clearly to an LLM.

If I cannot specify it clearly, the task is not implementation yet. It is discovery.

That split feels important.

| Mode | Goal | What the agent should do |
|---|---|---|
| Learning mode | Understand the system or problem | Read, inspect, summarize, identify unknowns |
| Specification mode | Turn understanding into requirements | Restate behavior, constraints, non-goals |
| Execution mode | Make bounded changes | Follow a plan, edit files, run checks |
| Verification mode | Prove the change works | Tests, types, logs, diffs, screenshots |
| Operation mode | Perform real-world side effects | Require explicit approval and guardrails |

The bad pattern is mixing these together:

```text
Figure out the system and implement the fix.
```

Sometimes that is fine. For a hobby project or a throwaway prototype, exploration is the point. Let the agent wander. See what comes back.

For durable systems, especially customer-facing systems, that shortcut becomes debt. If the human skips understanding, the agent does not remove that debt. It turns it into system behavior.

![A safer workflow separates learning from execution](/assets/blog/are-agents-probabilistic-automation/agent-workflow.svg)

Strict workflow does not make the model non-probabilistic. It reduces the space of allowed actions.

That is the point.

## Guardrails are not optional for serious work

The right answer is not "make the prompt better". Better prompts help, but they are not enough. The safer pattern is to wrap the model in boring engineering.

| Risk | Guardrail |
|---|---|
| Ambiguous approval | Require explicit action tokens like `inspect`, `close`, `delete`, `deploy` |
| Wrong target environment | Display the environment and require confirmation for production |
| Destructive operation | Run a dry run first; require typed confirmation |
| Context drift | Periodically restate the plan and current assumptions |
| Wrong implementation | Run tests, type checks, linters, and contract checks |
| Hidden side effects | Separate read-only, write, publish, and delete permissions |
| Human cannot keep up | Pause at irreversible boundaries |
| Invented assumptions | Require assumptions and unknowns before execution |
| Long-running autonomy | Use runbooks or state machines instead of free-form chat loops |
| Unclear requirements | Force learning and specification before implementation |

This also changes how much freedom I want to give an agent.

| Situation | Agent freedom I am comfortable with |
|---|---|
| Throwaway prototype | High |
| Hobby project | Medium to high |
| Internal low-risk tool | Medium |
| Customer-facing product | Low to medium |
| Billing, auth, migrations, infrastructure | Low |
| High-reliability system | Very low, with strict workflow |

The important part is not to ban autonomy. It is to match autonomy to blast radius, reversibility, and verification quality.

## Where I land

The small `yes` experiment did not show that the agent was bad. If anything, it showed a useful safety bias: when the answer was ambiguous, it usually chose to inspect before acting.

But I do not want important systems to depend on "usually".

Natural language is a great interface for exploration. It is a weak interface for permissioning side effects.

Agents reduce the cost of making changes. They do not reduce the cost of knowing which changes should be made. For serious systems, the way forward is not just better prompts. It is explicit requirements, strict workflows, automated feedback, and guarded side effects.
