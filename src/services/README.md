# services/

Business logic lives here. Services are the only layer that may call repositories.

**Responsibility:** Enforce domain rules, orchestrate repository calls, and throw typed domain errors (from `src/types/errors.ts`) when preconditions are not met. Services must not import from `routes/` and must not know about HTTP status codes or request/response objects.

Example structure (to be added in the next commit):

```
services/
└── userService.ts   # createUser, getUserById, listUsers, …
```
