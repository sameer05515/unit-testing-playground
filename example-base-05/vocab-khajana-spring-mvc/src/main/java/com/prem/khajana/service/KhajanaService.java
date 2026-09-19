package com.prem.khajana.service;

import com.prem.khajana.model.VocabularyWord;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.w3c.dom.*;

import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.util.*;

@Service
public class KhajanaService {
    private final List<VocabularyWord> words = new ArrayList<>();
    private final Random random = new Random();

    @PostConstruct
    public void load() {
        try (InputStream in = new ClassPathResource("static/data/khajana.xml").getInputStream()) {
            DocumentBuilderFactory f = DocumentBuilderFactory.newInstance();
            f.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            f.setFeature("http://xml.org/sax/features/external-general-entities", false);
            f.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
            f.setXIncludeAware(false);
            f.setExpandEntityReferences(false);

            Document doc = f.newDocumentBuilder().parse(in);
            NodeList nodes = doc.getElementsByTagName("myword");

            for (int i = 0; i < nodes.getLength(); i++) {
                Element item = (Element) nodes.item(i);
                Element wordEl = (Element) item.getElementsByTagName("word").item(0);
                if (wordEl == null) continue;

                String word = wordEl.getTextContent().trim();
                if (word.isBlank()) continue;

                String type = wordEl.hasAttribute("type") ? wordEl.getAttribute("type") : "unknown";
                List<String> meanings = children(item, "meanings", "meaning");
                List<String> examples = children(item, "examples", "example");
                words.add(new VocabularyWord(i, word, type, meanings, examples));
            }
            words.sort(Comparator.comparing(VocabularyWord::word, String.CASE_INSENSITIVE_ORDER));
        } catch (Exception e) {
            throw new IllegalStateException("Unable to load khajana.xml", e);
        }
    }

    private List<String> children(Element parent, String containerTag, String childTag) {
        NodeList containers = parent.getElementsByTagName(containerTag);
        if (containers.getLength() == 0) return List.of();
        NodeList nodes = ((Element) containers.item(0)).getElementsByTagName(childTag);
        List<String> result = new ArrayList<>();
        for (int i = 0; i < nodes.getLength(); i++) {
            String text = nodes.item(i).getTextContent().trim();
            if (!text.isBlank()) result.add(text);
        }
        return List.copyOf(result);
    }

    public List<VocabularyWord> all() { return List.copyOf(words); }

    public Optional<VocabularyWord> findById(int id) {
        return words.stream().filter(w -> w.id() == id).findFirst();
    }

    public List<String> types() {
        return words.stream().map(VocabularyWord::type)
                .filter(Objects::nonNull).filter(s -> !s.isBlank())
                .distinct().sorted().toList();
    }

    public List<VocabularyWord> search(String q, String type) {
        String query = q == null ? "" : q.trim().toLowerCase(Locale.ROOT);
        String pos = type == null ? "" : type.trim().toLowerCase(Locale.ROOT);

        return words.stream().filter(w -> {
            boolean text = query.isBlank()
                    || w.word().toLowerCase(Locale.ROOT).contains(query)
                    || w.meanings().stream().anyMatch(m -> m.toLowerCase(Locale.ROOT).contains(query))
                    || w.examples().stream().anyMatch(e -> e.toLowerCase(Locale.ROOT).contains(query));
            boolean typeOk = pos.isBlank() || w.type().equalsIgnoreCase(pos);
            return text && typeOk;
        }).toList();
    }

    public VocabularyWord randomWord() {
        return words.get(random.nextInt(words.size()));
    }

    public VocabularyWord wordOfDay() {
        long day = Math.floorDiv(System.currentTimeMillis(), 86_400_000L);
        return words.get((int) (day % words.size()));
    }

    public List<VocabularyWord> quizWords(int count) {
        List<VocabularyWord> copy = new ArrayList<>(words);
        Collections.shuffle(copy);
        return copy.stream().limit(count).toList();
    }

    public List<String> quizOptions(VocabularyWord correct) {
        LinkedHashSet<String> options = new LinkedHashSet<>();
        if (!correct.meanings().isEmpty()) options.add(correct.meanings().get(0));

        List<VocabularyWord> copy = new ArrayList<>(words);
        Collections.shuffle(copy);
        for (VocabularyWord w : copy) {
            if (!w.meanings().isEmpty()) options.add(w.meanings().get(0));
            if (options.size() >= 4) break;
        }
        return options.stream().limit(4).toList();
    }
}
