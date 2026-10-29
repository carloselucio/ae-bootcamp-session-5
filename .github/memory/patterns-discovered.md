# Patterns Discovered

Accumulated code patterns, conventions, and lessons learned while working on this codebase. This file is **committed to git**. Unlike [session-notes.md](./session-notes.md) (which records *what happened in a session*), this file records *reusable knowledge* — patterns that should inform how similar code is written in the future, regardless of which session discovered them.

Add new patterns to the **bottom** of the list, grouped by area (backend/frontend/testing) if the list grows large.

## Pattern Template

```markdown
### <Pattern Name>

- **Context**: Where/when this pattern applies.
- **Problem**: What goes wrong without this pattern.
- **Solution**: The recommended approach.
- **Example**:
  ```js
  // code example
  ```
- **Related files**: Links to files where this pattern is used or was discovered.
```

---

### Service State Initialization (Empty Array vs. `null`/`undefined`)

- **Context**: Any in-memory "store" or service-level collection (e.g., the `todos` list in the backend) that is read/written across requests.
- **Problem**: Declaring the collection without an initial value (`let todos;`) leaves it `undefined` until first assigned, causing `TypeError` on array methods (`.find`, `.filter`, `.push`) the first time a route is hit — a subtle bug that only surfaces at runtime, not at compile time.
- **Solution**: Always initialize collections to their "empty" value (`[]` for arrays, `{}` for maps/objects) at declaration time, not lazily on first use.
- **Example**:
  ```js
  // ❌ Bug: undefined until first write
  let todos;

  // ✅ Correct: always a valid, iterable collection
  let todos = [];
  ```
- **Related files**: [packages/backend/src/app.js](../../packages/backend/src/app.js)
