package com.prem.khajana.model;

import java.util.List;

public record VocabularyWord(
        int id,
        String word,
        String type,
        List<String> meanings,
        List<String> examples
) {}
