const express = require('express');
const fs = require('fs');
const path = require('path');
const { files, getDetailsForSlug } = require('./utils.v1');

const router = express.Router();
const DATA_DIR = path.resolve(__dirname, '../../../pdf-viewer-data');
const BOOKMARKS_FILE = path.resolve(__dirname, '../../../bookmark.json');
const STORE_FILES = {
  progress: path.join(DATA_DIR, 'reading-progress.json'),
  metadata: path.join(DATA_DIR, 'categories-tags.json'),
  recent: path.join(DATA_DIR, 'recently-opened.json'),
  annotations: path.join(DATA_DIR, 'annotations.json'),
  settings: path.join(DATA_DIR, 'settings.json'),
};

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') console.error(`Unable to read ${file}:`, error); return fallback; }
}
function writeJson(file, data) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const temp = `${file}.tmp`;
  fs.writeFileSync(temp, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  fs.renameSync(temp, file);
}
function readBookmarks() {
  const value = readJson(BOOKMARKS_FILE, []);
  return Array.isArray(value) ? value.filter(slug => files.some(file => file.slug === slug)) : [];
}
function validSlug(slug) { return typeof slug === 'string' && files.some(file => file.slug === slug); }
function safeSlug(slug) { return validSlug(slug) ? slug : null; }

router.get('/', (req, res) => {
  const requestedSlug = safeSlug(req.query.slug);
  const progress = readJson(STORE_FILES.progress, {});
  const metadata = readJson(STORE_FILES.metadata, {});
  const annotations = readJson(STORE_FILES.annotations, {});
  const recent = readJson(STORE_FILES.recent, []);
  const settings = readJson(STORE_FILES.settings, { theme: 'dark' });
  const slug = requestedSlug || (recent[0] && safeSlug(recent[0].slug)) || null;
  const details = slug ? getDetailsForSlug(slug) : null;
  if (slug) {
    const nextRecent = [{ slug, openedAt: new Date().toISOString() }, ...recent.filter(item => item.slug !== slug)].slice(0, 20);
    try { writeJson(STORE_FILES.recent, nextRecent); } catch (error) { console.error('Unable to save recent PDF:', error); }
  }
  res.render('pdfs/layout.v2.ejs', {
    files: files.map(file => ({ slug: file.slug, title: path.basename(file.filePath, path.extname(file.filePath)), category: (metadata[file.slug] || {}).category || '', tags: (metadata[file.slug] || {}).tags || [] })),
    slug, details, bookmarks: readBookmarks(), progress, metadata, annotations,
    recent: readJson(STORE_FILES.recent, []), settings,
  });
});

router.get('/bookmarks', (_req, res) => res.json(readBookmarks()));
router.post('/bookmarks', (req, res) => {
  const slug = req.body && req.body.slug;
  if (!validSlug(slug)) return res.status(400).json({ error: 'A valid PDF slug is required.' });
  const bookmarks = readBookmarks();
  if (!bookmarks.includes(slug)) bookmarks.push(slug);
  try { writeJson(BOOKMARKS_FILE, bookmarks); return res.json({ success: true, bookmarks }); }
  catch (error) { console.error(error); return res.status(500).json({ error: 'Unable to save bookmark.' }); }
});
router.delete('/bookmarks/:slug', (req, res) => {
  try { const bookmarks = readBookmarks().filter(slug => slug !== req.params.slug); writeJson(BOOKMARKS_FILE, bookmarks); return res.json({ success: true, bookmarks }); }
  catch (error) { console.error(error); return res.status(500).json({ error: 'Unable to remove bookmark.' }); }
});

