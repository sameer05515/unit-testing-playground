package com.comicsviewer.service;

import com.comicsviewer.model.ComicFile;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ComicsServiceTest {

    private ComicsService comicsService;
    
    @TempDir
    Path tempDir;

    @BeforeEach
    void setUp() {
        comicsService = new ComicsService();
    }

    @Test
    void testGetAllComics_EmptyDirectory() {
        // Set up empty directory
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", tempDir.toString());
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", "");
        
        List<ComicFile> comics = comicsService.getAllComics();
        
        assertNotNull(comics);
        assertTrue(comics.isEmpty());
    }

    @Test
    void testGetAllComics_WithPdfFiles() throws IOException {
        // Create test PDF files
        Path pdf1 = tempDir.resolve("comic1.pdf");
        Path pdf2 = tempDir.resolve("comic2.pdf");
        Files.createFile(pdf1);
        Files.createFile(pdf2);
        
        // Set up directory
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", tempDir.toString());
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", "");
        
        List<ComicFile> comics = comicsService.getAllComics();
        
        assertNotNull(comics);
        assertEquals(2, comics.size());
        assertTrue(comics.stream().anyMatch(c -> c.getName().equals("comic1.pdf")));
        assertTrue(comics.stream().anyMatch(c -> c.getName().equals("comic2.pdf")));
    }

    @Test
    void testGetAllComics_IgnoresNonPdfFiles() throws IOException {
        // Create mix of PDF and non-PDF files
        Path pdf1 = tempDir.resolve("comic1.pdf");
        Path txt1 = tempDir.resolve("readme.txt");
        Files.createFile(pdf1);
        Files.createFile(txt1);
        
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", tempDir.toString());
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", "");
        
        List<ComicFile> comics = comicsService.getAllComics();
        
        assertEquals(1, comics.size());
        assertEquals("comic1.pdf", comics.get(0).getName());
    }

    @Test
    void testGetAllComics_SortByName() throws IOException {
        // Create test files with different names
        Path pdf1 = tempDir.resolve("zebra.pdf");
        Path pdf2 = tempDir.resolve("apple.pdf");
        Path pdf3 = tempDir.resolve("banana.pdf");
        Files.createFile(pdf1);
        Files.createFile(pdf2);
        Files.createFile(pdf3);
        
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", tempDir.toString());
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", "");
        
        List<ComicFile> comics = comicsService.getAllComics("name");
        
        assertEquals(3, comics.size());
        assertEquals("apple.pdf", comics.get(0).getName());
        assertEquals("banana.pdf", comics.get(1).getName());
        assertEquals("zebra.pdf", comics.get(2).getName());
    }

    @Test
    void testGetAllComics_SortByDateDesc() throws IOException, InterruptedException {
        // Create files with different modification times
        Path pdf1 = tempDir.resolve("old.pdf");
        Path pdf2 = tempDir.resolve("new.pdf");
        Files.createFile(pdf1);
        Thread.sleep(100); // Ensure different timestamps
        Files.createFile(pdf2);
        
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", tempDir.toString());
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", "");
        
        List<ComicFile> comics = comicsService.getAllComics("dateDesc");
        
        assertEquals(2, comics.size());
        // Newest should be first
        assertTrue(comics.get(0).getLastModified() >= comics.get(1).getLastModified());
    }

    @Test
    void testGetAllComics_SortByDateAsc() throws IOException, InterruptedException {
        // Create files with different modification times
        Path pdf1 = tempDir.resolve("old.pdf");
        Path pdf2 = tempDir.resolve("new.pdf");
        Files.createFile(pdf1);
        Thread.sleep(100); // Ensure different timestamps
        Files.createFile(pdf2);
        
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", tempDir.toString());
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", "");
        
        List<ComicFile> comics = comicsService.getAllComics("dateAsc");
        
        assertEquals(2, comics.size());
        // Oldest should be first
        assertTrue(comics.get(0).getLastModified() <= comics.get(1).getLastModified());
    }

    @Test
    void testGetAllComics_MultipleDirectories() throws IOException {
        // Create two separate directories
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
        assertTrue(comics.stream().anyMatch(c -> c.getName().equals("comic1.pdf")));
        assertTrue(comics.stream().anyMatch(c -> c.getName().equals("comic2.pdf")));
    }

    @Test
    void testGetAllComics_Subdirectories() throws IOException {
        // Create nested directory structure
        Path subDir = tempDir.resolve("subdir");
        Files.createDirectories(subDir);
        
        Path pdf1 = tempDir.resolve("root.pdf");
        Path pdf2 = subDir.resolve("nested.pdf");
        Files.createFile(pdf1);
        Files.createFile(pdf2);
        
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", tempDir.toString());
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", "");
        
        List<ComicFile> comics = comicsService.getAllComics();
        
        assertEquals(2, comics.size());
        assertTrue(comics.stream().anyMatch(c -> c.getName().equals("root.pdf")));
        assertTrue(comics.stream().anyMatch(c -> c.getName().equals("nested.pdf")));
    }

    @Test
    void testGetComicBySlug_Found() throws IOException {
        Path pdf1 = tempDir.resolve("My Comic.pdf");
        Files.createFile(pdf1);
        
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", tempDir.toString());
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", "");
        
        List<ComicFile> allComics = comicsService.getAllComics();
        assertFalse(allComics.isEmpty());
        
        String slug = allComics.get(0).getSlug();
        ComicFile found = comicsService.getComicBySlug(slug);
        
        assertNotNull(found);
        assertEquals("My Comic.pdf", found.getName());
        assertEquals(slug, found.getSlug());
    }

    @Test
    void testGetComicBySlug_NotFound() {
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", tempDir.toString());
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", "");
        
        ComicFile found = comicsService.getComicBySlug("non-existent-slug");
        
        assertNull(found);
    }

    @Test
    void testGetComicFile_WithSourceDirectory() throws IOException {
        // Create two directories
        Path dir1 = tempDir.resolve("dir1");
        Path dir2 = tempDir.resolve("dir2");
        Files.createDirectories(dir1);
        Files.createDirectories(dir2);
        
        Path pdf1 = dir1.resolve("comic.pdf");
        Files.createFile(pdf1);
        
        String dirs = dir1.toString() + "," + dir2.toString();
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", dirs);
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", "");
        
        List<ComicFile> comics = comicsService.getAllComics();
        ComicFile comic = comics.get(0);
        
        File file = comicsService.getComicFile(comic.getRelativePath(), comic.getSourceDirectory());
        
        assertNotNull(file);
        assertTrue(file.exists());
        assertEquals("comic.pdf", file.getName());
    }

    @Test
    void testGetComicFile_WithoutSourceDirectory() throws IOException {
        Path pdf1 = tempDir.resolve("comic.pdf");
        Files.createFile(pdf1);
        
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", tempDir.toString());
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", "");
        
        File file = comicsService.getComicFile("comic.pdf", null);
        
        assertNotNull(file);
        assertTrue(file.exists());
        assertEquals("comic.pdf", file.getName());
    }

    @Test
    void testGetComicFile_NotFound() {
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", tempDir.toString());
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", "");
        
        File file = comicsService.getComicFile("non-existent.pdf", null);
        
        assertNull(file);
    }

    @Test
    void testGetAllComics_InvalidDirectory() {
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", "/non/existent/path");
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", "");
        
        List<ComicFile> comics = comicsService.getAllComics();
        
        assertNotNull(comics);
        assertTrue(comics.isEmpty());
    }

    @Test
    void testGetAllComics_DuplicateFilenames() throws IOException {
        // Create two directories with same filename
        Path dir1 = tempDir.resolve("dir1");
        Path dir2 = tempDir.resolve("dir2");
        Files.createDirectories(dir1);
        Files.createDirectories(dir2);
        
        Path pdf1 = dir1.resolve("comic.pdf");
        Path pdf2 = dir2.resolve("comic.pdf");
        Files.createFile(pdf1);
        Files.createFile(pdf2);
        
        String dirs = dir1.toString() + "," + dir2.toString();
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", dirs);
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", "");
        
        List<ComicFile> comics = comicsService.getAllComics();
        
        assertEquals(2, comics.size());
        // Both should have unique slugs
        assertNotEquals(comics.get(0).getSlug(), comics.get(1).getSlug());
    }

    @Test
    void testGetAllComics_DefaultSort() throws IOException {
        Path pdf1 = tempDir.resolve("z.pdf");
        Path pdf2 = tempDir.resolve("a.pdf");
        Files.createFile(pdf1);
        Files.createFile(pdf2);
        
        ReflectionTestUtils.setField(comicsService, "comicsDirectory", tempDir.toString());
        ReflectionTestUtils.setField(comicsService, "comicsDirectories", "");
        
        List<ComicFile> comics = comicsService.getAllComics();
        
        assertEquals(2, comics.size());
        // Default sort should be by name
        assertEquals("a.pdf", comics.get(0).getName());
        assertEquals("z.pdf", comics.get(1).getName());
    }
}
