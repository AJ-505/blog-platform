import { redirect } from "next/navigation";

import { CreatorEditor } from "@/components/studio/CreatorEditor";
import { getCurrentUser } from "@/lib/server-auth";

export default async function CreatorsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/studio/creators");
  }

  return <CreatorEditor user={user} />;
}
