package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @SuppressWarnings("unused")
    @GetMapping("/test")
    public String testConnection() {
        if (mongoTemplate.getDb() != null) {
            return "Connected to MongoDB!";
        } 
        else {
            return "Failed to connect to MongoDB.";
        }
    }
}