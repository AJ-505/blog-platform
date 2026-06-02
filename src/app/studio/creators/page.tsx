import { redirect } from "next/navigation";

import { CreatorEditor } from "@/components/studio/CreatorEditor";
import { getDraftForEditor } from "@/lib/posts";
import { getCurrentUser } from "@/lib/server-auth";

interface PageProps {
  searchParams: Promise<{ draft?: string }>;
}

export default async function CreatorsPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/studio/creators");
  }

  const { draft: draftParam } = await searchParams;
  const draftId = Number(draftParam);
  const draft =
    draftParam && Number.isFinite(draftId)
      ? await getDraftForEditor(draftId, user.username)
      : undefined;

  return <CreatorEditor user={user} draft={draft ?? undefined} />;
}
