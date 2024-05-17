package com.rocket.wygo.models;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "user")
public class User extends Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    private Date birth;
    private String hometown;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private String avatar;

    private String gender;
    private String bio;
    @OneToMany
    private List<User> favorList;
    @OneToMany
    private List<User> disfavorList;
    @OneToMany
    private List<User> befavoredList;
    @OneToMany
    private List<User> bedisfavoredList;
    @OneToMany
    private List<Notification> notificationList;
    private Boolean available;

    @Override
    public Integer getId() {
        return id;
    }

    @Override
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

    public List<User> getFavorList() {
        return favorList;
    }

    public void setFavorList(List<User> favorList) {
        this.favorList = favorList;
    }

    public List<User> getDisfavorList() {
        return disfavorList;
    }

    public void setDisfavorList(List<User> disfavorList) {
        this.disfavorList = disfavorList;
    }

    public List<User> getBefavoredList() {
        return befavoredList;
    }

    public void setBefavoredList(List<User> befavoredList) {
        this.befavoredList = befavoredList;
    }

    public List<User> getBedisfavoredList() {
        return bedisfavoredList;
    }

    public void setBedisfavoredList(List<User> bedisfavoredList) {
        this.bedisfavoredList = bedisfavoredList;
    }

    public List<Notification> getNotificationList() {
        return notificationList;
    }

    public void setNotificationList(List<Notification> notificationList) {
        this.notificationList = notificationList;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public User(){
        super();
    }
    public User(String name, Date birth, String gender, String username,String email, String password) {
        super();
        this.setUsername(username);
        this.setPassword(password);
        this.setBirth(birth);
        this.setGender(gender);
        this.setName(name);
        this.setEmail(email);
        this.setRegisterDate(new Date());
        this.available=true;
    }

}

