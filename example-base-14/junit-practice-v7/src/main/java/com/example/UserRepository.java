package com.example;

import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class UserRepository {

    private final Map<Long, User> users = new HashMap<>();
    private final AtomicLong sequence = new AtomicLong(0);

    public Optional<User> findById(Long id) {
        return Optional.ofNullable(users.get(id));
    }

    public User save(User user) {

        if (user.getId() == null) {
            user.setId(sequence.incrementAndGet());
        }

        users.put(user.getId(), user);

        return user;
    }

    public void deleteById(Long id) {
        users.remove(id);
    }
}
