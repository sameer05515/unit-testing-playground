import type { MarkdownFileMeta } from '../types';

interface TopBarProps {
  activeFile: MarkdownFileMeta | null;
  onRefresh: () => void;
}

export function TopBar({ activeFile, onRefresh }: TopBarProps) {
  if (!activeFile) {
    return (
      <header className="border-bottom border-secondary px-4 py-4 bg-dark text-light">
        <p className="mb-2 text-muted">No markdown files detected.</p>
        <button className="btn btn-outline-light btn-sm" onClick={onRefresh} type="button">
          Retry
        </button>
      </header>
    );
  }

  return (
    <header className="border-bottom border-secondary px-4 py-4 bg-dark text-light">
      <div className="d-flex flex-column flex-lg-row gap-3 align-items-lg-center justify-content-lg-between">
        <div>
          <p className="text-uppercase text-muted small mb-1">File</p>
          <h1 className="h3 fw-semibold mb-1">{activeFile.name}</h1>
          <small className="text-muted">{activeFile.relativePath}</small>
        </div>
        <button className="btn btn-outline-info btn-sm align-self-start align-self-lg-center" onClick={onRefresh} type="button">
          Refresh list
        </button>
      </div>
    </header>
  );
}

