const express = require("express");
const app = express();

const PORT = 3030;

app.use(express.json());
app.use(express.static("public"));

// Mount words API routes
const wordsRouter = require("./routes/words");
app.use("/api/words", wordsRouter);

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
