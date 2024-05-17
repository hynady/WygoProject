package com.rocket.wygo.requests;

import java.util.Date;

public class RegistrationRequest {

    private String username;
    private String email;
    private String password;
    private String name; // Thêm trường tên
    private Date birth; // Thêm trường ngày sinh
    private String gender; // Thêm trường giới tính

    public RegistrationRequest() {
    }

    public RegistrationRequest(String username, String email, String password, String name, Date birth, String gender) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.name = name;
        this.birth = birth;
        this.gender = gender;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
