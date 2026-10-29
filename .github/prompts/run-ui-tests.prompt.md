---
description: "Run UI tests and summarize failures"
agent: test-engineer
tools: ["read", "execute", "todo"]
---

# Run UI Tests

## Instructions

1. **Required first step — install Playwright dependencies**:
   - Run `npm run test:ui:install --workspace=frontend`. Repeat this after any container rebuild.
   - On Ubuntu/Linux environments, this command is **mandatory** and must perform `playwright install --with-deps chromium` before tests run.
   - `test:ui:install` includes automatic bounded Ubuntu repo remediation for the common Yarn key issue, plus one retry. **Do not** perform ad-hoc package hunting or broad OS troubleshooting beyond that automated remediation.
   - If install still fails after the automated remediation and retry: **stop immediately** and report an environment blocker, including the failing command and the key error lines. **Do not** continue to run Playwright tests after a failed dependency install.

2. **Ensure the app is running**: Confirm both backend and frontend are running. If not, start them from the repo root with `npm start`.

3. **Run the UI tests**: Use the project's UI test command (`npm run test:ui`).

4. **Summarize results**:
   - Report pass/fail counts plainly.
   - For each failure, name the test and give a one-line description of what broke.

5. **Classify failures**: For each failure, provide a likely root cause category:
   - **Application code** — the app behaves incorrectly.
   - **Test code** — selector/assertion/timing issue in the test itself.
   - **Environment** — flaky infra, port conflicts, missing env var, browser/driver mismatch.
