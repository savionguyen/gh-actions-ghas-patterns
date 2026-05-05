# routes/

Express route handlers live here. Each file groups endpoints for a single resource.

**Responsibility:** Parse HTTP input, call the appropriate service method, and return the HTTP response. Contains zero business logic — no direct repository access, no data transformation beyond what is needed to respond.

Example structure (to be added in the next commit):

```
routes/
└── users.ts   # GET /users, POST /users, GET /users/:id, …
```
