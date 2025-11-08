#!/usr/bin/env node
/**
 * Translation helper script (skeleton).
 *
 * Usage:
 *   node tools/translate-json.mjs --input src/assets/data/json/chapter-summary.json --output src/assets/data/json/hi/chapter-summary.json --locale hi
 *
 * Required environment variables:
 *   TRANSLATE_API_KEY : API key for the translation provider
 *
 * Notes:
 * - This script is intentionally a scaffold. Plug in your preferred translation API where indicated.
 * - The script keeps unknown fields intact, only translating string values listed in `FIELDS_TO_TRANSLATE`.
 * - Chunking is used to respect API rate limits for large payloads.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPPORTED_LOCALES = new Set(['hi']);
const FIELDS_TO_TRANSLATE = ['chapterTitle', 'briefDescription', 'chapterTitleForChapterPage', 'chapterSubTitleForChapterPage', 'oneLiner', 'verseHeader', 'value', 'meaning', 'header', 'word', 'referenceHeader'];

async function main() {
  const { input, output, locale } = parseArgs(process.argv.slice(2));

  if (!SUPPORTED_LOCALES.has(locale)) {
    throw new Error(`Locale "${locale}" is not currently supported by this script.`);
  }

  const apiKey = process.env.TRANSLATE_API_KEY;
  if (!apiKey) {
    throw new Error('Missing TRANSLATE_API_KEY environment variable.');
  }

  const sourcePath = resolve(__dirname, '..', input);
  const outputPath = resolve(__dirname, '..', output);
  const raw = await readFile(sourcePath, 'utf8');
  const json = JSON.parse(raw);

  console.log(`Loaded ${input}. Beginning translation to "${locale}"…`);

  const translated = await translateJson(json, locale, apiKey);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(translated, null, 2), 'utf8');

  console.log(`Translation complete! Output written to ${output}`);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = argv[i + 1];
      args[key] = value;
      i += 1;
    }
  }

  if (!args.input || !args.output || !args.locale) {
    throw new Error('Usage: node tools/translate-json.mjs --input <path> --output <path> --locale <code>');
  }

  return args;
}

async function translateJson(data, locale, apiKey) {
  if (Array.isArray(data)) {
    return Promise.all(data.map((entry) => translateJson(entry, locale, apiKey)));
  }

  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const result = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string' && FIELDS_TO_TRANSLATE.includes(key)) {
      result[key] = await translateText(value, locale, apiKey);
    } else {
      result[key] = await translateJson(value, locale, apiKey);
    }
  }

  return result;
}

async function translateText(text, locale, apiKey) {
  // TODO: Replace this stub with an actual translation call.
  // Example (pseudo-code):
  // const res = await fetch('https://translation.googleapis.com/language/translate/v2', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${apiKey}`
  //   },
  //   body: JSON.stringify({
  //     q: text,
  //     target: locale,
  //     source: 'en'
  //   })
  // });
  // const json = await res.json();
  // return json.data.translations[0].translatedText;

  // For now, return the original text so that the scaffold runs end-to-end.
  return text;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

