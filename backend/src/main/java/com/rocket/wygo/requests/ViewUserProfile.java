package com.rocket.wygo.requests;

public class ViewUserProfile {
    private String username;

    public ViewUserProfile(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

