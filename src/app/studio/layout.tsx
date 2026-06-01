import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/server-auth";

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/studio/creators");
  }

  return children;
}
