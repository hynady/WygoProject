package com.rocket.wygo.response;

import java.util.List;

public class UserPostResponse {
    UserResponse user;
    List<PostResponse> posts;

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }

    public List<PostResponse> getPosts() {
        return posts;
    }

    public void setPosts(List<PostResponse> posts) {
        this.posts = posts;
    }
}