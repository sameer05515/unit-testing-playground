import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFileBySlug, fetchFiles } from '../api/client';
import type { MarkdownFile, MarkdownFileMeta } from '../types';
import { FileSidebar } from '../components/FileSidebar';
import { MarkdownViewer } from '../components/MarkdownViewer';
import { TopBar } from '../components/TopBar';

export function Explorer() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const [files, setFiles] = useState<MarkdownFileMeta[]>([]);
  const [filter, setFilter] = useState('');
  const [activeFile, setActiveFile] = useState<MarkdownFile | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingFile, setLoadingFile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef(new Map<string, MarkdownFile>());

  const activeSlug = slug ?? null;

  const loadFiles = useCallback(
    async (refresh = false) => {
      setLoadingList(true);
      setError(null);
      try {
        const response = await fetchFiles(refresh);
        setFiles(response.files);
        if (refresh) {
          cacheRef.current.clear();
        }

        if (!response.files.length) {
          setActiveFile(null);
          if (activeSlug) {
            navigate('/', { replace: true });
          }
          return;
        }

        const exists = activeSlug && response.files.some((file) => file.slug === activeSlug);
        if (!activeSlug || !exists) {
          navigate(`/${response.files[0].slug}`, { replace: true });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load files.');
        setFiles([]);
        setActiveFile(null);
      } finally {
        setLoadingList(false);
      }
    },
    [activeSlug, navigate]
  );

  const loadFile = useCallback(async (targetSlug: string, refresh = false) => {
    setLoadingFile(true);
    setError(null);
    try {
      const cached = cacheRef.current.get(targetSlug);
      if (cached && !refresh) {
        setActiveFile(cached);
        return;
      }
      const file = await fetchFileBySlug(targetSlug, refresh);
      cacheRef.current.set(targetSlug, file);
      setActiveFile(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load file.');
    } finally {
      setLoadingFile(false);
    }
  }, []);

  const handleSelect = useCallback(
    (nextSlug: string) => {
      if (nextSlug === activeSlug) return;
      navigate(`/${nextSlug}`);
    },
    [activeSlug, navigate]
  );

  const handleRefresh = useCallback(() => {
    loadFiles(true);
    if (activeSlug) {
      loadFile(activeSlug, true);
    }
  }, [activeSlug, loadFile, loadFiles]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  useEffect(() => {
    if (!activeSlug) {
      setActiveFile(null);
      return;
    }
    loadFile(activeSlug);
  }, [activeSlug, loadFile]);

  const activeMeta = useMemo(() => files.find((file) => file.slug === activeSlug) || null, [files, activeSlug]);

  return (
    <div className="app-shell h-100">
      <div className="row g-0 h-100 flex-lg-nowrap">
        <div className="col-12 col-lg-3 border-bottom border-lg-end border-secondary">
          <FileSidebar
            files={files}
            activeSlug={activeSlug}
            filter={filter}
            onFilterChange={setFilter}
            onSelect={handleSelect}
          />
        </div>

        <div className="col d-flex flex-column overflow-hidden">
          <TopBar activeFile={activeMeta} onRefresh={handleRefresh} />

          {error && (
            <div className="alert alert-danger mx-4 mt-3" role="alert">
              {error}
            </div>
          )}

          <section className="flex-grow-1 overflow-auto scroll-y px-4 py-4">
            <MarkdownViewer file={activeFile} isLoading={loadingList || loadingFile} />
          </section>

          <footer className="border-top border-secondary px-4 py-3 text-muted small">
            {activeMeta ? (
              <div className="d-flex flex-column flex-lg-row gap-3 align-items-lg-center justify-content-between">
                <div>
                  <p className="text-uppercase text-muted small mb-1">Position</p>
                  <span className="fw-semibold text-light">
                    {activeMeta.index + 1} / {files.length}
                  </span>
                </div>
                <div className="btn-group" role="group" aria-label="File navigation">
                  <button
                    className="btn btn-outline-light btn-sm"
                    type="button"
                    disabled={!files.length}
                    onClick={() => {
                      if (!files.length) return;
                      const prevIndex = (activeMeta.index - 1 + files.length) % files.length;
                      handleSelect(files[prevIndex].slug);
                    }}
                  >
                    ‹ Prev
                  </button>
                  <button
                    className="btn btn-outline-light btn-sm"
                    type="button"
                    disabled={!files.length}
                    onClick={() => {
                      if (!files.length) return;
                      const nextIndex = (activeMeta.index + 1) % files.length;
                      handleSelect(files[nextIndex].slug);
                    }}
                  >
                    Next ›
                  </button>
                </div>
                <small className="text-muted">
                  API powered by <code>/api/files</code> · <code>/api/files/:slug</code>
                </small>
              </div>
            ) : (
              <div className="d-flex flex-column flex-lg-row gap-2 justify-content-between">
                <span className="text-muted">No file selected.</span>
                <small className="text-muted">
                  API powered by <code>/api/files</code> · <code>/api/files/:slug</code>
                </small>
              </div>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}

