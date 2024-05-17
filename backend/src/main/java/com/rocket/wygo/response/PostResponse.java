package com.rocket.wygo.response;

import java.time.LocalDateTime;

public class PostResponse {
    private Integer id;

    private UserResponse author ;
    private LocalDateTime postTime;
    private String content;
    private String location;
    private String media;
    private Integer reaction;
    private Integer comment;

    private Boolean available;

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public PostResponse() {
    }

    public PostResponse(Integer id, UserResponse author, LocalDateTime postTime, String content, String location, String media, Integer reaction, Integer comment, Boolean available) {
        this.id = id;
        this.author = author;
        this.postTime = postTime;
        this.content = content;
        this.location = location;
        this.media = media;
        this.reaction = reaction;
        this.comment = comment;
        this.available = available;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserResponse getAuthor() {
        return author;
    }

    public void setAuthor(UserResponse author) {
        this.author = author;
    }

    public LocalDateTime getPostTime() {
        return postTime;
    }

    public void setPostTime(LocalDateTime postTime) {
        this.postTime = postTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getMedia() {
        return media;
    }

    public void setMedia(String media) {
        this.media = media;
    }

    public Integer getReaction() {
        return reaction;
    }

    public void setReaction(Integer reaction) {
        this.reaction = reaction;
    }

    public Integer getComment() {
        return comment;
    }

    public void setComment(Integer comment) {
        this.comment = comment;
    }
}
