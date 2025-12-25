package com.comicsviewer.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Represents a comic PDF file with its metadata")
public class ComicFile {
    
    @Schema(description = "Name of the comic file", example = "My Comic.pdf")
    private String name;
    
    @Schema(description = "Full absolute path to the comic file", example = "D:\\Prem\\comics\\My Comic.pdf")
    private String path;
    
    @Schema(description = "Relative path from the comics directory", example = "My Comic.pdf")
    private String relativePath;
    
    @Schema(description = "Unique URL-friendly slug identifier", example = "my-comic")
    private String slug;
    
    @Schema(description = "File size in bytes", example = "1048576")
    private long size;
    
    @Schema(description = "File modification date in milliseconds since epoch", example = "1640995200000")
    private long lastModified;
    
    @Schema(description = "Source directory identifier (index or name) for multi-directory support", example = "0")
    private String sourceDirectory;
}

