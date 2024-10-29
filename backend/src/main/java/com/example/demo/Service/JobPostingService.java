package com.example.demo.Service;

import com.example.demo.Entity.JobPosting;
import com.example.demo.Repository.JobPostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class JobPostingService {

    @Autowired
    private JobPostingRepository jobPostingRepository;

    public List<JobPosting> getAllJobPostings() {
        return jobPostingRepository.findAll();
    }

    public JobPosting getJobPostingById(String id) {
        return jobPostingRepository.findById(id).orElse(null);

    }

    public JobPosting createJobPosting(JobPosting jobPosting) {
        jobPosting.setNumberOfApplicants(0);
        return jobPostingRepository.save(jobPosting);
    }

    public JobPosting updateJobPosting(JobPosting jobPosting) {

        return jobPostingRepository.save(jobPosting);
    }

    public void deleteJobPosting(String id) {
        jobPostingRepository.deleteById(id);
    }

    // Add other business logic methods as needed, e.g.,
    // - getJobPostingsByDepartment
    // - getJobPostingsByStatus
    // - closeJobPosting
    // - etc.
}