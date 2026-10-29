---
description: "Create UI tests for required critical user journeys"
agent: test-engineer
tools: ["search", "read", "edit", "execute", "todo"]
---

# Create UI Tests

## Input

- `journeys` (optional): ${input:journeys}

## Instructions

1. **Determine journeys to cover**: If `journeys` was not provided, use the default set: create, edit, toggle, delete, and core error-state handling.

2. **Hard limit**: Create a **maximum of 5** Playwright tests for this run (target 3-5 total).
   - Include **at least 1** error-path test within the 3-5 total.
   - If more than 5 candidate scenarios exist, select the **highest-risk 5** and explicitly list the deferred scenarios in your report instead of creating additional tests.

3. **Author/update tests**:
   - Use the project's Playwright UI test framework.
   - Prefer stable, accessibility-first selectors (`getByRole`, `getByLabel`) and state-based waits — never arbitrary fixed delays.
   - Apply the Page Object Model (POM): place reusable interactions/selectors in page object classes/helpers, and keep test files focused on scenario intent and assertions.

4. **Verify the count before finishing**: Count the actual `test(...)`/`it(...)` cases created or updated in this run. If the count exceeds 5, trim it down to 5 or fewer.
   - Do not claim "small scope" or "3-5 tests" in your report if the final authored count is actually greater than 5 — the report must match reality.

5. **Report**:
   - Files changed/created.
   - Scenarios covered (list each by name).
   - Any deferred scenarios and why.
