import type { MarkdownFileMeta } from '../types';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

interface FileSidebarProps {
  files: MarkdownFileMeta[];
  activeSlug: string | null;
  filter: string;
  onFilterChange: (value: string) => void;
  onSelect: (slug: string) => void;
}

export function FileSidebar({ files, activeSlug, filter, onFilterChange, onSelect }: FileSidebarProps) {
  const normalizedFilter = filter.toLowerCase();
  const filtered = normalizedFilter
    ? files.filter((file) => `${file.name} ${file.relativePath}`.toLowerCase().includes(normalizedFilter))
    : files;

  const activeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const node = activeRef.current;
    if (node) {
      node.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [activeSlug, filtered.length]);

  return (
    <div className="sidebar-panel h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center border-bottom border-secondary px-4 py-3">
        <div>
          <p className="text-uppercase text-muted small mb-0">Markdown files</p>
          <small className="text-muted">{files.length} total</small>
        </div>
      </div>

      <div className="p-4 pt-3 flex-grow-1 d-flex flex-column">
        <div className="mb-3">
          <label className="form-label text-uppercase text-muted small">Quick filter</label>
          <input
            value={filter}
            onChange={(event) => onFilterChange(event.target.value)}
            type="search"
            placeholder="Type to filter..."
            className="form-control form-control-sm bg-dark text-light border-secondary"
          />
        </div>

        <div className="sidebar-scroll scroll-y flex-grow-1">
          <div className="list-group list-group-flush">
            {filtered.map((file) => {
              const isActive = file.slug === activeSlug;
              return (
                <button
                  key={file.slug}
                  type="button"
                  ref={isActive ? activeRef : null}
                  onClick={() => onSelect(file.slug)}
                  className={clsx(
                    'list-group-item list-group-item-action bg-transparent text-start text-light border-secondary-subtle',
                    isActive && 'active'
                  )}
                >
                  <div className="fw-semibold">{file.name}</div>
                  <small className="text-muted d-block text-truncate">{file.relativePath}</small>
                </button>
              );
            })}
            {!files.length && (
              <div className="list-group-item bg-transparent text-muted">
                No markdown files found. Check API connectivity.
              </div>
            )}
            {files.length > 0 && !filtered.length && (
              <div className="list-group-item bg-transparent text-muted">Nothing matches “{filter}”.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

