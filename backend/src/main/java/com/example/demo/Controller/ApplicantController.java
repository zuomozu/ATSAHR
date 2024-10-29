package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import com.example.demo.Entity.Applicant;

import com.example.demo.Service.ApplicantService;

import java.util.List;

@RestController
@RequestMapping("/api/applicants")
public class ApplicantController {
    @Autowired
    private ApplicantService applicantService;

    @GetMapping
    public ResponseEntity<List<Applicant>> getAllApplicants() {
        List<Applicant> applicants = applicantService.getAllApplicants();
        return new ResponseEntity<>(applicants, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Applicant> createApplicant(@RequestBody Applicant applicant,
            @RequestParam String jobPostingId) {
        Applicant createdApplicant = applicantService.createApplicant(applicant, jobPostingId);
        return new ResponseEntity<>(createdApplicant, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplicants(@PathVariable String id) {
        applicantService.deleteApplicants(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}