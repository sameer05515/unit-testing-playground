const express = require("express");
const path = require("path");
const fs = require("fs");
const { files, getDetailsForSlug } = require("./utils.v1");

// Keep bookmarks in the project root so they survive server restarts.
const BOOKMARKS_FILE = path.resolve(__dirname, "../../../bookmark.json");

function readBookmarks() {
    try {
        const value = JSON.parse(fs.readFileSync(BOOKMARKS_FILE, "utf8"));
        return Array.isArray(value) ? value.filter((slug) => files.some((file) => file.slug === slug)) : [];
    } catch (error) {
        if (error.code !== "ENOENT") console.error("Unable to read bookmark.json:", error);
        return [];
    }
}

function writeBookmarks(bookmarks) {
    const tempFile = `${BOOKMARKS_FILE}.tmp`;
    fs.writeFileSync(tempFile, `${JSON.stringify(bookmarks, null, 2)}\n`, "utf8");
    fs.renameSync(tempFile, BOOKMARKS_FILE);
}

const router = express.Router();

router.get("/", (req, res) => {
    const slug = req.query.slug || null;
    const details = slug ? getDetailsForSlug(slug) : null;
    res.render("pdfs/layout.v1.ejs", { files, slug, details, bookmarks: readBookmarks() });
});

// Bookmark API: GET /bookmarks, POST /bookmarks { slug }, DELETE /bookmarks/:slug
router.get("/bookmarks", (req, res) => {
    const bookmarks = readBookmarks();
    res.json(bookmarks.map((bookmarkSlug) => {
        const file = files.find((item) => item.slug === bookmarkSlug);
        return { slug: bookmarkSlug, title: path.basename(file.filePath, path.extname(file.filePath)) };
    }));
});

router.post("/bookmarks", (req, res) => {
    const slug = req.body && req.body.slug;
    if (typeof slug !== "string" || !files.some((file) => file.slug === slug)) {
        return res.status(400).json({ error: "A valid PDF slug is required." });
    }
    const bookmarks = readBookmarks();
    if (!bookmarks.includes(slug)) bookmarks.push(slug);
    try {
        writeBookmarks(bookmarks);
        return res.status(200).json({ success: true, bookmarked: true, bookmarks });
    } catch (error) {
        console.error("Unable to save bookmark:", error);
        return res.status(500).json({ error: "Unable to save bookmark." });
    }
});

router.delete("/bookmarks/:slug", (req, res) => {
    const slug = req.params.slug;
    const bookmarks = readBookmarks().filter((item) => item !== slug);
    try {
        writeBookmarks(bookmarks);
        return res.json({ success: true, bookmarked: false, bookmarks });
    } catch (error) {
        console.error("Unable to remove bookmark:", error);
        return res.status(500).json({ error: "Unable to remove bookmark." });
    }
});

// Serve PDFs
router.get("/pdf/:slug", (req, res) => {
    const { slug } = req.params;
    const details = getDetailsForSlug(slug);
    
    if (!details) {
        return res.status(404).send("File not found");
    }

    res.sendFile(details.fileAbsolutePath);
});

module.exports = router;
