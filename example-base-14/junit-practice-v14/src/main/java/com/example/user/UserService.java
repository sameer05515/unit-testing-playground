package com.example.user;

import java.util.List;

public class UserService {

    private final UserRepository repository;
    private final EmailService emailService;
    private final AuditService auditService;

    public UserService(
            UserRepository repository,
            EmailService emailService,
            AuditService auditService) {
        this.repository = repository;
        this.emailService = emailService;
        this.auditService = auditService;
    }

    public User getUser(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public User createUser(String name, String email) {
        if (repository.existsByEmail(email)) {
            throw new DuplicateEmailException(email);
        }

        User user = new User(name, email);
        User saved = repository.save(user);

        auditService.record("USER_CREATED", saved.getId());
        emailService.sendWelcomeEmail(saved);

        return saved;
    }

    public void deleteUser(Long id) {
        User user = getUser(id);

        repository.deleteById(id);
        auditService.record("USER_DELETED", id);
        emailService.sendDeletionEmail(user);
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }
}