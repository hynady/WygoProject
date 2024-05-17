package com.rocket.wygo.response;

import java.time.LocalDateTime;

public class ReportPostResponse {
    private Long id;
    private UserResponse author;
    private PostResponse reportObject;
    private String reportType;

    private LocalDateTime reportTime;
    private boolean resolved;

    public LocalDateTime getReportTime() {
        return reportTime;
    }

    public void setReportTime(LocalDateTime reportTime) {
        this.reportTime = reportTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ReportPostResponse(Long id, UserResponse author, PostResponse reportObject, String reportType) {
        this.id = id;
        this.author = author;
        this.reportObject = reportObject;
        this.reportType = reportType;
    }

    public ReportPostResponse(Long id, UserResponse author, PostResponse reportObject, String reportType, LocalDateTime reportTime, boolean resolved) {
        this.id = id;
        this.author = author;
        this.reportObject = reportObject;
        this.reportType = reportType;
        this.reportTime = reportTime;
        this.resolved = resolved;
    }

    public ReportPostResponse() {
    }

    public UserResponse getAuthor() {
        return author;
    }

    public void setAuthor(UserResponse author) {
        this.author = author;
    }

    public PostResponse getReportObject() {
        return reportObject;
    }

    public void setReportObject(PostResponse reportObject) {
        this.reportObject = reportObject;
    }

    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public boolean isResolved() {
        return resolved;
    }

    public void setResolved(boolean resolved) {
        this.resolved = resolved;
    }
}
