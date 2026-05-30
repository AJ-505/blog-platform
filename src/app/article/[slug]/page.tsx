import fs from "fs";
import path from "path";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  
  let content = "";
  try {
    const filePath = path.join(process.cwd(), "content", `${slug}.md`);
    content = fs.readFileSync(filePath, "utf8");
  } catch (e) {
    return (
      <main className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex flex-col items-center justify-center p-12">
          <h1 className="text-3xl font-bold">Article not found</h1>
          <Link href="/" className="mt-4 block hover:underline text-on-surface-variant">← Back to home</Link>
        </div>
        <SiteFooter />
      </main>
    );
  }

  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = content.match(frontmatterRegex);
  const markdownContent = match ? content.slice(match[0].length) : content;

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <div className="flex-1 container mx-auto max-w-[800px] px-4 py-16 sm:py-24">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-on-surface-variant hover:text-primary mb-12 transition-colors">
          <span aria-hidden className="mr-2">←</span> Back home
        </Link>
        <article className="prose prose-neutral lg:prose-lg dark:prose-invert max-w-none prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-border/50">
          <MDXRemote 
            source={markdownContent} 
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
              }
            }} 
          />
        </article>
      </div>

      <SiteFooter />
    </main>
  );
}
