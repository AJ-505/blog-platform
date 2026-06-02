import fs from "fs";
import path from "path";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { CommentsSection } from "@/components/CommentsSection";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { getCommentsForPost } from "@/lib/comments";
import { getPostBySlug } from "@/lib/posts";
import { getCurrentUser } from "@/lib/server-auth";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const dbPost = await getPostBySlug(slug);
  const postComments = dbPost ? await getCommentsForPost(dbPost.id) : [];
  const currentUser = await getCurrentUser();
  let content = "";

  if (dbPost) {
    content = dbPost.content;
  } else {
    try {
      const filePath = path.join(process.cwd(), "content", `${slug}.md`);
      content = fs.readFileSync(filePath, "utf8");
    } catch {
      return (
        <main className="min-h-screen flex flex-col">
          <SiteHeader />
          <div className="flex-1 flex flex-col items-center justify-center p-12">
            <h1 className="text-3xl font-bold">Article not found</h1>
            <Link
              href="/"
              className="mt-4 block hover:underline text-on-surface-variant"
            >
              ← Back to home
            </Link>
          </div>
          <SiteFooter />
        </main>
      );
    }
  }

  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = content.match(frontmatterRegex);
  const markdownContent = match ? content.slice(match[0].length) : content;

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <div className="flex-1 container mx-auto max-w-[800px] px-4 py-16 sm:py-24">
        <Link
          href="/discover"
          className="inline-flex items-center text-sm font-medium text-on-surface-variant hover:text-primary mb-12 transition-colors"
        >
          <span aria-hidden className="mr-2">
            ←
          </span>{" "}
          Back to discover
        </Link>
        {dbPost ? (
          <header className="mb-10">
            {dbPost.badge ? (
              <p className="text-xs font-semibold tracking-wide text-secondary">
                {dbPost.badge}
              </p>
            ) : null}
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-on-surface">
              {dbPost.title}
            </h1>
            <p className="mt-4 text-on-surface-variant">By {dbPost.author}</p>
          </header>
        ) : null}
        <article className="prose prose-neutral lg:prose-lg max-w-none prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-border/50">
          <MDXRemote
            source={markdownContent}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
              },
            }}
          />
        </article>
        {dbPost ? (
          <CommentsSection
            postId={dbPost.id}
            postSlug={dbPost.slug}
            initialComments={postComments}
            currentUser={currentUser}
          />
        ) : null}
      </div>

      <SiteFooter />
    </main>
  );
}
