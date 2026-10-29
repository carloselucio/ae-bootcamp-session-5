---
description: "Execute instructions from the current GitHub Issue step"
agent: tdd-developer
tools: ["search", "read", "edit", "execute", "web", "todo"]
---

# Execute Step

## Input

- `issue-number` (optional): ${input:issue-number}

## Instructions

1. **Locate the issue**:
   - If `issue-number` was provided, use it directly.
   - Otherwise, use the `gh` CLI to find the exercise issue (see Workflow Utilities in [.github/copilot-instructions.md](../copilot-instructions.md)): list open issues and find the one with "Exercise:" in the title.

2. **Get full context**: Fetch the issue with comments (`gh issue view <issue-number> --comments`).

3. **Parse the latest step**: Identify the most recent/current step instructions posted as a comment on the issue.

4. **Execute systematically**: Work through each `⌨️ Activity:` section in the step, implementing the required changes one at a time.
   - **Scope boundary**: Do NOT create or run Playwright UI tests in this prompt. If the step requires UI test coverage, that work belongs to `/create-ui-tests` and `/run-ui-tests` (both auto-switch to the `test-engineer` agent).
   - Follow the testing scope and TDD principles defined in [.github/copilot-instructions.md](../copilot-instructions.md) — write tests first for new backend/frontend behavior.

5. **Do not commit or push**: Committing and pushing is handled exclusively by `/commit-and-push`. Leave changes staged/unstaged in the working tree.

6. **Stop and report next steps**: After completing all activities for the step, report:
   - A summary of what was implemented.
   - Whether the current step requires UI workflow coverage (i.e., mentions Playwright/UI journeys).
   - The exact next command(s) to run, in order:
     - **If UI workflow is required**: `/create-ui-tests` → `/run-ui-tests` → `/validate-step {step-number}`
     - **If UI workflow is not required**: `/validate-step {step-number}`
   - Never recommend `/validate-step` before any required UI prompts have been completed.
