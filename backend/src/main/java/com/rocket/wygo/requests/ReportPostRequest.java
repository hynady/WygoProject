package com.rocket.wygo.requests;

public class ReportPostRequest {
    Integer postId;
    Integer userReportedId;
    String reportType;

    public ReportPostRequest() {
    }

    public ReportPostRequest(Integer postId, Integer userReportedId, String reportType) {
        this.postId = postId;
        this.userReportedId = userReportedId;
        this.reportType = reportType;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public Integer getUserReportedId() {
        return userReportedId;
    }

    public void setUserReportedId(Integer userReportedId) {
        this.userReportedId = userReportedId;
    }

    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }
}
