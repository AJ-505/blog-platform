# blog-platform

## Setup

Fork this repository first.

Then clone your fork and move into the project root:

```bash
git clone <your-fork-url> 
# i.e:
git clone https://github.com/<your-username>/blog-platform
cd blog-platform
```

This project uses `pnpm` only.

If you do not have `pnpm` installed yet, install it with:

```bash
npm install -g pnpm
```

Then install dependencies from the repo root:

```bash
pnpm install
```

## Run

Frontend:

```bash
cd frontend
pnpm dev
```

Backend:

```bash
cd backend
pnpm dev
```

Typecheck:

```bash
pnpm typecheck
```

Build frontend:

```bash
cd frontend
pnpm build
```

## Contributing

1. Fork the repo.
2. Clone your fork.
3. Create a branch.
4. Make your changes.
5. Run from the repo root:

```bash
pnpm typecheck # check for errors
cd frontend
pnpm build # ensure that this works perfectly
```

6. Open a PR.

Use `pnpm`. Do not use `npm` or `yarn` for installs or scripts in this repo.

## Why pnpm?

- It is faster for repeated installs.
- It uses less disk space by reusing packages efficiently.
- It is strict about dependencies, which helps catch bad package usage earlier.
- It works well for this repo’s workspace setup.
