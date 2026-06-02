import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import { getCurrentUser } from "@/lib/server-auth";
import { SettingsView } from "@/components/settings/SettingsView";

export default async function SettingsPage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/login?next=/settings");
  }

  // Pull the canonical record so the page reflects the database, not just the
  // (possibly stale) session cookie — and so we can show the real join date.
  const [account] = await db
    .select({
      username: users.username,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.username, session.username));

  if (!account) {
    // Session points at a user that no longer exists (e.g. deleted account).
    redirect("/login?next=/settings");
  }

  return (
    <SettingsView
      user={{
        username: account.username,
        name: account.name,
        email: account.email,
      }}
      memberSince={account.createdAt.toISOString()}
    />
  );
}
