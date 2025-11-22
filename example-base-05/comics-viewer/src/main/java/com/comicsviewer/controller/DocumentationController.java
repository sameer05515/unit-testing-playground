package com.comicsviewer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DocumentationController {
    
    @GetMapping("/docs")
    public String redirectToSwagger() {
        return "redirect:/swagger-ui.html";
    }
    
    @GetMapping("/api-docs")
    public String redirectToApiDocs() {
        return "redirect:/v3/api-docs";
    }
    
    @GetMapping("/redoc")
    public String redoc() {
        return "redirect:/redoc.html";
    }
}

