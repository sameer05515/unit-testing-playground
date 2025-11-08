const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Dummy list of files
const files = ["file1.txt", "file2.txt", "file3.txt", "file4.txt"];

// Serve static files (Bootstrap CSS, if needed)
// app.use(express.static(path.join(__dirname, "../public")));

// Set EJS as view engine and define views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Route
app.get("/", (req, res) => {
    const slug = req.query.slug || null;
    res.render("index", { files, slug });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
