package com.comicsviewer.service;

import com.comicsviewer.model.ComicFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.FileTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ComicsService {
    
    @Value("${comics.directory:D:\\Prem\\comics}")
    private String comicsDirectory;
    
    @Value("${comics.directories:}")
    private String comicsDirectories;
    
    public List<ComicFile> getAllComics() {
        return getAllComics("name");
    }
    
    public List<ComicFile> getAllComics(String sortBy) {
        List<ComicFile> comics = new ArrayList<>();
        Set<String> usedSlugs = new HashSet<>();
        List<String> directories = getComicsDirectories();
        
        // Process each directory
        for (int i = 0; i < directories.size(); i++) {
            String dir = directories.get(i);
            String sourceDirId = String.valueOf(i);
            Path rootPath = Paths.get(dir);
            
            if (!Files.exists(rootPath) || !Files.isDirectory(rootPath)) {
                continue;
            }
            
            try (Stream<Path> paths = Files.walk(rootPath)) {
                paths.filter(Files::isRegularFile)
                     .filter(path -> path.toString().toLowerCase().endsWith(".pdf"))
                     .forEach(path -> {
                         try {
                             String relativePath = rootPath.relativize(path).toString().replace("\\", "/");
                             String slug = generateUniqueSlug(path.getFileName().toString(), relativePath, usedSlugs);
                             FileTime lastModifiedTime = Files.getLastModifiedTime(path);
                             comics.add(new ComicFile(
                                 path.getFileName().toString(),
                                 path.toString(),
                                 relativePath,
                                 slug,
                                 Files.size(path),
                                 lastModifiedTime.toMillis(),
                                 sourceDirId
                             ));
                         } catch (IOException e) {
                             // Skip files that can't be read
                         }
                     });
            } catch (IOException e) {
                // Continue with next directory on error
            }
        }
        
        // Sort based on sortBy parameter
        if ("date".equalsIgnoreCase(sortBy) || "dateDesc".equalsIgnoreCase(sortBy)) {
            comics.sort(Comparator.comparing(ComicFile::getLastModified).reversed());
        } else if ("dateAsc".equalsIgnoreCase(sortBy)) {
            comics.sort(Comparator.comparing(ComicFile::getLastModified));
        } else {
            // Default: sort by name
            comics.sort(Comparator.comparing(ComicFile::getName, String.CASE_INSENSITIVE_ORDER));
        }
        
        return comics;
    }
    
    /**
     * Get list of comics directories to scan.
     * Supports both single directory (comics.directory) and multiple directories (comics.directories).
     * If comics.directories is set, it takes precedence.
     */
    private List<String> getComicsDirectories() {
        List<String> directories = new ArrayList<>();
        
        // Check if multiple directories are configured
        if (comicsDirectories != null && !comicsDirectories.trim().isEmpty()) {
            // Split by comma and trim each directory
            directories = Arrays.stream(comicsDirectories.split(","))
                    .map(String::trim)
                    .filter(dir -> !dir.isEmpty())
                    .collect(Collectors.toList());
        }
        
        // If no multiple directories configured, use single directory
        if (directories.isEmpty() && comicsDirectory != null && !comicsDirectory.trim().isEmpty()) {
            directories.add(comicsDirectory.trim());
        }
        
        return directories;
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
        return getComicFile(relativePath, null);
    }
    
    public File getComicFile(String relativePath, String sourceDirectory) {
        List<String> directories = getComicsDirectories();
        
        // If source directory is specified, try that directory first
        if (sourceDirectory != null && !sourceDirectory.isEmpty()) {
            try {
                int index = Integer.parseInt(sourceDirectory);
                if (index >= 0 && index < directories.size()) {
                    Path filePath = Paths.get(directories.get(index), relativePath.replace("/", File.separator));
                    File file = filePath.toFile();
                    if (file.exists() && file.isFile() && file.getName().toLowerCase().endsWith(".pdf")) {
                        return file;
                    }
                }
            } catch (NumberFormatException e) {
                // Invalid source directory index, fall through to search all
            }
        }
        
        // Search in all directories
        for (String dir : directories) {
            Path filePath = Paths.get(dir, relativePath.replace("/", File.separator));
            File file = filePath.toFile();
            if (file.exists() && file.isFile() && file.getName().toLowerCase().endsWith(".pdf")) {
                return file;
            }
        }
        
        return null;
    }
}

