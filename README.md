# gh-actions-ghas-patterns

Hands-on patterns for GitHub Actions and GHAS — secret scanning, CodeQL, and Dependabot in practice.

This repository pairs a minimal TypeScript + Express backend with a set of GitHub Actions workflows that demonstrate real-world GHAS features. The backend exists so that security findings are meaningful; the real content is the workflows and security scenarios.

---

## Status

> **Scaffold commit.** The backend skeleton (structure, tooling, error handling, and a single `/health` endpoint) is in place. An example resource (with intentional security scenarios) lands in the next commit.

---

## Setup

### Prerequisites

- Node.js ≥ 20 (use [nvm](https://github.com/nvm-sh/nvm): `nvm use`)
- npm ≥ 10

### Install

```bash
nvm use          # pins to Node 20 via .nvmrc
npm install
```

### Environment

```bash
cp .env.example .env
# edit .env as needed
```

### Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start dev server with file-watch reload  |
| `npm run build` | Compile TypeScript to `dist/`            |
| `npm start`     | Run compiled output                      |
| `npm test`      | Run tests with Vitest                    |
| `npm run lint`  | Lint with ESLint                         |

---

## Architecture

The backend follows a strict three-layer architecture:

**Route → Service → Repository**

- **Routes** (`src/routes/`) handle HTTP only: parse the request, call a service method, and return the response. They contain zero business logic.
- **Services** (`src/services/`) own business logic and are the only layer that calls repositories. They throw typed domain errors (`NotFoundError`, `ValidationError`) which the error-handler middleware translates to structured HTTP responses.
- **Repositories** (`src/repositories/`) handle data access. Currently in-memory; designed to be swapped for a real database without touching any other layer.

Zod schemas (`src/schemas/`) validate request and response shapes at runtime, keeping TypeScript's compile-time guarantees aligned with actual data. Centralized error handling (`src/middleware/errorHandler.ts`) ensures every error response has the shape `{ error: { code, message } }`.

### Module system

CommonJS (`"module": "commonjs"` in `tsconfig.json`) was chosen as the default. It remains the most widely used module format in the Node.js + TypeScript enterprise ecosystem and has the broadest compatibility with Express and its ecosystem.

---

## Project structure

```
src/
├── routes/          # Express route handlers (HTTP only)
├── services/        # Business logic
├── repositories/    # Data access (in-memory store)
├── schemas/         # Zod request/response schemas
├── types/           # Shared TypeScript types and domain errors
├── middleware/      # Error handler, request logger
├── config.ts        # Centralised env/config loading
├── app.ts           # Express app setup
└── index.ts         # Entry point
```

Each of `routes/`, `services/`, and `repositories/` contains a `README.md` that explains the layer's responsibilities.

