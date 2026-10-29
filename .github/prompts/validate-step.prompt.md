---
description: "Validate that all success criteria for the current step are met"
agent: code-reviewer
tools: ["search", "read", "execute", "web", "todo"]
---

# Validate Step

## Input

- `step-number` (**required**, e.g., "5-0", "5-1"): ${input:step-number}

## Instructions

1. **Locate the main exercise issue**: Use the `gh` CLI (see Workflow Utilities in [.github/copilot-instructions.md](../copilot-instructions.md)) to find the issue with "Exercise:" in the title.

2. **Get full context**: Fetch the issue with comments (`gh issue view <issue-number> --comments`).

3. **Find the step**: Search through the issue and its comments for the heading `# Step {step-number}:`.

4. **Extract success criteria**: Pull out the "Success Criteria" section listed under that step.

5. **Check each criterion** against the actual current workspace state — run tests, lint, or inspect files as needed to verify, rather than assuming.

6. **Report results**:
   - List each success criterion with a clear ✅ (met) or ❌ (not met) status.
   - For any ❌ item, give specific, actionable guidance on what's missing and how to address it.
   - Give an overall summary: is the step fully complete or not?
