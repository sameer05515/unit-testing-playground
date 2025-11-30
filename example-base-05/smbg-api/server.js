const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// File constants (matching Angular app)
const SUMMARY_FILE = 'chapter-summary.json';
const VERSE_SUMMARY_FILE = 'chapter-verse-summary.json';
const CHAPTER_DETAIL_FILE = 'chapter-verse-detail-temp.json';
const CHAPTER_DETAIL_ALT_FILE = 'chapter-verse-detail.json';

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// JSON data directory
const DATA_DIR = path.join(__dirname, 'src', 'data', 'json');

// Helper function to read JSON file
async function readJsonFile(filename) {
    try {
        const filePath = path.join(DATA_DIR, filename);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return null;
    }
}

// Helper function to read chapter detail file with fallback
async function readChapterDetailFile() {
    let data = await readJsonFile(CHAPTER_DETAIL_FILE);
    if (!data) {
        data = await readJsonFile(CHAPTER_DETAIL_ALT_FILE);
    }
    return data;
}

// Helper function to convert verse ID from summary format to detail format
function convertVerseId(chapterId, verseId) {
    // If already in detail format (contains dot), return as-is
    if (verseId.includes('.')) {
        return verseId;
    }
    
    // Handle range format (e.g., "4-6" -> "1.4 – 1.6")
    if (verseId.includes('-') && !verseId.includes('.')) {
        return `${chapterId}.${verseId.replace('-', ' – ')}`;
    }
    
    // Simple conversion (e.g., "1" -> "1.1")
    return `${chapterId}.${verseId}`;
}

// Home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Shrimad Bhagwat Geeta API' });
});

// API Routes

// Get all chapters summary
app.get('/api/chapters', async (req, res) => {
    const data = await readJsonFile('chapter-summary.json');
    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ error: 'Failed to load chapters' });
    }
});

// Get chapter by ID
app.get('/api/chapters/:id', async (req, res) => {
    const chapterId = req.params.id;
    const data = await readJsonFile('chapter-summary.json');
    if (data) {
        const chapter = data.find(c => c.id === chapterId);
        if (chapter) {
            res.json(chapter);
        } else {
            res.status(404).json({ error: 'Chapter not found' });
        }
    } else {
        res.status(500).json({ error: 'Failed to load chapters' });
    }
});

// Get chapter verse summary (summary endpoint)
app.get('/api/chapters/:id/verses/summary', async (req, res) => {
    const chapterId = req.params.id;
    const data = await readJsonFile('chapter-verse-summary.json');
    if (data) {
        const chapter = data.find(c => c.id === chapterId);
        if (chapter) {
            res.json(chapter);
        } else {
            res.status(404).json({ error: 'Chapter not found' });
        }
    } else {
        res.status(500).json({ error: 'Failed to load chapter verses' });
    }
});

// Get chapter verse detail (single verse)
app.get('/api/chapters/:id/verses/:verseId', async (req, res) => {
    const chapterId = req.params.id;
    const originalVerseId = req.params.verseId;
    const data = await readChapterDetailFile();
    if (data) {
        const chapter = data.find(c => c.id === chapterId);
        if (chapter) {
            // Try original ID first
            let verse = chapter.verses?.find(v => v.id === originalVerseId);
            
            // If not found, convert to detail format
            if (!verse) {
                const convertedId = convertVerseId(chapterId, originalVerseId);
                verse = chapter.verses?.find(v => v.id === convertedId);
            }
            
            if (verse) {
                res.json(verse);
            } else {
                res.status(404).json({ error: `Verse ${originalVerseId} not found in chapter ${chapterId}` });
            }
        } else {
            res.status(404).json({ error: 'Chapter not found' });
        }
    } else {
        res.status(500).json({ error: 'Failed to load verse details' });
    }
});

// Get all chapter verse details
app.get('/api/chapters/:id/verses', async (req, res) => {
    const chapterId = req.params.id;
    const data = await readChapterDetailFile();
    if (data) {
        const chapter = data.find(c => c.id === chapterId);
        if (chapter) {
            res.json(chapter);
        } else {
            res.status(404).json({ error: 'Chapter not found' });
        }
    } else {
        res.status(500).json({ error: 'Failed to load chapter verses' });
    }
});

// View Routes

// Chapters list page
app.get('/chapters', async (req, res) => {
    const chapters = await readJsonFile('chapter-summary.json');
    res.render('chapters', { 
        title: 'Chapters',
        chapters: chapters || []
    });
});

// Chapter detail page
app.get('/chapters/:id', async (req, res) => {
    const chapterId = req.params.id;
    const chapters = await readJsonFile(SUMMARY_FILE);
    const chapterVerses = await readJsonFile(VERSE_SUMMARY_FILE);
    const chapterDetails = await readChapterDetailFile();
    
    const chapter = chapters?.find(c => c.id === chapterId);
    const verseSummary = chapterVerses?.find(c => c.id === chapterId);
    const verseDetails = chapterDetails?.find(c => c.id === chapterId);
    
    if (chapter) {
        res.render('chapter', {
            title: chapter.chapterTitle,
            chapter,
            verseSummary,
            verseDetails
        });
    } else {
        res.status(404).render('404', { title: 'Chapter Not Found' });
    }
});

// Verse detail page
app.get('/chapters/:id/verses/:verseId', async (req, res) => {
    const chapterId = req.params.id;
    const originalVerseId = req.params.verseId;
    const chapterDetails = await readChapterDetailFile();
    
    const chapter = chapterDetails?.find(c => c.id === chapterId);
    if (chapter) {
        // Try original ID first
        let verse = chapter.verses?.find(v => v.id === originalVerseId);
        
        // If not found, convert to detail format
        if (!verse) {
            const convertedId = convertVerseId(chapterId, originalVerseId);
            verse = chapter.verses?.find(v => v.id === convertedId);
        }
        
        if (verse) {
            res.render('verse', {
                title: verse.verseHeader || `Verse ${originalVerseId}`,
                chapter,
                verse
            });
        } else {
            res.status(404).render('404', { 
                title: 'Verse Not Found',
                message: `Verse ${originalVerseId} not found in chapter ${chapterId}`
            });
        }
    } else {
        res.status(404).render('404', { 
            title: 'Chapter Not Found',
            message: `Chapter ${chapterId} not found`
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: 'Server Error' });
});

app.listen(PORT, () => {
    console.log(`Shrimad Bhagwat Geeta API server running at http://localhost:${PORT}`);
});

