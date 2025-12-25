package com.comicsviewer.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ComicFileTest {

    @Test
    void testComicFile_AllArgsConstructor() {
        ComicFile comic = new ComicFile(
            "Test Comic.pdf",
            "/path/to/Test Comic.pdf",
            "Test Comic.pdf",
            "test-comic",
            1024L,
            1234567890L,
            "0"
        );

        assertEquals("Test Comic.pdf", comic.getName());
        assertEquals("/path/to/Test Comic.pdf", comic.getPath());
        assertEquals("Test Comic.pdf", comic.getRelativePath());
        assertEquals("test-comic", comic.getSlug());
        assertEquals(1024L, comic.getSize());
        assertEquals(1234567890L, comic.getLastModified());
        assertEquals("0", comic.getSourceDirectory());
    }

    @Test
    void testComicFile_NoArgsConstructor() {
        ComicFile comic = new ComicFile();

        assertNotNull(comic);
        assertNull(comic.getName());
        assertNull(comic.getPath());
        assertNull(comic.getRelativePath());
        assertNull(comic.getSlug());
        assertEquals(0L, comic.getSize());
        assertEquals(0L, comic.getLastModified());
        assertNull(comic.getSourceDirectory());
    }

    @Test
    void testComicFile_SettersAndGetters() {
        ComicFile comic = new ComicFile();

        comic.setName("New Comic.pdf");
        comic.setPath("/new/path/New Comic.pdf");
        comic.setRelativePath("New Comic.pdf");
        comic.setSlug("new-comic");
        comic.setSize(2048L);
        comic.setLastModified(9876543210L);
        comic.setSourceDirectory("1");

        assertEquals("New Comic.pdf", comic.getName());
        assertEquals("/new/path/New Comic.pdf", comic.getPath());
        assertEquals("New Comic.pdf", comic.getRelativePath());
        assertEquals("new-comic", comic.getSlug());
        assertEquals(2048L, comic.getSize());
        assertEquals(9876543210L, comic.getLastModified());
        assertEquals("1", comic.getSourceDirectory());
    }

    @Test
    void testComicFile_EqualsAndHashCode() {
        ComicFile comic1 = new ComicFile(
            "Test.pdf",
            "/path/Test.pdf",
            "Test.pdf",
            "test",
            1000L,
            1234567890L,
            "0"
        );

        ComicFile comic2 = new ComicFile(
            "Test.pdf",
            "/path/Test.pdf",
            "Test.pdf",
            "test",
            1000L,
            1234567890L,
            "0"
        );

        ComicFile comic3 = new ComicFile(
            "Different.pdf",
            "/path/Different.pdf",
            "Different.pdf",
            "different",
            2000L,
            9876543210L,
            "1"
        );

        assertEquals(comic1, comic2);
        assertEquals(comic1.hashCode(), comic2.hashCode());
        assertNotEquals(comic1, comic3);
        assertNotEquals(comic1.hashCode(), comic3.hashCode());
    }

    @Test
    void testComicFile_ToString() {
        ComicFile comic = new ComicFile(
            "Test.pdf",
            "/path/Test.pdf",
            "Test.pdf",
            "test",
            1000L,
            1234567890L,
            "0"
        );

        String toString = comic.toString();
        assertNotNull(toString);
        assertTrue(toString.contains("Test.pdf"));
        assertTrue(toString.contains("test"));
    }
}
