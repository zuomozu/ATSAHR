package com.example.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.Entity.JobPosting;

import java.util.List;

public interface JobPostingRepository extends MongoRepository<JobPosting, String> {

    // Find job postings by department
    List<JobPosting> findByDepartment(String department);

    // ... Add more query methods as needed
}