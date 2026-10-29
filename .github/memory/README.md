# Memory System

## Purpose

This directory implements a **working memory system** for AI-assisted development. As Copilot and developers work through TDD cycles, linting passes, and debugging sessions, they discover patterns, make decisions, and learn lessons specific to this codebase. This system captures that knowledge so it isn't lost at the end of a session and can be reused in future work.

## Two Types of Memory

### Persistent Memory — [.github/copilot-instructions.md](../copilot-instructions.md)

- Foundational, stable guidance: project context, principles, workflows, and agent usage.
- Changes rarely — only when the project's core approach changes.
- Always loaded as context for every AI interaction in this workspace.

### Working Memory — `.github/memory/`

- Discoveries, patterns, decisions, and in-progress notes accumulated **during** development.
- Evolves constantly as work progresses.
- Split into **committed** (historical record) and **ephemeral** (active scratch work) content.

## Directory Structure

```
.github/memory/
├── README.md                    # This file — how to use the memory system
├── session-notes.md             # Historical summaries of completed sessions (committed)
├── patterns-discovered.md       # Accumulated code patterns and conventions (committed)
└── scratch/
    ├── .gitignore                # Ignores all scratch files (not committed)
    └── working-notes.md          # Active, in-progress session notes (not committed)
```

| File | Committed? | Purpose |
|---|---|---|
| [session-notes.md](./session-notes.md) | ✅ Yes | Summaries of **completed** sessions — a historical log |
| [patterns-discovered.md](./patterns-discovered.md) | ✅ Yes | Reusable patterns, conventions, and lessons learned |
| [scratch/working-notes.md](./scratch/working-notes.md) | ❌ No | Scratchpad for the **current, active** session |

The key distinction: [scratch/working-notes.md](./scratch/working-notes.md) is for messy, in-the-moment thinking during active work. [session-notes.md](./session-notes.md) is the cleaned-up, permanent summary written once that work is done.

## When to Use Each File

### During TDD Workflows

- As you read failing tests and form a plan, jot it down in [scratch/working-notes.md](./scratch/working-notes.md) under **Current Task** and **Approach**.
- When you discover *why* a test fails (root cause, not just symptom), record it under **Key Findings**.
- If you settle on an implementation approach after considering alternatives, log it under **Decisions Made**.
- If the same kind of fix (e.g., "always initialize arrays, never leave undefined") shows up more than once, promote it to [patterns-discovered.md](./patterns-discovered.md).

### During Linting/Code Quality Workflows

- Note any systemic issues (e.g., "console.log left in by design for Step 5-2 exercise — don't auto-remove") in [scratch/working-notes.md](./scratch/working-notes.md) so they aren't accidentally "fixed" incorrectly.
- If a lint rule repeatedly trips up the same kind of code, document the preferred fix pattern in [patterns-discovered.md](./patterns-discovered.md).

### During Debugging

- Record hypotheses and what was tried under **Approach** and **Blockers** in [scratch/working-notes.md](./scratch/working-notes.md) — this avoids repeating failed attempts.
- Once root-caused, capture the bug + fix as a pattern if it's likely to recur elsewhere in the codebase.

### At End of Session

1. Review [scratch/working-notes.md](./scratch/working-notes.md).
2. Write a concise entry in [session-notes.md](./session-notes.md) (what was accomplished, key findings/decisions, outcomes).
3. Extract any reusable pattern into [patterns-discovered.md](./patterns-discovered.md).
4. Leave [scratch/working-notes.md](./scratch/working-notes.md) in place for the next session to overwrite (it is not committed, so its stale content doesn't pollute history).

## How AI Reads and Applies These Patterns

When working in this repository, Copilot should:

- Check [patterns-discovered.md](./patterns-discovered.md) before implementing similar functionality, to stay consistent with established conventions (e.g., initialization patterns, error-handling style).
- Check [session-notes.md](./session-notes.md) for historical context on *why* certain decisions were made, to avoid re-litigating settled questions.
- Read [scratch/working-notes.md](./scratch/working-notes.md) at the start of a session to pick up where the previous (possibly interrupted) session left off.
- Proactively suggest adding new entries to these files when a non-trivial discovery, decision, or recurring pattern emerges during the conversation.

## Why Split Committed vs. Ephemeral?

- **Ephemeral scratch work** is allowed to be messy, incomplete, and session-specific — this encourages actually writing things down without worrying about polish.
- **Committed history** stays clean, curated, and genuinely useful to future contributors (human or AI) browsing git history — not cluttered with abandoned trains of thought.
