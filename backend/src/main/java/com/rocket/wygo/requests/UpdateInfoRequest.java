package com.rocket.wygo.requests;

public class UpdateInfoRequest {
    String username;
    String changeType;
    String newInfo;

    public UpdateInfoRequest() {
    }

    public UpdateInfoRequest(String username, String changeType, String newInfo) {
        this.username = username;
        this.changeType = changeType;
        this.newInfo = newInfo;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getChangeType() {
        return changeType;
    }

    public void setChangeType(String changeType) {
        this.changeType = changeType;
    }

    public String getNewInfo() {
        return newInfo;
    }

    public void setNewInfo(String newInfo) {
        this.newInfo = newInfo;
    }
}