router.get('/api/state', (_req, res) => res.json({
  progress: readJson(STORE_FILES.progress, {}), metadata: readJson(STORE_FILES.metadata, {}),
  annotations: readJson(STORE_FILES.annotations, {}), recent: readJson(STORE_FILES.recent, []),
  settings: readJson(STORE_FILES.settings, { theme: 'dark' }), bookmarks: readBookmarks(),
}));
router.put('/api/progress/:slug', (req, res) => {
  const slug = req.params.slug;
  if (!validSlug(slug)) return res.status(404).json({ error: 'PDF not found.' });
  const page = Math.max(1, Math.floor(Number(req.body && req.body.page) || 1));
  const pageCount = Math.max(0, Math.floor(Number(req.body && req.body.pageCount) || 0));
  const progress = readJson(STORE_FILES.progress, {});
  progress[slug] = { page, pageCount, completed: pageCount > 0 && page >= pageCount, updatedAt: new Date().toISOString() };
  try { writeJson(STORE_FILES.progress, progress); res.json({ success: true, progress: progress[slug] }); }
  catch (error) { console.error(error); res.status(500).json({ error: 'Unable to save progress.' }); }
});
router.put('/api/metadata/:slug', (req, res) => {
  const slug = req.params.slug;
  if (!validSlug(slug)) return res.status(404).json({ error: 'PDF not found.' });
  const category = String((req.body && req.body.category) || '').trim().slice(0, 80);
  const tags = [...new Set((Array.isArray(req.body && req.body.tags) ? req.body.tags : String((req.body && req.body.tags) || '').split(',')).map(tag => String(tag).trim().replace(/^#/, '').slice(0, 40)).filter(Boolean))].slice(0, 30);
  const metadata = readJson(STORE_FILES.metadata, {});
  metadata[slug] = { category, tags, updatedAt: new Date().toISOString() };
  try { writeJson(STORE_FILES.metadata, metadata); res.json({ success: true, metadata: metadata[slug] }); }
  catch (error) { console.error(error); res.status(500).json({ error: 'Unable to save category and tags.' }); }
});
router.get('/api/annotations/:slug', (req, res) => {
  if (!validSlug(req.params.slug)) return res.status(404).json({ error: 'PDF not found.' });
  res.json(readJson(STORE_FILES.annotations, {})[req.params.slug] || []);
});
router.post('/api/annotations/:slug', (req, res) => {
  const slug = req.params.slug;
  if (!validSlug(slug)) return res.status(404).json({ error: 'PDF not found.' });
  const body = req.body || {};
  const text = String(body.text || '').trim().slice(0, 5000);
  const note = String(body.note || '').trim().slice(0, 5000);
  const page = Math.max(1, Math.floor(Number(body.page) || 1));
  if (!text && !note) return res.status(400).json({ error: 'Select text or enter a note.' });
  const all = readJson(STORE_FILES.annotations, {});
  const items = Array.isArray(all[slug]) ? all[slug] : [];
  const item = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, page, text, note, createdAt: new Date().toISOString() };
  all[slug] = [item, ...items].slice(0, 1000);
  try { writeJson(STORE_FILES.annotations, all); res.status(201).json({ success: true, annotation: item, annotations: all[slug] }); }
  catch (error) { console.error(error); res.status(500).json({ error: 'Unable to save annotation.' }); }
});
router.delete('/api/annotations/:slug/:id', (req, res) => {
  if (!validSlug(req.params.slug)) return res.status(404).json({ error: 'PDF not found.' });
  const all = readJson(STORE_FILES.annotations, {});
  all[req.params.slug] = (Array.isArray(all[req.params.slug]) ? all[req.params.slug] : []).filter(item => item.id !== req.params.id);
  try { writeJson(STORE_FILES.annotations, all); res.json({ success: true, annotations: all[req.params.slug] }); }
  catch (error) { console.error(error); res.status(500).json({ error: 'Unable to delete annotation.' }); }
});
router.put('/api/settings', (req, res) => {
  const theme = req.body && req.body.theme === 'light' ? 'light' : 'dark';
  try { writeJson(STORE_FILES.settings, { theme }); res.json({ success: true, settings: { theme } }); }
  catch (error) { console.error(error); res.status(500).json({ error: 'Unable to save settings.' }); }
});
router.get('/api/dashboard', (_req, res) => {
  const progress = readJson(STORE_FILES.progress, {});
  const annotations = readJson(STORE_FILES.annotations, {});
  const recent = readJson(STORE_FILES.recent, []);
  const totalPagesRead = Object.values(progress).reduce((sum, item) => sum + (Number(item.page) || 0), 0);
  const completed = Object.values(progress).filter(item => item.completed).length;
  res.json({ totalPdfs: files.length, bookmarks: readBookmarks().length, documentsStarted: Object.keys(progress).length, totalPagesRead, completed, annotations: Object.values(annotations).reduce((sum, items) => sum + (Array.isArray(items) ? items.length : 0), 0), recent: recent.slice(0, 5) });
});
router.get('/pdf/:slug', (req, res) => {
  const details = getDetailsForSlug(req.params.slug);
  if (!details) return res.status(404).send('File not found');
  res.sendFile(details.fileAbsolutePath);
});
module.exports = router;
