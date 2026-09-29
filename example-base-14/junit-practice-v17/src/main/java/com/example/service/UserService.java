package com.example.service;

import com.example.dto.UserRequest;
import com.example.dto.UserResponse;
import com.example.exception.DuplicateEmailException;
import com.example.exception.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class UserService {

    private final AtomicLong sequence = new AtomicLong(1);

    public UserResponse getUser(Long id) {
        if (id == 999L) {
            throw new UserNotFoundException(id);
        }

        return new UserResponse(id, "Prem", "prem@example.com");
    }

    public List<UserResponse> searchUsers(String name) {
        return List.of(
            new UserResponse(1L, "Prem", "prem@example.com"),
            new UserResponse(2L, "Rahul", "rahul@example.com")
        );
    }

    public UserResponse createUser(UserRequest request) {
        if ("duplicate@example.com".equalsIgnoreCase(request.email())) {
            throw new DuplicateEmailException(request.email());
        }

        return new UserResponse(
            sequence.getAndIncrement(),
            request.name(),
            request.email()
        );
    }

    public void deleteUser(Long id) {
        if (id == 999L) {
            throw new UserNotFoundException(id);
        }
    }
}
