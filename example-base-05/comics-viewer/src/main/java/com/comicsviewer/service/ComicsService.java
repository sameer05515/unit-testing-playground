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
import java.util.List;
import java.util.stream.Stream;

@Service
public class ComicsService {
    
    @Value("${comics.directory:D:\\Prem\\comics}")
    private String comicsDirectory;
    
    public List<ComicFile> getAllComics() {
        List<ComicFile> comics = new ArrayList<>();
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
                         comics.add(new ComicFile(
                             path.getFileName().toString(),
                             path.toString(),
                             relativePath,
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
    
    public File getComicFile(String relativePath) {
        Path filePath = Paths.get(comicsDirectory, relativePath.replace("/", File.separator));
        File file = filePath.toFile();
        
        if (file.exists() && file.isFile() && file.getName().toLowerCase().endsWith(".pdf")) {
            return file;
        }
        
        return null;
    }
}

