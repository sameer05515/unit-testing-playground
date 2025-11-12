package com.p.testing.practice.mtp.student.service;

import com.p.testing.practice.mtp.entity.Student;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    public List<Student> getAllStudents() {
        return List.of(
                Student.builder()
                        .id("1")
                        .uniqueId("STU-1001")
                        .name("Alice Johnson")
                        .dob("2000-01-15")
                        .build(),
                Student.builder()
                        .id("2")
                        .uniqueId("STU-1002")
                        .name("Benjamin Carter")
                        .dob("1999-08-03")
                        .build(),
                Student.builder()
                        .id("3")
                        .uniqueId("STU-1003")
                        .name("Charlotte Nguyen")
                        .dob("2001-05-22")
                        .build()
        );
    }
}
