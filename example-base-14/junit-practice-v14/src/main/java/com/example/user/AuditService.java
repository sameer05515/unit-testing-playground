package com.example.user;

public interface AuditService {
    void record(String action, Long userId);
}