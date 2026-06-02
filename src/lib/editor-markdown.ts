import type { JSONContent } from "@tiptap/react";

function escapeMarkdown(value: string) {
  return value.replace(/([\\`*_{}[\]()#+.!|>-])/g, "\\$1");
}

function markText(text: string, marks: JSONContent["marks"] = []) {
  return marks.reduce((current, mark) => {
    if (mark.type === "bold") return `**${current}**`;
    if (mark.type === "italic") return `*${current}*`;
    if (mark.type === "code") return `\`${current}\``;
    if (mark.type === "link" && typeof mark.attrs?.href === "string") {
      return `[${current}](${mark.attrs.href})`;
    }

    return current;
  }, escapeMarkdown(text));
}

function inlineContent(node: JSONContent): string {
  return (node.content ?? [])
    .map((child) => {
      if (child.type === "text") {
        return markText(child.text ?? "", child.marks);
      }

      if (child.type === "hardBreak") {
        return "\n";
      }

      return inlineContent(child);
    })
    .join("");
}

function blockToMarkdown(node: JSONContent, depth = 0): string {
  switch (node.type) {
    case "heading": {
      const level = Number(node.attrs?.level ?? 2);
      return `${"#".repeat(Math.min(Math.max(level, 1), 6))} ${inlineContent(node)}`;
    }
    case "paragraph":
      return inlineContent(node);
    case "blockquote":
      return (node.content ?? [])
        .map((child) =>
          blockToMarkdown(child, depth)
            .split("\n")
            .map((line) => `> ${line}`)
            .join("\n"),
        )
        .join("\n>\n");
    case "bulletList":
      return (node.content ?? [])
        .map((child) => blockToMarkdown(child, depth))
        .join("\n");
    case "orderedList":
      return (node.content ?? [])
        .map((child, index) => blockToMarkdown(child, index + 1))
        .join("\n");
    case "listItem": {
      const marker = depth > 0 ? `${depth}.` : "-";
      return (node.content ?? [])
        .map((child, index) => {
          const content = blockToMarkdown(child, 0);
          if (index === 0) return `${marker} ${content}`;
          return content
            .split("\n")
            .map((line) => `  ${line}`)
            .join("\n");
        })
        .join("\n");
    }
    case "codeBlock":
      return `\`\`\`${node.attrs?.language ?? ""}\n${inlineContent(node)}\n\`\`\``;
    case "horizontalRule":
      return "---";
    default:
      return inlineContent(node);
  }
}

export function editorJsonToMarkdown(doc: JSONContent) {
  return (doc.content ?? [])
    .map((node) => blockToMarkdown(node).trimEnd())
    .filter(Boolean)
    .join("\n\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Convert the inline markdown produced by `markText` back into HTML. The order
// matters: links and code spans are resolved before emphasis so their contents
// are not reinterpreted, and backslash escapes are stripped last.
function inlineMarkdownToHtml(text: string) {
  let html = escapeHtml(text);

  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match, label, href) => `<a href="${href}">${label}</a>`,
  );
  html = html.replace(/`([^`]+)`/g, (_match, code) => `<code>${code}</code>`);
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  // Drop the backslashes that `escapeMarkdown` added for literal characters.
  html = html.replace(/\\([\\`*_{}[\]()#+.!|>-])/g, "$1");

  return html;
}

// Reverse of `editorJsonToMarkdown` for the subset of markdown the editor emits,
// producing HTML that Tiptap's StarterKit can parse back into editor content.
// Drafts are stored as markdown, so this lets a saved draft reopen in the editor.
export function markdownToEditorHtml(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim() === "") {
      index += 1;
      continue;
    }

    // Fenced code block.
    const fence = line.match(/^```(.*)$/);
    if (fence) {
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1; // skip closing fence
      blocks.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      continue;
    }

    // Horizontal rule.
    if (/^---+$/.test(line.trim())) {
      blocks.push("<hr>");
      index += 1;
      continue;
    }

    // Heading.
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      blocks.push(`<h${level}>${inlineMarkdownToHtml(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    // Blockquote (consecutive `>` lines).
    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      const inner = quoteLines
        .filter((l) => l.trim() !== "")
        .map((l) => `<p>${inlineMarkdownToHtml(l)}</p>`)
        .join("");
      blocks.push(`<blockquote>${inner}</blockquote>`);
      continue;
    }

    // Lists (bulleted or numbered).
    const listMatch = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (listMatch) {
      const ordered = /\d+\./.test(listMatch[2]);
      const items: string[] = [];
      while (index < lines.length) {
        const itemMatch = lines[index].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
        if (!itemMatch) break;
        items.push(`<li><p>${inlineMarkdownToHtml(itemMatch[3])}</p></li>`);
        index += 1;
      }
      const tag = ordered ? "ol" : "ul";
      blocks.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }

    // Paragraph: gather consecutive plain lines.
    const paragraphLines: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() !== "" &&
      !/^(#{1,6})\s+/.test(lines[index]) &&
      !/^>\s?/.test(lines[index]) &&
      !/^```/.test(lines[index]) &&
      !/^---+$/.test(lines[index].trim()) &&
      !/^(\s*)([-*]|\d+\.)\s+/.test(lines[index])
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }
    blocks.push(
      `<p>${paragraphLines.map(inlineMarkdownToHtml).join("<br>")}</p>`,
    );
  }

  return blocks.join("") || "<p></p>";
}
