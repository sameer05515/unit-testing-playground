export interface ComicFile {
  name: string;
  path: string;
  relativePath: string;
  slug: string;
  size: number;
  lastModified: number;
}

export type SortOption = 'name' | 'dateDesc' | 'dateAsc';
