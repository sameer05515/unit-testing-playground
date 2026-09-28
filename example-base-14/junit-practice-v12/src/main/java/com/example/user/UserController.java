package com.example.user;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;
@RestController @RequestMapping("/api/users")
public class UserController {
 private final UserService service;
 public UserController(UserService service){this.service=service;}
 @GetMapping("/{id}") public ResponseEntity<UserResponse> getUser(@PathVariable Long id){
  return ResponseEntity.ok(UserResponse.from(service.getUser(id)));
 }
 @GetMapping("/search") public ResponseEntity<List<UserResponse>> searchUsers(@RequestParam String name){
  return ResponseEntity.ok(service.searchUsers(name).stream().map(UserResponse::from).toList());
 }
 @PostMapping public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest request){
  User u=service.createUser(request.getName(),request.getEmail());
  return ResponseEntity.created(URI.create("/api/users/"+u.getId())).body(UserResponse.from(u));
 }
 @DeleteMapping("/{id}") public ResponseEntity<Void> deleteUser(@PathVariable Long id){
  service.deleteUser(id); return ResponseEntity.noContent().build();
 }
}