package com.example.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.Entity.Applicant;

import java.util.List;

public interface ApplicantRepository extends MongoRepository<Applicant, String> {

    // Find applicants by JOBID
    List<Applicant> findByJobPostingId(String jobPostingId);

    // Find applicants by status
    List<Applicant> findByApplicationDetailsStatus(String status);

    // Find applicants for a specific position
    List<Applicant> findByApplicationDetailsAppliedPosition(String position);

    // ... Add more query methods as needed
}