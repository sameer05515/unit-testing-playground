package com.example.user;

public interface EmailService {
    void sendWelcomeEmail(User user);
    void sendDeletionEmail(User user);
}