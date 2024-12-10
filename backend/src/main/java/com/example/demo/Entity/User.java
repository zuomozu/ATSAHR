package com.example.demo.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import java.util.Date;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    @NonNull
    private String username;
    @NonNull
    private String password;
    private String role;
    private Date lastLogin;

    // Default constructor
    public User() {
    }

    // Constructor with all fields
    public User(String username, String password) {
        this.username = username;
        this.password = password;

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}