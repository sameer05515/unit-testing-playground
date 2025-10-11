const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 3030;

// app.use(express.json());
app.use(express.static("public"));
// Increase the limit for JSON and URL-encoded payloads
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));


// Mount words API routes
const wordsRouter = require("./routes/words");
app.use("/api/words", wordsRouter);

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
