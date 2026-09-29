package com.example.user;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service){this.service=service;}

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id){
        return ResponseEntity.ok(UserResponse.from(service.getUser(id)));
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserResponse>> search(@RequestParam String name){
        return ResponseEntity.ok(
            service.searchUsers(name).stream()
                .map(UserResponse::from).toList());
    }

    @PostMapping
    public ResponseEntity<UserResponse> create(
            @Valid @RequestBody UserRequest request){
        User user=service.createUser(request.getName(),request.getEmail());
        return ResponseEntity.created(
            URI.create("/api/users/"+user.getId()))
            .body(UserResponse.from(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}