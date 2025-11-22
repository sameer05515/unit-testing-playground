package com.comicsviewer.controller;

import com.comicsviewer.model.ComicFile;
import com.comicsviewer.service.ComicsService;
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
public class ComicsController {
    
    @Autowired
    private ComicsService comicsService;
    
    @GetMapping("/")
    public String index(Model model) {
        List<ComicFile> comics = comicsService.getAllComics();
        model.addAttribute("comics", comics);
        model.addAttribute("totalCount", comics.size());
        return "index";
    }
    
    @GetMapping("/api/comics")
    @ResponseBody
    public List<ComicFile> getComicsJson() {
        return comicsService.getAllComics();
    }
    
    @GetMapping("/comic/{path:.+}")
    public ResponseEntity<Resource> getComic(@PathVariable String path) {
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
}

