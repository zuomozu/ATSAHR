package com.example.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.Entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    // Find applicants by JOBID
    List<User> findByRole(String role);
    User findByUsername (String username);



    // ... Add more query methods as needed
}