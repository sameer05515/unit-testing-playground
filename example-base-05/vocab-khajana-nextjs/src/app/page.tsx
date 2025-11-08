import { Pagination } from "@/components/Pagination";
import { WordCard } from "@/components/WordCard";
import { getWordEntries } from "@/lib/khajana";

type PageProps = {
  searchParams?:
    | {
        page?: string | string[];
      }
    | Promise<{
        page?: string | string[];
      }>;
};

const PAGE_SIZE = 24;

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams =
    searchParams instanceof Promise ? await searchParams : searchParams;

  const rawPageParam = resolvedSearchParams?.page;
  const pageParam = Array.isArray(rawPageParam) ? rawPageParam[0] : rawPageParam;
  const requestedPage = Number.isNaN(Number(pageParam))
    ? 1
    : Math.max(1, parseInt(pageParam, 10));

  const entries = await getWordEntries();
  const totalPages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageEntries = entries.slice(start, start + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Vocab Khajana
              </p>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Explore English vocabulary gems
              </h1>
            </div>
            <p className="max-w-2xl text-base text-slate-600">
              Browse the curated word list from <strong>khajana.xml</strong>.
              Each page shows {PAGE_SIZE} entries with meanings and examples to
              make revision quick and effective.
            </p>
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-900">
                {pageEntries.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-900">
                {entries.length}
              </span>{" "}
              words — page {currentPage} of {totalPages}.
            </p>
          </div>
        </header>

        <section
          aria-label="Word list"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {pageEntries.map((entry, index) => (
            <WordCard key={`${entry.word}-${start + index}`} entry={entry} />
          ))}
        </section>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </main>
    </div>
  );
}

