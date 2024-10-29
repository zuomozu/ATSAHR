package com.example.demo.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import java.util.Date;

@Data
@Document(collection = "auditLogs")
public class AuditLog {
    @Id
    private String id;

    @NonNull
    private String action;
    @NonNull
    private Date timestamp;
    @DBRef
    private Employee user;
    private String details;
}