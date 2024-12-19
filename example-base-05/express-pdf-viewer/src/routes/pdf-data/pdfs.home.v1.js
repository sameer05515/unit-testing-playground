const express = require("express");
const path = require("path");
const { files, getDetailsForSlug } = require("./utils.v1");

const router = express.Router();

router.get("/", (req, res) => {
    const slug = req.query.slug || null;
    const details = slug ? getDetailsForSlug(slug) : null;
    res.render("pdfs/layout.v1.ejs", { files, slug, details });
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
