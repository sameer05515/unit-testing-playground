package com.example;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
@Testcontainers
public abstract class UserMySqlTestBase {
 @Container static final MySQLContainer<?> MYSQL=new MySQLContainer<>("mysql:8.4")
  .withDatabaseName("junitdb").withUsername("test").withPassword("test");
 @DynamicPropertySource static void configureDatabase(DynamicPropertyRegistry r){
  r.add("spring.datasource.url",MYSQL::getJdbcUrl);
  r.add("spring.datasource.username",MYSQL::getUsername);
  r.add("spring.datasource.password",MYSQL::getPassword);
  r.add("spring.datasource.driver-class-name",MYSQL::getDriverClassName);
  r.add("spring.jpa.hibernate.ddl-auto",()->"create-drop");
 }
}