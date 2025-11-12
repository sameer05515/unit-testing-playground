package com.p.testing.practice.mtp.student.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping({"/", "/welcome"})
    public String welcome() {
        return "welcome";
    }

    @GetMapping("/redoc")
    public String redoc() {
        return "redoc";
    }
}

