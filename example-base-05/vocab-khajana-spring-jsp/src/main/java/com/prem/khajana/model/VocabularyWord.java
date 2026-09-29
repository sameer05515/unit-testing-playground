package com.prem.khajana.model;

import java.util.List;

/**
 * JSP-friendly vocabulary model.
 *
 * JSP EL expects JavaBean-style getters such as getId(), getWord(),
 * getType(), getMeanings() and getExamples(). A Java record exposes
 * id(), word(), etc., which can cause PropertyNotFoundException in
 * some JSP/EL configurations.
 */
public class VocabularyWord {

    private final int id;
    private final String word;
    private final String type;
    private final List<String> meanings;
    private final List<String> examples;

    public VocabularyWord(
            int id,
            String word,
            String type,
            List<String> meanings,
            List<String> examples) {
        this.id = id;
        this.word = word;
        this.type = type;
        this.meanings = meanings;
        this.examples = examples;
    }

    public int getId() {
        return id;
    }

    public String getWord() {
        return word;
    }

    public String getType() {
        return type;
    }

    public List<String> getMeanings() {
        return meanings;
    }

    public List<String> getExamples() {
        return examples;
    }
}
