import { WordEntry } from "@/lib/khajana";

interface WordCardProps {
  entry: WordEntry;
}

export function WordCard({ entry }: WordCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md focus-within:border-blue-500 focus-within:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:hover:shadow-blue-900/20">
      <header className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          {entry.word}
        </h2>
        {entry.type ? (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
            {entry.type}
          </span>
        ) : null}
      </header>

      {entry.meanings.length > 0 ? (
        <section aria-label="Meanings" className="mb-4 space-y-1">
          {entry.meanings.map((meaning, index) => (
            <p key={index} className="text-sm text-slate-700 dark:text-slate-200">
              {meaning}
            </p>
          ))}
        </section>
      ) : null}

      {entry.examples.length > 0 ? (
        <section aria-label="Examples" className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Examples
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
            {entry.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}


