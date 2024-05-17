package com.rocket.wygo.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "report_user")
public class ReportUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "author", nullable = false)
    private User author;

    @ManyToOne
    @JoinColumn(name = "report_object", nullable = false)
    private User reportObject;

    @Column(name = "report_type", nullable = false)
    private String reportType;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "resolved")
    private boolean resolved;

    public ReportUser() {
    }

    public ReportUser(User author, User reportObject, String reportType) {
        this.author = author;
        this.reportObject = reportObject;
        this.reportType = reportType;
        this.timestamp = LocalDateTime.now();
        this.resolved = false;
    }

    public boolean isResolved() {
        return resolved;
    }

    public void setResolved(boolean resolved) {
        this.resolved = resolved;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public User getReportObject() {
        return reportObject;
    }

    public void setReportObject(User reportObject) {
        this.reportObject = reportObject;
    }

    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
