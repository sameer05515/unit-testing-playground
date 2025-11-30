const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const redoc = require('redoc-express');

const app = express();
const PORT = process.env.PORT || 3000;

// File constants (matching Angular app)
const SUMMARY_FILE = 'chapter-summary.json';
const VERSE_SUMMARY_FILE = 'chapter-verse-summary.json';
const CHAPTER_DETAIL_FILE = 'chapter-verse-detail-temp.json';
const CHAPTER_DETAIL_ALT_FILE = 'chapter-verse-detail.json';
const WORD_MEANING_FILE = 'chapter-verse-word-meaning-temp.json';

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Shrimad Bhagwat Geeta API',
            version: '1.0.0',
            description: 'RESTful API for accessing Shrimad Bhagwat Geeta chapters, verses, and word meanings',
            contact: {
                name: 'API Support',
                email: 'support@smbg-api.com'
            },
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC'
            }
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development server'
            }
        ],
        tags: [
            {
                name: 'Chapters',
                description: 'Chapter-related endpoints'
            },
            {
                name: 'Verses',
                description: 'Verse-related endpoints'
            },
            {
                name: 'Word Meanings',
                description: 'Word meaning endpoints'
            }
        ]
    },
    apis: [path.join(__dirname, 'server.js')]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Shrimad Bhagwat Geeta API Documentation'
}));

// Redoc
app.use('/redoc', redoc({
    title: 'Shrimad Bhagwat Geeta API Documentation',
    specUrl: '/api-docs/swagger.json'
}));

// OpenAPI JSON
app.get('/api-docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

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

// Helper function to convert hash URL to route path
function hashLinkToRoute(link) {
    if (!link) {
        return null;
    }
    
    const trimmed = link.trim();
    if (!trimmed || !trimmed.startsWith('#/')) {
        return null;
    }
    
    const path = trimmed.slice(2);
    const parts = path.split('/').filter(Boolean);
    
    // Convert Angular route format to our route format
    // #/chapter/1/verse/1.1 -> /chapters/1/verses/1.1
    if (parts[0] === 'chapter' && parts[2] === 'verse') {
        return `/chapters/${parts[1]}/verses/${parts[3]}`;
    }
    
    // #/word-meaning/wordId -> /word-meaning/wordId
    if (parts[0] === 'word-meaning') {
        return `/word-meaning/${parts[1]}`;
    }
    
    return '/' + parts.join('/');
}

// Helper function to enhance verse with route information
function enhanceVerse(verse, chapterId) {
    if (!verse) return verse;
    
    return {
        ...verse,
        previousVerseRoute: hashLinkToRoute(verse.previousVerseUrl),
        nextVerseRoute: hashLinkToRoute(verse.nextVerseUrl),
        // Enhance meaning entries with routes
        meaning: verse.meaning ? verse.meaning.map(entry => ({
            ...entry,
            wordMeaningDetailRoute: hashLinkToRoute(entry.wordMeaningDetailUrl),
            wordMeaningDetailUrl: entry.wordMeaningDetailUrl // Keep original for template processing
        })) : []
    };
}

// Home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Shrimad Bhagwat Geeta API' });
});

// API Routes

/**
 * @swagger
 * /api/chapters:
 *   get:
 *     summary: Get all chapters summary
 *     tags: [Chapters]
 *     description: Retrieves a list of all 18 chapters with their titles and brief descriptions
 *     responses:
 *       200:
 *         description: Successfully retrieved chapters list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   chapterTitle:
 *                     type: string
 *                     example: "Chapter 1"
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   briefDescription:
 *                     type: string
 *                     example: "Arjun Viṣhād Yog : Lamenting the Consequences of War"
 *       500:
 *         description: Server error
 */
app.get('/api/chapters', async (req, res) => {
    const data = await readJsonFile('chapter-summary.json');
    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ error: 'Failed to load chapters' });
    }
});

