package com.rocket.wygo.models;

public class SimplePost {
    private Integer id;
    private SimpleUser author;
    private String formattedDate;
    private String content;

    public SimplePost(Integer id, SimpleUser author, String formattedDate, String content) {
        this.id = id;
        this.author = author;
        this.formattedDate = formattedDate;
        this.content = content;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public SimpleUser getAuthor() {
        return author;
    }

    public void setAuthor(SimpleUser author) {
        this.author = author;
    }

    public String getFormattedDate() {
        return formattedDate;
    }

    public void setFormattedDate(String formattedDate) {
        this.formattedDate = formattedDate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
