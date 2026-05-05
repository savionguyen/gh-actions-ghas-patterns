# repositories/

Data access lives here. Currently uses an in-memory store; intended to be swapped for a real database in a later commit.

**Responsibility:** Persist and retrieve domain objects. Repositories have no knowledge of HTTP, no business rules, and no direct contact with routes or services beyond the interface they expose. When the backing store changes (e.g., swapping in a SQL database for injection demos), only this layer needs to change.

Example structure (to be added in the next commit):

```
repositories/
└── userRepository.ts   # findById, findAll, save, delete, …
```
