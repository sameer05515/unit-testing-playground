import type { FilesResponse, MarkdownFile } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE || '';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Unexpected API error');
  }
  return res.json() as Promise<T>;
}

export async function fetchFiles(refresh = false): Promise<FilesResponse> {
  const query = refresh ? '?refresh=true' : '';
  const response = await fetch(`${API_BASE}/api/files${query}`);
  return handleResponse<FilesResponse>(response);
}

export async function fetchFileBySlug(slug: string, refresh = false): Promise<MarkdownFile> {
  const query = refresh ? '?refresh=true' : '';
  const response = await fetch(`${API_BASE}/api/files/${encodeURIComponent(slug)}${query}`);
  return handleResponse<MarkdownFile>(response);
}

