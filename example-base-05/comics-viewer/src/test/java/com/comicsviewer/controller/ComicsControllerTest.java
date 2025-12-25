package com.comicsviewer.controller;

import com.comicsviewer.model.ComicFile;
import com.comicsviewer.service.ComicsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ComicsController.class)
class ComicsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ComicsService comicsService;

    private List<ComicFile> mockComics;

    @BeforeEach
    void setUp() {
        mockComics = new ArrayList<>();
        ComicFile comic1 = new ComicFile(
            "Comic 1.pdf",
            "/path/to/Comic 1.pdf",
            "Comic 1.pdf",
            "comic-1",
            1024L,
            System.currentTimeMillis(),
            "0"
        );
        ComicFile comic2 = new ComicFile(
            "Comic 2.pdf",
            "/path/to/Comic 2.pdf",
            "Comic 2.pdf",
            "comic-2",
            2048L,
            System.currentTimeMillis() - 1000,
            "0"
        );
        mockComics.add(comic1);
        mockComics.add(comic2);
    }

    @Test
    void testGetComicsJson_Default() throws Exception {
        when(comicsService.getAllComics("name")).thenReturn(mockComics);

        mockMvc.perform(get("/api/comics"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Comic 1.pdf"))
                .andExpect(jsonPath("$[0].slug").value("comic-1"));
    }

    @Test
    void testGetComicsJson_WithSortBy() throws Exception {
        when(comicsService.getAllComics("dateDesc")).thenReturn(mockComics);

        mockMvc.perform(get("/api/comics")
                .param("sortBy", "dateDesc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void testGetComicsJson_EmptyList() throws Exception {
        when(comicsService.getAllComics(anyString())).thenReturn(new ArrayList<>());

        mockMvc.perform(get("/api/comics"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    void testGetComicBySlug_Found(@TempDir Path tempDir) throws Exception {
        Path pdfFile = tempDir.resolve("test.pdf");
        Files.createFile(pdfFile);
        File file = pdfFile.toFile();

        ComicFile comic = mockComics.get(0);
        when(comicsService.getComicBySlug("comic-1")).thenReturn(comic);
        when(comicsService.getComicFile(comic.getRelativePath(), comic.getSourceDirectory()))
                .thenReturn(file);

        mockMvc.perform(get("/comic-slug/comic-1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF))
                .andExpect(header().exists("Content-Disposition"));
    }

    @Test
    void testGetComicBySlug_NotFound() throws Exception {
        when(comicsService.getComicBySlug("non-existent")).thenReturn(null);

        mockMvc.perform(get("/comic-slug/non-existent"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetComicBySlug_FileNotFound() throws Exception {
        ComicFile comic = mockComics.get(0);
        when(comicsService.getComicBySlug("comic-1")).thenReturn(comic);
        when(comicsService.getComicFile(comic.getRelativePath(), comic.getSourceDirectory()))
                .thenReturn(null);

        mockMvc.perform(get("/comic-slug/comic-1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetComic_ByPath(@TempDir Path tempDir) throws Exception {
        Path pdfFile = tempDir.resolve("test.pdf");
        Files.createFile(pdfFile);
        File file = pdfFile.toFile();

        when(comicsService.getComicFile("test.pdf", null)).thenReturn(file);

        mockMvc.perform(get("/comic/test.pdf"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF))
                .andExpect(header().exists("Content-Disposition"));
    }

    @Test
    void testGetComic_ByPath_NotFound() throws Exception {
        when(comicsService.getComicFile(anyString(), any())).thenReturn(null);

        mockMvc.perform(get("/comic/non-existent.pdf"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetComic_ByPath_Encoded() throws Exception {
        String encodedPath = "comic%20with%20spaces.pdf";
        String decodedPath = "comic with spaces.pdf";
        
        Path tempDir = Files.createTempDirectory("test");
        Path pdfFile = tempDir.resolve(decodedPath);
        Files.createFile(pdfFile);
        File file = pdfFile.toFile();

        when(comicsService.getComicFile(decodedPath, null)).thenReturn(file);

        mockMvc.perform(get("/comic/" + encodedPath))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF));
    }

    @Test
    void testIndex_DefaultSort() throws Exception {
        when(comicsService.getAllComics("name")).thenReturn(mockComics);

        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("index"))
                .andExpect(model().attributeExists("comics"))
                .andExpect(model().attributeExists("totalCount"))
                .andExpect(model().attributeExists("sortBy"))
                .andExpect(model().attribute("totalCount", 2))
                .andExpect(model().attribute("sortBy", "name"));
    }

    @Test
    void testIndex_WithSortBy() throws Exception {
        when(comicsService.getAllComics("dateDesc")).thenReturn(mockComics);

        mockMvc.perform(get("/")
                .param("sortBy", "dateDesc"))
                .andExpect(status().isOk())
                .andExpect(view().name("index"))
                .andExpect(model().attribute("sortBy", "dateDesc"));
    }

    @Test
    void testViewComic_WithSlug() throws Exception {
        when(comicsService.getAllComics("name")).thenReturn(mockComics);

        mockMvc.perform(get("/view/comic-1"))
                .andExpect(status().isOk())
                .andExpect(view().name("index"))
                .andExpect(model().attributeExists("comics"))
                .andExpect(model().attributeExists("initialSlug"))
                .andExpect(model().attribute("initialSlug", "comic-1"));
    }

    @Test
    void testViewComic_WithSlugAndSort() throws Exception {
        when(comicsService.getAllComics("dateAsc")).thenReturn(mockComics);

        mockMvc.perform(get("/view/comic-1")
                .param("sortBy", "dateAsc"))
                .andExpect(status().isOk())
                .andExpect(view().name("index"))
                .andExpect(model().attribute("initialSlug", "comic-1"))
                .andExpect(model().attribute("sortBy", "dateAsc"));
    }
}
