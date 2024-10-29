package com.example.demo.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "applicants")
public class Applicant {
    @Id
    private String id;
    private String jobPostingId;

    private PersonalDetails personalDetails;
    private ApplicationDetails applicationDetails;

    @Data
    public static class PersonalDetails {
        private String firstName;
        private String lastName;
        private Date dateOfBirth;
        private String gender;
        private ContactInformation contactInformation;

        @Data
        public static class ContactInformation {
            private String primary_emails;
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

    }

    @Data
    public static class ApplicationDetails {
        private String appliedPosition;
        private Date applicationDate;
        private FileDetails resume;
        private FileDetails coverLetter;
        private List<AdditionalDocument> additionalDocuments;
        private BackgroundCheck backgroundCheck;
        private String status;
        private List<Interview> interviews;
        private OfferLetter offerLetter;

        @Data
        public static class FileDetails {
            private String fileName;
            private Date uploadDate;
        }

        @Data
        public static class AdditionalDocument {
            private String documentType;
            private String fileName;
            private Date uploadDate;
        }

        @Data
        public static class BackgroundCheck {
            private String status;
            private FileDetails report;
        }

        @Data
        public static class Interview {
            private String interviewerId; // Consider using @DBRef for a reference to an Employee
            private Date date;
            private String feedback;
        }

        @Data
        public static class OfferLetter {
            private String fileName;
            private Date sentDate;
            private Date acceptedDate;
        }
    }
}