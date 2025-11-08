import type { WordEntry } from '@/types';

function toArray<T extends Element>(nodes: NodeListOf<T>): T[] {
  return Array.from(nodes);
}

function normalize(text: string | null | undefined): string {
  return text?.trim() ?? '';
}

function dedupe(values: string[]): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];

  for (const value of values) {
    if (!value) continue;
    if (seen.has(value)) continue;
    seen.add(value);
    ordered.push(value);
  }

  return ordered;
}

export function parseKhajana(xml: string): WordEntry[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  const parserError = doc.querySelector('parsererror');

  if (parserError) {
    throw new Error(normalize(parserError.textContent) || 'Unable to parse khajana.xml');
  }

  const entries = toArray(doc.querySelectorAll('vocab-config > word-list > myword'));

  const normalized: WordEntry[] = [];

  for (const entry of entries) {
    const wordNode = entry.querySelector('word');
    const word = normalize(wordNode?.textContent);
    const type = wordNode?.getAttribute('type') ?? undefined;

    if (!word) {
      continue;
    }

    const meanings = dedupe(
      toArray(entry.querySelectorAll('meanings > meaning')).map((node) => normalize(node.textContent)),
    );

    const examples = dedupe(
      toArray(entry.querySelectorAll('examples > example')).map((node) => normalize(node.textContent)),
    );

    normalized.push({
      word,
      type: type || undefined,
      meanings,
      examples,
    });
  }

  return normalized;
}

export async function loadKhajana(): Promise<WordEntry[]> {
  const response = await fetch('/khajana.xml', {
    headers: {
      Accept: 'application/xml,text/xml;q=0.9,*/*;q=0.8',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load khajana.xml (${response.status})`);
  }

  const xml = await response.text();
  return parseKhajana(xml);
}

