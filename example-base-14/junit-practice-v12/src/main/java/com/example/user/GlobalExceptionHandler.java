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
 ResponseEntity<ErrorResponse> notFound(UserNotFoundException ex,HttpServletRequest r){return build(HttpStatus.NOT_FOUND,ex.getMessage(),r);}
 @ExceptionHandler(DuplicateEmailException.class)
 ResponseEntity<ErrorResponse> duplicate(DuplicateEmailException ex,HttpServletRequest r){return build(HttpStatus.CONFLICT,ex.getMessage(),r);}
 @ExceptionHandler(MethodArgumentNotValidException.class)
 ResponseEntity<ErrorResponse> validation(MethodArgumentNotValidException ex,HttpServletRequest r){
  String msg=ex.getBindingResult().getFieldErrors().stream().map(e->e.getField()+": "+e.getDefaultMessage()).collect(Collectors.joining(", "));
  return build(HttpStatus.BAD_REQUEST,msg,r);
 }
 private ResponseEntity<ErrorResponse> build(HttpStatus s,String msg,HttpServletRequest r){
  return ResponseEntity.status(s).body(new ErrorResponse(Instant.now(),s.value(),s.getReasonPhrase(),msg,r.getRequestURI()));
 }
}