package com.comicsviewer.controller;

import com.comicsviewer.model.ComicFile;
import com.comicsviewer.service.ComicsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Controller
@Tag(name = "Comics API", description = "API endpoints for viewing and managing comics")
public class ComicsController {
    
    @Autowired
    private ComicsService comicsService;
    
    @GetMapping("/")
    public String index(Model model, @org.springframework.web.bind.annotation.RequestParam(required = false, defaultValue = "name") String sortBy) {
        List<ComicFile> comics = comicsService.getAllComics(sortBy);
        model.addAttribute("comics", comics);
        model.addAttribute("totalCount", comics.size());
        model.addAttribute("sortBy", sortBy);
        return "index";
    }
    
    @GetMapping("/view/{slug}")
    public String viewComic(@PathVariable String slug, Model model, @org.springframework.web.bind.annotation.RequestParam(required = false, defaultValue = "name") String sortBy) {
        List<ComicFile> comics = comicsService.getAllComics(sortBy);
        model.addAttribute("comics", comics);
        model.addAttribute("totalCount", comics.size());
        model.addAttribute("initialSlug", slug);
        model.addAttribute("sortBy", sortBy);
        return "index";
    }
    
    @GetMapping("/api/comics")
    @ResponseBody
    @Operation(
            summary = "Get all comics",
            description = "Retrieves a list of all available comics with their metadata including name, path, slug, size, and last modified date. Supports sorting via 'sortBy' query parameter: 'name' (default), 'dateDesc' (newest first), 'dateAsc' (oldest first)"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully retrieved list of comics",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ComicFile.class))
            )
    })
    public List<ComicFile> getComicsJson(@org.springframework.web.bind.annotation.RequestParam(required = false, defaultValue = "name") String sortBy) {
        return comicsService.getAllComics(sortBy);
    }
    
    @GetMapping("/comic/{path:.+}")
    @Operation(
            summary = "Get comic by path",
            description = "Retrieves a comic PDF file by its relative path. This is the legacy endpoint."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Comic PDF file found and returned",
                    content = @Content(mediaType = "application/pdf")
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Comic not found"
            )
    })
    public ResponseEntity<Resource> getComic(
            @Parameter(description = "Relative path to the comic file", required = true)
            @PathVariable String path) {
        String decodedPath = java.net.URLDecoder.decode(path, StandardCharsets.UTF_8);
        File comicFile = comicsService.getComicFile(decodedPath);
        
        if (comicFile == null || !comicFile.exists()) {
            return ResponseEntity.notFound().build();
        }
        
        Resource resource = new FileSystemResource(comicFile);
        String encodedFilename = URLEncoder.encode(comicFile.getName(), StandardCharsets.UTF_8)
                .replace("+", "%20");
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + encodedFilename + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }
    
    @GetMapping("/comic-slug/{slug}")
    @Operation(
            summary = "Get comic by slug",
            description = "Retrieves a comic PDF file by its unique slug identifier. This is the recommended endpoint for accessing comics."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Comic PDF file found and returned",
                    content = @Content(mediaType = "application/pdf")
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Comic not found with the provided slug"
            )
    })
    public ResponseEntity<Resource> getComicBySlug(
            @Parameter(description = "Unique slug identifier for the comic", required = true, example = "my-comic")
            @PathVariable String slug) {
        ComicFile comic = comicsService.getComicBySlug(slug);
        
        if (comic == null) {
            return ResponseEntity.notFound().build();
        }
        
        File comicFile = comicsService.getComicFile(comic.getRelativePath());
        
        if (comicFile == null || !comicFile.exists()) {
            return ResponseEntity.notFound().build();
        }
        
        Resource resource = new FileSystemResource(comicFile);
        String encodedFilename = URLEncoder.encode(comicFile.getName(), StandardCharsets.UTF_8)
                .replace("+", "%20");
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + encodedFilename + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }
}

