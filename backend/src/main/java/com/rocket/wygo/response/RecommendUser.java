package com.rocket.wygo.response;

public class RecommendUser {
    private String username;
    private String name;
    private String avatar;

    public RecommendUser() {
    }

    public RecommendUser(String username, String name, String avatar) {
        this.username = username;
        this.name = name;
        this.avatar = avatar;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
