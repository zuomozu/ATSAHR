package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Applicant;

import com.example.demo.Entity.JobPosting;
import com.example.demo.Repository.ApplicantRepository;


import com.example.demo.Repository.JobPostingRepository;

import java.util.List;
import java.util.Optional;

@Service

public class ApplicantService {

    @Autowired
    private ApplicantRepository applicantRepository;
    @Autowired
    private JobPostingService JobPostingService;
    JobPosting jobPosting = new JobPosting();
    private final JobPostingRepository jobPostingRepository;

    @Autowired
    public ApplicantService(ApplicantRepository applicantRepository, JobPostingRepository jobPostingRepository) {
        this.applicantRepository = applicantRepository;
        this.jobPostingRepository = jobPostingRepository;
    }

    public Applicant createApplicant(Applicant applicant, String jobPostingId) {
        Optional<JobPosting> jobPostingOptional = jobPostingRepository.findById(jobPostingId);
        System.out.println("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");

        if (jobPostingOptional.isPresent()) {
            JobPosting jobPosting = jobPostingOptional.get();

            // Increment the number of applicants
            int currentNumber = jobPosting.getNumberOfApplicants();
            jobPosting.setNumberOfApplicants(currentNumber + 1);

            // Save the updated job posting back to the repository
            JobPostingService.updateJobPosting(jobPosting);

            // Print the updated number of applicants for this job posting
            System.out.println("Updated number of applicants: " + jobPosting.getNumberOfApplicants());
        } else {
            // Handle the case when the job posting is not found
            System.out.println("Job posting not found with ID: " + jobPostingId);
            // You might want to throw an exception here or handle it appropriately
        }

        return applicantRepository.save(applicant);
    }

    public Optional<Applicant> getApplicant(String id) {
        return applicantRepository.findById(id);
    }

    public List<Applicant> getAllApplicants() {
        return applicantRepository.findAll();
    }

    // Delete
    public void deleteApplicants(String id) {
        applicantRepository.deleteById(id);
    }

}