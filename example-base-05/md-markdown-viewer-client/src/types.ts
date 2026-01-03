export interface MarkdownFileMeta {
  name: string;
  slug: string;
  relativePath: string;
  index: number;
  total: number;
}

export interface MarkdownFile extends MarkdownFileMeta {
  content: string;
}

export interface FilesResponse {
  total: number;
  files: MarkdownFileMeta[];
}

