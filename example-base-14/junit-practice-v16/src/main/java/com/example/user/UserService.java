package com.example.user;

import java.util.List;

public interface UserService {
    User getUser(Long id);
    List<User> searchUsers(String name);
    User createUser(String name,String email);
    void deleteUser(Long id);
}