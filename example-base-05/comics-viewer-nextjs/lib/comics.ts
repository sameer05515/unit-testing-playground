import { ComicFile, SortOption } from '@/types/comic';
import * as fs from 'fs';
import * as path from 'path';

const COMICS_DIRECTORY = process.env.COMICS_DIRECTORY || 'D:\\Prem\\comics';

function generateSlug(fileName: string, relativePath: string, usedSlugs: Set<string>): string {
  // Remove file extension if present
  let baseName = fileName;
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex > 0) {
    baseName = fileName.substring(0, lastDotIndex);
  }

  // Generate base slug from filename
  let baseSlug = baseName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // If base slug is empty, use relative path
  if (baseSlug === '') {
    baseSlug = relativePath
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // If still empty, use a default
  if (baseSlug === '') {
    baseSlug = 'comic';
  }

  // Ensure uniqueness
  let slug = baseSlug;
  let counter = 1;
  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  usedSlugs.add(slug);
  return slug;
}

function getAllPdfFiles(dir: string, rootDir: string, usedSlugs: Set<string>): ComicFile[] {
  const comics: ComicFile[] = [];

  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    return comics;
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively search subdirectories
      comics.push(...getAllPdfFiles(filePath, rootDir, usedSlugs));
    } else if (stat.isFile() && file.toLowerCase().endsWith('.pdf')) {
      try {
        const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
        const slug = generateSlug(file, relativePath, usedSlugs);
        
        comics.push({
          name: file,
          path: filePath,
          relativePath,
          slug,
          size: stat.size,
          lastModified: stat.mtimeMs,
        });
      } catch (error) {
        // Skip files that can't be read
        console.error(`Error reading file ${filePath}:`, error);
      }
    }
  }

  return comics;
}

export function getAllComics(sortBy: SortOption = 'name'): ComicFile[] {
  const usedSlugs = new Set<string>();
  const comics = getAllPdfFiles(COMICS_DIRECTORY, COMICS_DIRECTORY, usedSlugs);

  // Sort based on sortBy parameter
  switch (sortBy) {
    case 'dateDesc':
      comics.sort((a, b) => b.lastModified - a.lastModified);
      break;
    case 'dateAsc':
      comics.sort((a, b) => a.lastModified - b.lastModified);
      break;
    case 'name':
    default:
      comics.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
      break;
  }

  return comics;
}

export function getComicBySlug(slug: string): ComicFile | null {
  const comics = getAllComics();
  return comics.find((comic) => comic.slug === slug) || null;
}

export function getComicFile(relativePath: string): string | null {
  const filePath = path.join(COMICS_DIRECTORY, relativePath.replace(/\//g, path.sep));
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const fileName = path.basename(filePath);
    if (fileName.toLowerCase().endsWith('.pdf')) {
      return filePath;
    }
  }

  return null;
}
