package com.rocket.wygo.models;

import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table(name = "test")
public class Test {
    @Id
    private Integer id;
    private String s;

    public Test(String s) {
        this.s = s;
    }

    public Test() {


    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getS() {
        return s;
    }

    public void setS(String s) {
        this.s = s;
    }
}

