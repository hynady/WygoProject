package com.rocket.wygo.models;

import jakarta.persistence.*;

@Entity
@Table(name = "admin")
public class Admin extends Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    private Integer addtribute1;

    @Override
    public Integer getId() {
        return id;
    }

    @Override
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAddtribute1() {
        return addtribute1;
    }

    public void setAddtribute1(Integer addtribute1) {
        this.addtribute1 = addtribute1;
    }
}
