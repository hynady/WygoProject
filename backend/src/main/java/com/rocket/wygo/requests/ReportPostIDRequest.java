package com.rocket.wygo.requests;

public class ReportPostIDRequest {
    public Long ReportPostId;

    public ReportPostIDRequest() {
    }

    public ReportPostIDRequest(Long reportPostId) {
        this.ReportPostId = reportPostId;
    }

    public Long getReportPostId() {
        return this.ReportPostId;
    }

    public void setReportPostId(Long reportPostId) {
        this.ReportPostId = reportPostId;
    }
}
