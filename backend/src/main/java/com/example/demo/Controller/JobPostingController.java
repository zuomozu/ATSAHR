package com.example.demo.Controller;


import com.example.demo.Entity.JobPosting;
import com.example.demo.Service.JobPostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobpostings")
public class JobPostingController {

    @Autowired
    private JobPostingService jobPostingService;

    @GetMapping
    public List<JobPosting> getAllJobPostings() {
        return jobPostingService.getAllJobPostings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobPosting> getJobPostingById(@PathVariable String id) {
        JobPosting jobPosting = jobPostingService.getJobPostingById(id);
        return jobPosting != null
                ? ResponseEntity.ok(jobPosting)
                : ResponseEntity.notFound().build();
    }

    @PostMapping("/addJob/")
    public ResponseEntity<JobPosting> createJobPosting(@RequestBody JobPosting jobPosting) {
        JobPosting createdJobPosting = jobPostingService.createJobPosting(jobPosting);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdJobPosting);
    }

    @PutMapping("/editJob/{id}")
    public ResponseEntity<JobPosting> updateJobPosting(@PathVariable String id, @RequestBody JobPosting jobPosting) {
        JobPosting updatedJobPosting = jobPostingService.updateJobPosting(jobPosting);
        if (updatedJobPosting == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedJobPosting, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobPosting(@PathVariable String id) {
        jobPostingService.deleteJobPosting(id);
        return ResponseEntity.noContent().build();
    }
}