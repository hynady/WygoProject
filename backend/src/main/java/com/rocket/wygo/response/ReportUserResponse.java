package com.rocket.wygo.response;

public class ReportUserResponse {
    private Long id;
    private UserResponse author;
    private UserResponse reportObject;
    private String reportType;

    public ReportUserResponse() {
    }

    public ReportUserResponse(Long id, UserResponse author, UserResponse reportObject, String reportType) {
        this.id = id;
        this.author = author;
        this.reportObject = reportObject;
        this.reportType = reportType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserResponse getAuthor() {
        return author;
    }

    public void setAuthor(UserResponse author) {
        this.author = author;
    }

    public UserResponse getReportObject() {
        return reportObject;
    }

    public void setReportObject(UserResponse reportObject) {
        this.reportObject = reportObject;
    }

    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }
}