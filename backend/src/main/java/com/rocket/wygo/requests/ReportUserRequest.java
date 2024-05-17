package com.rocket.wygo.requests;

public class ReportUserRequest {
    private String authorUsername ;
    private String targetUsername;

    private String reason;

    public ReportUserRequest(String authorUsername, String targetUsername, String reason) {
        this.authorUsername = authorUsername;
        this.targetUsername = targetUsername;
        this.reason = reason;
    }

    public String getAuthorUsername() {
        return authorUsername;
    }

    public void setAuthorUsername(String authorUsername) {
        this.authorUsername = authorUsername;
    }

    public String getTargetUsername() {
        return targetUsername;
    }

    public void setTargetUsername(String targetUsername) {
        this.targetUsername = targetUsername;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
