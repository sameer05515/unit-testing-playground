import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

function createPageNumbers(currentPage: number, totalPages: number): number[] {
  const siblings = 1;
  const firstPage = 1;
  const lastPage = totalPages;

  const start = Math.max(firstPage, currentPage - siblings);
  const end = Math.min(lastPage, currentPage + siblings);

  const pages = new Set<number>([
    firstPage,
    ...range(start, end),
    lastPage,
  ]);

  return Array.from(pages)
    .filter((page) => page >= firstPage && page <= lastPage)
    .sort((a, b) => a - b);
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = createPageNumbers(currentPage, totalPages);

  const getLink = (page: number) =>
    page === 1 ? "/" : `/?page=${encodeURIComponent(page)}`;

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="mx-auto mt-10 flex w-full max-w-3xl items-center justify-center gap-2"
    >
      <Link
        aria-disabled={currentPage === 1}
        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 aria-disabled:cursor-not-allowed aria-disabled:border-slate-200 aria-disabled:text-slate-300"
        href={getLink(Math.max(1, currentPage - 1))}
        scroll
      >
        Previous
      </Link>

      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          const prev = pages[index - 1];
          const shouldShowEllipsis = prev && page - prev > 1;

          return (
            <div key={page} className="flex items-center">
              {shouldShowEllipsis ? (
                <span className="px-2 text-sm text-slate-400">…</span>
              ) : null}
              <Link
                aria-current={page === currentPage ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                href={getLink(page)}
                scroll
              >
                {page}
              </Link>
            </div>
          );
        })}
      </div>

      <Link
        aria-disabled={currentPage === totalPages}
        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 aria-disabled:cursor-not-allowed aria-disabled:border-slate-200 aria-disabled:text-slate-300"
        href={getLink(Math.min(totalPages, currentPage + 1))}
        scroll
      >
        Next
      </Link>
    </nav>
  );
}


