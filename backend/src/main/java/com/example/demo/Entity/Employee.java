package com.example.demo.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;


import java.util.Date;
import java.util.List;

@Data
@Document(collection = "employees")
public class Employee {
    @Id
    private String id;
    @NotNull(message = "First name cannot be null")
    private String firstName;
    @NotNull(message = "Last Name cannot be null")
    private String lastName;
    @Pattern(regexp = "IT|ADMIN|FINANCE|HR", message = "Department must be one of: IT, ADMIN, FINANCE, HR")
    @NotNull(message = "Department cannot be null")
    private String department;
    @NotNull(message = "JobTilte cannot be null")
    private String jobTitle;
    @NotNull(message = "workEmail cannot be null")
    private String workEmail;
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number")
    private String workPhone;

    private PersonalDetails personalDetails;
    private List<EmploymentHistory> employmentHistory;
    private JobDetails jobDetails;
    private Payroll payroll;
    private TimeAndAttendance timeAndAttendance;
    private List<Documents> documents;
    private String status;

    @Data
    public static class PersonalDetails {
        @Past(message = "Date of birth must be in the past")
        @DateTimeFormat(pattern = "MM/dd/yyyy")
        private Date dateOfBirth;
        private String gender;
        private ContactInformation contactInformation;
        private EmergencyContact emergencyContact;

        @Data
        public static class ContactInformation {
            private String primary_emails;
            private List<String> emails;
            private String phone;
            private Address address;

            @Data
            public static class Address {
                private String street;
                private String city;
                private String state;
                private String postalCode;
                private String country;
            }
        }

        @Data
        public static class EmergencyContact {
            private String name;
            private String relationship;
            private String phone;
        }
    }

    @Data
    public static class EmploymentHistory {
        private String jobTitle;
        private String department;
        private Date startDate;
        private Date endDate;
        private Number salary;
        private List<SalaryIncrement> salaryIncrements;
        private List<Bonus> bonuses;

        @Data
        public static class SalaryIncrement {
            private Date effectiveDate;
            private Number newSalary;
            private String reason;
        }

        @Data
        public static class Bonus {
            private Date date;
            private Number amount;
            private String reason;
        }
    }

    @Data
    public static class JobDetails {
        private String employeeId;
        private String jobTitle;
        private String department;
        private Date startDate;
        private Date endDate;
        private String managerId; // Consider using @DBRef for a reference to another Employee
        private Number salary;
        private List<String> benefits;
        private List<String> performanceReviews; // Consider using @DBRef for references to PerformanceReview documents
    }

    @Data
    public static class Payroll {
        private String bankAccountNumber;
        private String taxId;
        private List<PayHistory> payHistory;

        @Data
        public static class PayHistory {
            private Date payPeriodStartDate;
            private Date payPeriodEndDate;
            private Number grossPay;
            private Deductions deductions;
            private Number netPay;

            @Data
            public static class Deductions {
                private Number taxes;
                private Number other;
            }
        }
    }

    @Data
    public static class TimeAndAttendance {
        private List<Timesheet> timesheets;
        private LeaveBalances leaveBalances;
        private List<LeaveRequest> leaveRequests;

        @Data
        public static class Timesheet {
            private Date weekStartDate;
            private Date weekEndDate;
            private List<DailyHours> dailyHours;
            public Boolean Status;

            @Data
            public static class DailyHours {
                private Date date;
                private Date checkIn;
                private Date checkOut;
                private Number breakDuration;
                private Number totalHours;
            }
        }

        @Data
        public static class LeaveBalances {
            private Number vacation;
            private Number sick;
            private Number personal;
        }

        @Data
        public static class LeaveRequest {
            private String leaveType;
            private Date startDate;
            private Date endDate;
            private String status;
            private String approverId;
        }
    }

    @Data
    public static class Documents {
        private String documentType;
        private String fileName;
        private Date uploadDate;
    }
}