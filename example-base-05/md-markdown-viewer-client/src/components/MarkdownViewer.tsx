import { useMemo } from 'react';
import { renderMarkdown } from '../lib/markdown';
import type { MarkdownFile } from '../types';

interface MarkdownViewerProps {
  file: MarkdownFile | null;
  isLoading: boolean;
}

export function MarkdownViewer({ file, isLoading }: MarkdownViewerProps) {
  const html = useMemo(() => {
    if (!file) return '<p class="text-muted">Choose a file to preview.</p>';
    return renderMarkdown(file.content);
  }, [file]);

  return (
    <div className="position-relative min-vh-25">
      {isLoading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 rounded">
          <p className="text-light small mb-0">Loading markdown…</p>
        </div>
      )}
      <article className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} aria-busy={isLoading} />
    </div>
  );
}

