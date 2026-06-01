# Backend Team Guide

Welcome to the backend API guide! Your domain is the `src/app/api/` folder. Here, you will build the REST APIs that the frontend uses.

## 🤝 Your Best Friends (Documentation)

Keep these links bookmarked, they are your survival guide:

- [**Drizzle ORM Full Documentation**](https://orm.drizzle.team/docs/overview)
- [**Drizzle ORM: Querying Data (CRUD)**](https://orm.drizzle.team/docs/data-querying) - _Crucial for writing API routes!_
- [**Drizzle with Turso**](https://orm.drizzle.team/docs/tutorials/drizzle-with-turso) - _Reference this for Turso/libSQL setup._
- [**Turso TypeScript SDK**](https://docs.turso.tech/sdk/ts/quickstart) - _Reference this for the underlying libSQL client._

## Database Connection Strategy

If you look in `src/db/index.ts`, you will notice we are using Turso through `@libsql/client` and Drizzle's `libsql` adapter. Make sure your `.env` file has `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` set.

Run migrations before using a fresh Turso database:

```bash
pnpm db:migrate
```

Run the discover seed data with:

```bash
pnpm db:seed:discover
```

The seed script can be rerun safely because it uses `ON CONFLICT` upserts. Do not wrap separate Turso HTTP seed calls in a manual `BEGIN`/`ROLLBACK` transaction; the remote client may not keep that transaction active across calls.

## How to build an API Route

Next.js App Router maps folders to API endpoints.

For example, to create a `GET` request for `/api/hello`, you create a file at `src/app/api/hello/route.ts` and export a `GET` function:

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello World from the Backend API!" });
}
```

- **Rule:** Validate your inputs, execute the Drizzle query using `import { db } from "@/db";`, and return standard JSON responses with appropriate HTTP status codes (200 OK, 400 Bad Request, 500 Server Error).

You can test your endpoints locally using Postman or Insomnia before the frontend team connects to them.