/**
 * @swagger
 * /api/chapters/{id}:
 *   get:
 *     summary: Get chapter by ID
 *     tags: [Chapters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chapter ID (1-18)
 *         example: "1"
 *     responses:
 *       200:
 *         description: Successfully retrieved chapter
 *       404:
 *         description: Chapter not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/chapters/{id}/verses/summary:
 *   get:
 *     summary: Get chapter verses summary
 *     tags: [Verses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chapter ID
 *         example: "1"
 *     responses:
 *       200:
 *         description: Successfully retrieved verse summary
 *       404:
 *         description: Chapter not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/chapters/{id}/verses/{verseId}:
 *   get:
 *     summary: Get verse details by ID
 *     tags: [Verses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chapter ID
 *         example: "1"
 *       - in: path
 *         name: verseId
 *         required: true
 *         schema:
 *           type: string
 *         description: Verse ID (can be simple number like "1" or full format like "1.1")
 *         example: "1"
 *     responses:
 *       200:
 *         description: Successfully retrieved verse details
 *       404:
 *         description: Verse not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/chapters/{id}/verses:
 *   get:
 *     summary: Get all verses for a chapter
 *     tags: [Verses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chapter ID
 *         example: "1"
 *     responses:
 *       200:
 *         description: Successfully retrieved all verses for the chapter
 *       404:
 *         description: Chapter not found
 *       500:
 *         description: Server error
 */
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
            const enhancedVerse = enhanceVerse(verse, chapterId);
            res.render('verse', {
                title: enhancedVerse.verseHeader || `Verse ${originalVerseId}`,
                chapter,
                verse: enhancedVerse,
                chapterTitle: chapter.chapterTitleForChapterPage || chapter.chapterTitle
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

// Word meaning page
app.get('/word-meaning/:wordId', async (req, res) => {
    const wordId = req.params.wordId;
    const wordMeanings = await readJsonFile(WORD_MEANING_FILE);
    
    if (wordMeanings) {
        const detail = wordMeanings.find(w => w.id === wordId);
        if (detail) {
            // Enhance detail with routes
            const enhancedDetail = {
                ...detail,
                previousWMRoute: hashLinkToRoute(detail.previousWMUrl),
                nextWMRoute: hashLinkToRoute(detail.nextWMUrl),
                data: detail.data.map(item => ({
                    ...item,
                    route: hashLinkToRoute(item.refLink)
                }))
            };
            
            res.render('word-meaning', {
                title: `Word Meaning: ${detail.id}`,
                detail: enhancedDetail
            });
        } else {
            res.status(404).render('404', { 
                title: 'Word Meaning Not Found',
                message: `Word meaning "${wordId}" not found`
            });
        }
    } else {
        res.status(500).render('500', { title: 'Server Error' });
    }
});

/**
 * @swagger
 * /api/word-meaning/{wordId}:
 *   get:
 *     summary: Get word meaning details
 *     tags: [Word Meanings]
 *     parameters:
 *       - in: path
 *         name: wordId
 *         required: true
 *         schema:
 *           type: string
 *         description: Sanskrit word ID
 *         example: "a-kāraḥ"
 *     responses:
 *       200:
 *         description: Successfully retrieved word meaning
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "a-kāraḥ"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       word:
 *                         type: string
 *                       meaning:
 *                         type: string
 *                       referenceHeader:
 *                         type: string
 *                       refLink:
 *                         type: string
 *       404:
 *         description: Word meaning not found
 *       500:
 *         description: Server error
 */
app.get('/api/word-meaning/:wordId', async (req, res) => {
    const wordId = req.params.wordId;
    const wordMeanings = await readJsonFile(WORD_MEANING_FILE);
    
    if (wordMeanings) {
        const detail = wordMeanings.find(w => w.id === wordId);
        if (detail) {
            res.json(detail);
        } else {
            res.status(404).json({ error: 'Word meaning not found' });
        }
    } else {
        res.status(500).json({ error: 'Failed to load word meanings' });
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

