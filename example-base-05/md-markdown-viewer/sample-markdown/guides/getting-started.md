# Getting Started

1. Update `configuration.js` with the folders you want to index.
2. Run `npm run dev` to start the Express server and Tailwind watcher.
3. Visit `http://localhost:3000` and click any file name on the left to see the rendered Markdown on the right.

## Folder tips

- Every nested directory is scanned recursively.
- Files keep their folder context in the list, so similarly named docs stay unique.

```bash
mkdir -p docs/guides
echo "# Docs FTW" > docs/guides/welcome.md
```

Enjoy writing!

