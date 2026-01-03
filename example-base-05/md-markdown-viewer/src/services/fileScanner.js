const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const isMarkdown = (filename) => filename.toLowerCase().endsWith('.md');

async function safeStat(targetPath) {
  try {
    return await fs.stat(targetPath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn(`[scanner] Unable to read ${targetPath}: ${error.message}`);
    }
    return null;
  }
}

async function walkDirectory(root, currentDir = '') {
  const absoluteDir = path.join(root, currentDir);
  const dirHandle = await fs.readdir(absoluteDir, { withFileTypes: true });
  const files = [];

  for (const entry of dirHandle) {
    const relativePath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      const nested = await walkDirectory(root, relativePath);
      files.push(...nested);
      continue;
    }

    if (!entry.isFile() || !isMarkdown(entry.name)) {
      continue;
    }

    const absolutePath = path.join(root, relativePath);
    const content = await fs.readFile(absolutePath, 'utf-8');
    files.push({
      name: entry.name.replace(/\.md$/i, ''),
      absolutePath,
      relativePath: relativePath.replace(/\\/g, '/'),
      content
    });
  }

  return files;
}

function createSlug(relativePath) {
  const normalized = relativePath
    .replace(/\\/g, '-')
    .replace(/\//g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  const hash = crypto.createHash('md5').update(relativePath).digest('hex').slice(0, 6);
  return `${normalized || 'file'}-${hash}`;
}

async function scanMarkdownFiles(markdownRoots) {
  const resolvedRoots = markdownRoots.map((rootPath) => path.resolve(rootPath));
  const collected = [];

  for (const root of resolvedRoots) {
    const stats = await safeStat(root);
    if (!stats || !stats.isDirectory()) {
      console.warn(`[scanner] Skipping missing directory: ${root}`);
      continue;
    }

    const files = await walkDirectory(root);
    files.forEach((file) =>
      collected.push({
        ...file,
        slug: createSlug(`${path.basename(root)}/${file.relativePath}`)
      })
    );
  }

  const sorted = collected.sort((a, b) => a.name.localeCompare(b.name));

  return sorted.map((file, index) => ({
    ...file,
    index,
    total: sorted.length
  }));
}

module.exports = {
  scanMarkdownFiles
};

