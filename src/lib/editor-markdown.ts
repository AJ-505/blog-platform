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
