export interface MarkdownFile {
  name: string;
  slug: string;
  relativePath: string;
  index: number;
  total: number;
  content?: string;
}

export interface FilesResponse {
  total: number;
  files: MarkdownFile[];
}

