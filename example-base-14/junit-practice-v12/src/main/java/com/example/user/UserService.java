package com.example.user;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class UserService {
 private final UserRepository repository;
 public UserService(UserRepository repository){this.repository=repository;}
 public User getUser(Long id){return repository.findById(id).orElseThrow(()->new UserNotFoundException(id));}
 public List<User> searchUsers(String name){return repository.findByNameContainingIgnoreCase(name);}
 public User createUser(String name,String email){
  if(repository.existsByEmail(email)) throw new DuplicateEmailException(email);
  try{return repository.save(new User(name,email));}
  catch(DataIntegrityViolationException ex){throw new DuplicateEmailException(email);}
 }
 public void deleteUser(Long id){
  if(!repository.existsById(id)) throw new UserNotFoundException(id);
  repository.deleteById(id);
 }
}