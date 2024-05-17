package com.rocket.wygo.response;

import java.util.Date;

public class UserResponse {
    private Integer id;
    private String username;
    private String name;
    private Date birth;
    private String hometown;
    private String avatar;

    public UserResponse() {
    }

    private String gender;
    private String bio;
    private int favorListSize;
    private int disfavorListSize;

    public UserResponse(Integer id, String username, String name, Date birth, String hometown, String avatar, String gender, String bio, int favorListSize, int disfavorListSize, int befavoredListSize, int bedisfavoredListSize, int notificationListSize, Boolean available) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.birth = birth;
        this.hometown = hometown;
        this.avatar = avatar;
        this.gender = gender;
        this.bio = bio;
        this.favorListSize = favorListSize;
        this.disfavorListSize = disfavorListSize;
        this.befavoredListSize = befavoredListSize;
        this.bedisfavoredListSize = bedisfavoredListSize;
        this.notificationListSize = notificationListSize;
        this.available = available;
    }

    private int befavoredListSize;
    private int bedisfavoredListSize;
    private int notificationListSize;
    private Boolean available;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public String getHometown() {
        return hometown;
    }

    public void setHometown(String hometown) {
        this.hometown = hometown;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public int getFavorListSize() {
        return favorListSize;
    }

    public void setFavorListSize(int favorListSize) {
        this.favorListSize = favorListSize;
    }

    public int getDisfavorListSize() {
        return disfavorListSize;
    }

    public void setDisfavorListSize(int disfavorListSize) {
        this.disfavorListSize = disfavorListSize;
    }

    public int getBefavoredListSize() {
        return befavoredListSize;
    }

    public void setBefavoredListSize(int befavoredListSize) {
        this.befavoredListSize = befavoredListSize;
    }

    public int getBedisfavoredListSize() {
        return bedisfavoredListSize;
    }

    public void setBedisfavoredListSize(int bedisfavoredListSize) {
        this.bedisfavoredListSize = bedisfavoredListSize;
    }

    public int getNotificationListSize() {
        return notificationListSize;
    }

    public void setNotificationListSize(int notificationListSize) {
        this.notificationListSize = notificationListSize;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
