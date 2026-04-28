# Backend Team Guide

Welcome to the backend API guide! Your domain is the `src/app/api/` folder. Here, you will build the REST APIs that the frontend uses.

## 🤝 Your Best Friends (Documentation)

Keep these links bookmarked, they are your survival guide:

- [**Drizzle ORM Full Documentation**](https://orm.drizzle.team/docs/overview)
- [**Drizzle ORM: Querying Data (CRUD)**](https://orm.drizzle.team/docs/data-querying) - _Crucial for writing API routes!_
- [**Neon DB Setup & Schema Guide**](https://api-design-with-node-v5.super.site/4-db-setup-and-schema) - _Reference this for how we structure our tables._
- [**DB Connection & Seeding Guide**](https://api-design-with-node-v5.super.site/5-setting-up-db-connection-and-seed) - _Reference this for how our connection pooling works with Neon!_

## Database Connection Strategy

If you look in `src/db/index.ts`, you will notice we are using the standard `pg` driver with connection pooling. **We do NOT use the serverless driver.** The standard pool is much more reliable for our architecture. Make sure your `.env` file has the `DATABASE_URL` set!

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
