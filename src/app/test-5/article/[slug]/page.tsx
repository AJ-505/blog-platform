import fs from "fs";
import path from "path";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

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
      <div className="theme-minimal min-h-screen bg-background text-foreground p-12">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <Link href="/test-5" className="mt-4 block hover:underline text-muted-foreground">← Back</Link>
      </div>
    );
  }

  // Remove frontmatter naively for simplicity, or we can use gray-matter.
  // Actually, let's just strip frontmatter if it exists using a regex.
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = content.match(frontmatterRegex);
  const markdownContent = match ? content.slice(match[0].length) : content;

  return (
    <div className="theme-minimal min-h-screen font-[family-name:var(--font-instrument)] bg-background text-foreground antialiased">
      <header className="px-12 py-8 flex justify-between items-center border-b border-border/50">
        <Link href="/test-5" className="text-xl font-medium tracking-tight">
          Scribbled.
        </Link>
        <Link href="/test-5" className="text-sm font-medium hover:opacity-70 transition-opacity">
          ← Back
        </Link>
      </header>

      <main className="px-12 py-24 max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <MDXRemote 
          source={markdownContent} 
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
            }
          }} 
        />
      </main>
    </div>
  );
}
