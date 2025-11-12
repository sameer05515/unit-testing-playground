package com.p.testing.practice.mtp.student.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/students")
public class StudentViewController {

    @GetMapping("/view")
    public String viewStudents() {
        return "students";
    }
}

