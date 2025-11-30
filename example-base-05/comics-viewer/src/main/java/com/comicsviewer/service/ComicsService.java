package com.comicsviewer.service;

import com.comicsviewer.model.ComicFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@Service
public class ComicsService {
    
    @Value("${comics.directory:D:\\Prem\\comics}")
    private String comicsDirectory;
    
    public List<ComicFile> getAllComics() {
        List<ComicFile> comics = new ArrayList<>();
        Set<String> usedSlugs = new HashSet<>();
        Path rootPath = Paths.get(comicsDirectory);
        
        if (!Files.exists(rootPath) || !Files.isDirectory(rootPath)) {
            return comics;
        }
        
        try (Stream<Path> paths = Files.walk(rootPath)) {
            paths.filter(Files::isRegularFile)
                 .filter(path -> path.toString().toLowerCase().endsWith(".pdf"))
                 .sorted(Comparator.comparing(Path::toString))
                 .forEach(path -> {
                     try {
                         String relativePath = rootPath.relativize(path).toString().replace("\\", "/");
                         String slug = generateUniqueSlug(path.getFileName().toString(), relativePath, usedSlugs);
                         comics.add(new ComicFile(
                             path.getFileName().toString(),
                             path.toString(),
                             relativePath,
                             slug,
                             Files.size(path)
                         ));
                     } catch (IOException e) {
                         // Skip files that can't be read
                     }
                 });
        } catch (IOException e) {
            // Return empty list on error
        }
        
        return comics;
    }
    
    private String generateUniqueSlug(String fileName, String relativePath, Set<String> usedSlugs) {
        // Remove file extension if present
        String baseName = fileName;
        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex > 0) {
            baseName = fileName.substring(0, lastDotIndex);
        }
        
        // Generate base slug from filename
        String baseSlug = baseName.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-|-$", "");
        
        // If base slug is empty, use relative path
        if (baseSlug.isEmpty()) {
            baseSlug = relativePath.toLowerCase()
                    .replaceAll("[^a-z0-9]+", "-")
                    .replaceAll("^-|-$", "");
        }
        
        // If still empty, use a default
        if (baseSlug.isEmpty()) {
            baseSlug = "comic";
        }
        
        // Ensure uniqueness
        String slug = baseSlug;
        int counter = 1;
        while (usedSlugs.contains(slug)) {
            slug = baseSlug + "-" + counter;
            counter++;
        }
        
        usedSlugs.add(slug);
        return slug;
    }
    
    public ComicFile getComicBySlug(String slug) {
        List<ComicFile> comics = getAllComics();
        return comics.stream()
                .filter(comic -> slug.equals(comic.getSlug()))
                .findFirst()
                .orElse(null);
    }
    
    public File getComicFile(String relativePath) {
        Path filePath = Paths.get(comicsDirectory, relativePath.replace("/", File.separator));
        File file = filePath.toFile();
        
        if (file.exists() && file.isFile() && file.getName().toLowerCase().endsWith(".pdf")) {
            return file;
        }
        
        return null;
    }
}

