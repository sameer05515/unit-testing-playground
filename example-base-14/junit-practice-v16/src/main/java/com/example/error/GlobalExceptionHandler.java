package com.example.error;

import com.example.user.DuplicateEmailException;
import com.example.user.UserNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    ResponseEntity<ErrorResponse> notFound(
            UserNotFoundException ex,HttpServletRequest req){
        return build(HttpStatus.NOT_FOUND,ex.getMessage(),req);
    }

    @ExceptionHandler(DuplicateEmailException.class)
    ResponseEntity<ErrorResponse> duplicate(
            DuplicateEmailException ex,HttpServletRequest req){
        return build(HttpStatus.CONFLICT,ex.getMessage(),req);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ErrorResponse> validation(
            MethodArgumentNotValidException ex,HttpServletRequest req){
        String message=ex.getBindingResult().getFieldErrors().stream()
            .map(e->e.getField()+": "+e.getDefaultMessage())
            .collect(Collectors.joining(", "));
        return build(HttpStatus.BAD_REQUEST,message,req);
    }

    private ResponseEntity<ErrorResponse> build(
            HttpStatus status,String message,HttpServletRequest req){
        return ResponseEntity.status(status).body(
            new ErrorResponse(
                Instant.now(),status.value(),
                status.getReasonPhrase(),message,req.getRequestURI()));
    }
}