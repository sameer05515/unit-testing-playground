import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { XMLParser } from "fast-xml-parser";

export interface WordEntry {
  word: string;
  type?: string;
  meanings: string[];
  examples: string[];
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  cdataPropName: "cdata",
  textNodeName: "text",
});

function ensureArray<T>(value: T | T[] | undefined): T[] {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function normalizeValue(node: unknown): string {
  if (typeof node === "string") {
    return node.trim();
  }

  if (node && typeof node === "object") {
    const record = node as Record<string, unknown>;
    const cdata = record.cdata;
    const text = record.text;

    if (typeof cdata === "string") {
      return cdata.trim();
    }

    if (typeof text === "string") {
      return text.trim();
    }
  }

  return "";
}

export const getWordEntries = cache(async (): Promise<WordEntry[]> => {
  const xmlPath = path.join(process.cwd(), "public", "khajana.xml");
  const xml = await readFile(xmlPath, "utf-8");
  const parsed = parser.parse(xml);

  const root = parsed?.["vocab-config"]?.["word-list"];
  const rawEntries = ensureArray(root?.myword);

  return rawEntries
    .map((entry) => {
      const record = entry as Record<string, unknown>;
      const wordNode = record.word as
        | string
        | { type?: string; text?: string; cdata?: string };
      const meaningsNode = record.meanings as
        | { meaning?: unknown | unknown[] }
        | undefined;
      const examplesNode = record.examples as
        | { example?: unknown | unknown[] }
        | undefined;

      let wordText = "";
      let wordType: string | undefined;

      if (typeof wordNode === "string") {
        wordText = wordNode.trim();
      } else if (wordNode && typeof wordNode === "object") {
        const { cdata, text, type } = wordNode as Record<string, unknown>;
        wordType = typeof type === "string" ? type : undefined;
        if (typeof cdata === "string") {
          wordText = cdata.trim();
        } else if (typeof text === "string") {
          wordText = text.trim();
        }
      }

      const meanings = ensureArray(meaningsNode?.meaning)
        .map(normalizeValue)
        .filter(Boolean);

      const examples = ensureArray(examplesNode?.example)
        .map(normalizeValue)
        .filter(Boolean);

      if (!wordText) {
        return null;
      }

      return {
        word: wordText,
        type: wordType,
        meanings,
        examples,
      } satisfies WordEntry;
    })
    .filter((item): item is WordEntry => item !== null);
});


