package com.p.testing.practice.mtp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    private String id;
    private String uniqueId;
    private String name;
    private String dob;
}
