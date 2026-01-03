package com.comicsviewer.integration;

import com.comicsviewer.model.ComicFile;
import com.comicsviewer.service.ComicsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(properties = {
    "comics.directory=",
    "comics.directories="
})
class ComicsIntegrationTest {

    @Autowired
    private ComicsService comicsService;

    @TempDir
    Path tempDir;

    @BeforeEach
    void setUp() {
        // Set test directory
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", tempDir.toString());
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", "");
    }

    @Test
    void testFullWorkflow() throws IOException {
        // Create test PDF files
        Path pdf1 = tempDir.resolve("Comic A.pdf");
        Path pdf2 = tempDir.resolve("Comic B.pdf");
        Files.createFile(pdf1);
        Files.createFile(pdf2);

        // Get all comics
        List<ComicFile> comics = comicsService.getAllComics();
        assertEquals(2, comics.size());

        // Get comic by slug
        ComicFile comic = comics.get(0);
        ComicFile found = comicsService.getComicBySlug(comic.getSlug());
        assertNotNull(found);
        assertEquals(comic.getSlug(), found.getSlug());

        // Get file
        File file = comicsService.getComicFile(found.getRelativePath(), found.getSourceDirectory());
        assertNotNull(file);
        assertTrue(file.exists());
        assertTrue(file.getName().endsWith(".pdf"));
    }

    @Test
    void testMultipleDirectoriesIntegration() throws IOException {
        // Create two directories
        Path dir1 = tempDir.resolve("dir1");
        Path dir2 = tempDir.resolve("dir2");
        Files.createDirectories(dir1);
        Files.createDirectories(dir2);

        Path pdf1 = dir1.resolve("comic1.pdf");
        Path pdf2 = dir2.resolve("comic2.pdf");
        Files.createFile(pdf1);
        Files.createFile(pdf2);

        String dirs = dir1.toString() + "," + dir2.toString();
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", dirs);
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", "");

        List<ComicFile> comics = comicsService.getAllComics();
        assertEquals(2, comics.size());

        // Verify both comics can be retrieved
        for (ComicFile comic : comics) {
            File file = comicsService.getComicFile(comic.getRelativePath(), comic.getSourceDirectory());
            assertNotNull(file);
            assertTrue(file.exists());
        }
    }

    @Test
    void testSortingIntegration() throws IOException, InterruptedException {
        // Create files with different modification times
        Path pdf1 = tempDir.resolve("first.pdf");
        Path pdf2 = tempDir.resolve("second.pdf");
        Files.createFile(pdf1);
        Thread.sleep(100);
        Files.createFile(pdf2);

        List<ComicFile> byName = comicsService.getAllComics("name");
        List<ComicFile> byDateDesc = comicsService.getAllComics("dateDesc");
        List<ComicFile> byDateAsc = comicsService.getAllComics("dateAsc");

        assertEquals(2, byName.size());
        assertEquals(2, byDateDesc.size());
        assertEquals(2, byDateAsc.size());

        // Verify sorting works
        assertEquals("first.pdf", byName.get(0).getName());
        assertTrue(byDateDesc.get(0).getLastModified() >= byDateDesc.get(1).getLastModified());
        assertTrue(byDateAsc.get(0).getLastModified() <= byDateAsc.get(1).getLastModified());
    }
}
