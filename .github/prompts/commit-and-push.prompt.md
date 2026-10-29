---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ["read", "execute", "todo"]
---

# Commit and Push

## Input

- `branch-name` (**required**): ${input:branch-name}

If `branch-name` was not provided, ask the user for it before proceeding. Do not guess a branch name.

## Instructions

1. **Check UI test prerequisites**: If the current step included a required UI workflow (Playwright tests), confirm that `/run-ui-tests` has already been run successfully in this chat, or run `npm run test:ui` now and ensure it passes, before committing.

2. **Analyze changes**: Run `git diff` (and `git diff --staged` if relevant) to understand what changed.

3. **Generate commit message**: Write a descriptive commit message using conventional commit format (`feat:`, `fix:`, `chore:`, `docs:`, etc.) as described in the Git Workflow section of [.github/copilot-instructions.md](../copilot-instructions.md). Base the message on the actual diff content, not assumptions.

4. **Set up the branch**:
   - If `branch-name` does not exist yet, create and switch to it: `git checkout -b <branch-name>`.
   - If it already exists, switch to it: `git checkout <branch-name>`.

5. **Stage all changes**: `git add .`

6. **Commit**: Commit with the generated conventional commit message.

7. **Push**: `git push origin <branch-name>`

## Hard Constraint

- **DO NOT commit to `main` or any branch other than the user-provided `branch-name`.** If already on a different branch and switching fails, stop and report the issue rather than committing to the wrong branch.
