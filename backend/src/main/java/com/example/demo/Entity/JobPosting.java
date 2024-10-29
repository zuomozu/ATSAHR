package com.example.demo.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "jobPostings")
public class JobPosting {
    @Id
    private String id;

    @NotNull
    private String jobRole;

    @NotNull
    private Department department;
    private int numberOfApplicants = 0;
    private String location;
    private String description;
    private List<String> requirements;
    private SalaryRange salaryRange;

    @CreatedDate
    private Date postingDate;

    @NotNull
    @Future
    private Date startingDate;

    @NotNull
    @Future
    private Date closingDate;

    @Min(1)
    private int numberOfPositions;

    private int filled;
    private int vacant;

    @NotNull
    private WorkMode mode;

    @NotNull
    private JobType type;

    @NotNull
    private PayType payType;

    @DBRef
    private List<Employee> hiringManagers;

    @DBRef
    private List<Employee> talentAcquisitionTeam;

    private List<String> requiredSkills;
    private List<String> preferredSkills;
    private List<String> applicantIds;

    private JobStatus status;

    @LastModifiedDate
    private Date lastModifiedDate;

    private boolean isActive = true;

    public enum Department {
        IT, ADMIN, FINANCE, HR, SALES, MARKETING, OPERATIONS
    }

    public enum WorkMode {
        HYBRID, REMOTE, IN_PERSON
    }

    public enum JobType {
        FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP
    }

    public enum PayType {
        HOURLY, BIWEEKLY, MONTHLY, WEEKLY
    }

    public enum JobStatus {
        DRAFT, OPEN, CLOSED, ON_HOLD
    }

    @Data
    public static class SalaryRange {
        private Number min;
        private Number max;
    }

    public int getNumberOfApplicants() {
        return numberOfApplicants;
    }

    public void setNumberOfApplicants(int numberOfApplicants) {
        this.numberOfApplicants = numberOfApplicants;
    }
}