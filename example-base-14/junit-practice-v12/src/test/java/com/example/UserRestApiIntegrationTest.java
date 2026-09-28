package com.example;
import com.example.user.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserRestApiIntegrationTest extends UserMySqlTestBase {
 @Autowired TestRestTemplate restTemplate;
 @Autowired UserRepository repository;
 @BeforeEach void clean(){repository.deleteAll();}
 @Test void shouldCreateUserAndReturn201(){
  UserRequest q=new UserRequest(); q.setName("Prem"); q.setEmail("prem@example.com");
  ResponseEntity<Map> r=restTemplate.postForEntity("/api/users",q,Map.class);
  assertEquals(HttpStatus.CREATED,r.getStatusCode()); assertNotNull(r.getBody());
  assertEquals("Prem",r.getBody().get("name")); assertEquals("prem@example.com",r.getBody().get("email"));
 }
 @Test void shouldGetUserAndReturn200(){
  User u=repository.save(new User("Rahul","rahul@example.com"));
  ResponseEntity<Map> r=restTemplate.getForEntity("/api/users/"+u.getId(),Map.class);
  assertEquals(HttpStatus.OK,r.getStatusCode()); assertEquals("Rahul",r.getBody().get("name"));
 }
 @Test void shouldReturn404WhenUserDoesNotExist(){
  ResponseEntity<Map> r=restTemplate.getForEntity("/api/users/99999",Map.class);
  assertEquals(HttpStatus.NOT_FOUND,r.getStatusCode()); assertEquals(404,r.getBody().get("status"));
 }
 @Test void shouldReturn409ForDuplicateEmail(){
  repository.save(new User("Prem","prem@example.com"));
  UserRequest q=new UserRequest(); q.setName("Another"); q.setEmail("prem@example.com");
  ResponseEntity<Map> r=restTemplate.postForEntity("/api/users",q,Map.class);
  assertEquals(HttpStatus.CONFLICT,r.getStatusCode()); assertEquals(409,r.getBody().get("status"));
 }
 @Test void shouldReturn400ForInvalidRequest(){
  UserRequest q=new UserRequest(); q.setName(""); q.setEmail("wrong");
  ResponseEntity<Map> r=restTemplate.postForEntity("/api/users",q,Map.class);
  assertEquals(HttpStatus.BAD_REQUEST,r.getStatusCode()); assertEquals(400,r.getBody().get("status"));
  assertTrue(String.valueOf(r.getBody().get("message")).contains("name"));
 }
 @Test void shouldSearchUsersAndReturn200(){
  repository.save(new User("Prem Kumar","prem@example.com")); repository.save(new User("Rahul","rahul@example.com"));
  ResponseEntity<Map[]> r=restTemplate.getForEntity("/api/users/search?name=prem",Map[].class);
  assertEquals(HttpStatus.OK,r.getStatusCode()); assertEquals(1,r.getBody().length);
 }
 @Test void shouldDeleteUserAndReturn204(){
  User u=repository.save(new User("Amit","amit@example.com"));
  ResponseEntity<Void> r=restTemplate.exchange("/api/users/"+u.getId(),HttpMethod.DELETE,null,Void.class);
  assertEquals(HttpStatus.NO_CONTENT,r.getStatusCode()); assertFalse(repository.existsById(u.getId()));
 }
 @Test void shouldReturn404WhenDeletingUnknownUser(){
  ResponseEntity<Map> r=restTemplate.exchange("/api/users/99999",HttpMethod.DELETE,null,Map.class);
  assertEquals(HttpStatus.NOT_FOUND,r.getStatusCode());
 }
}