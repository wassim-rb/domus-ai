# Agent Instructions

Read this entire file before starting any task.

## Self-Correcting Rules Engine

This file contains a growing ruleset that improves over time. **At session start, read the entire "Learned Rules" section before doing anything.**

### How it works

1. When the user corrects you or you make a mistake, **immediately append a new rule** to the "Learned Rules" section at the bottom of this file.
2. Rules are numbered sequentially and written as clear, imperative instructions.
3. Format: `N. [CATEGORY] Never/Always do X — because Y.`
4. Categories: `[STYLE]`, `[CODE]`, `[ARCH]`, `[TOOL]`, `[PROCESS]`, `[DATA]`, `[UX]`, `[OTHER]`
5. Before starting any task, scan all rules below for relevant constraints.
6. If two rules conflict, the higher-numbered (newer) rule wins.
7. Never delete rules. If a rule becomes obsolete, append a new rule that supersedes it.

### When to add a rule

- User explicitly corrects your output ("no, do it this way")
- User rejects a file, approach, or pattern
- You hit a bug caused by a wrong assumption about this codebase
- User states a preference ("always use X", "never do Y")


## Learned Rules

<!-- New rules are appended below this line. Do not edit above this section. -->

1. [TOOL] Always invoke the `anthropic-skills:frontend-design` skill before making any frontend decision (layout, typography, color, component design, animations, spacing) — because it enforces a distinctive, production-grade aesthetic standard and prevents generic AI-slop output.

2. [TOOL] Always invoke the `anthropic-skills:content-pipeline` skill before writing or rewriting any copy (headlines, descriptions, CTAs, section text, labels) — because it applies a rigorous editorial process (thesis, deconstruction, reconstruction, storytelling) that produces sharper, more persuasive content.

3. [STYLE] Always use "collaborateur/collaborateurs" instead of "négociateur/négociateurs" throughout all copy — because the client prefers this term.
