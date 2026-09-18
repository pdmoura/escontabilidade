import { randomUUID } from "node:crypto";
import type { GeneratedBlock } from "./schema";

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type Block = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3" | "blockquote";
  markDefs: never[];
  children: Span[];
  listItem?: "bullet" | "number";
  level?: number;
};

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

function block(style: Block["style"], text: string, list?: Block["listItem"]): Block {
  const b: Block = {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
  if (list) {
    b.listItem = list;
    b.level = 1;
  }
  return b;
}

/** Converts the validated generation format into Sanity Portable Text. */
export function toPortableText(blocks: GeneratedBlock[]): Block[] {
  const out: Block[] = [];
  for (const item of blocks) {
    switch (item.type) {
      case "paragraph":
        out.push(block("normal", item.text));
        break;
      case "heading":
        out.push(block(item.level === 3 ? "h3" : "h2", item.text));
        break;
      case "quote":
        out.push(block("blockquote", item.text));
        break;
      case "list":
        for (const li of item.items) out.push(block("normal", li, item.style));
        break;
    }
  }
  return out;
}
