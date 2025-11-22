package com.comicsviewer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComicFile {
    private String name;
    private String path;
    private String relativePath;
    private String slug;
    private long size;
}

