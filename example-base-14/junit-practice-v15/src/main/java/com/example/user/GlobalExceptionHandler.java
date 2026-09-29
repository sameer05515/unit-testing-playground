package com.example.user;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.stream.Collectors;
@RestControllerAdvice
public class GlobalExceptionHandler {
 @ExceptionHandler(UserNotFoundException.class)
 ResponseEntity<ErrorResponse> notFound(UserNotFoundException e,HttpServletRequest r){return build(HttpStatus.NOT_FOUND,e.getMessage(),r);}
 @ExceptionHandler(DuplicateEmailException.class)
 ResponseEntity<ErrorResponse> duplicate(DuplicateEmailException e,HttpServletRequest r){return build(HttpStatus.CONFLICT,e.getMessage(),r);}
 @ExceptionHandler(MethodArgumentNotValidException.class)
 ResponseEntity<ErrorResponse> validation(MethodArgumentNotValidException e,HttpServletRequest r){
  String m=e.getBindingResult().getFieldErrors().stream().map(x->x.getField()+": "+x.getDefaultMessage()).collect(Collectors.joining(", "));
  return build(HttpStatus.BAD_REQUEST,m,r);
 }
 private ResponseEntity<ErrorResponse> build(HttpStatus s,String m,HttpServletRequest r){
  return ResponseEntity.status(s).body(new ErrorResponse(Instant.now(),s.value(),s.getReasonPhrase(),m,r.getRequestURI()));
 }
}