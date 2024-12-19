const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

app.get("/word/:term", async (req, res) => {
  const word = req.params.term;
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Word not found");

    const data = await response.json();
    const entry = data[0];

    const result = {
      word: entry.word,
      phonetics: entry.phonetics.map(p => p.text).filter(Boolean),
      meanings: entry.meanings.map(m => ({
        partOfSpeech: m.partOfSpeech,
        definitions: m.definitions.map(d => ({
          definition: d.definition,
          example: d.example || ""
        }))
      }))
    };

    res.json(result);
  } catch (error) {
    res.status(404).json({ error: "Word not found or API error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
