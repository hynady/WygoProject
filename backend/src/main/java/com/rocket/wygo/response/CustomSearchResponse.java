package com.rocket.wygo.response;

import com.rocket.wygo.models.SimplePost;
import com.rocket.wygo.models.SimpleUser;
import com.rocket.wygo.models.User;
import com.rocket.wygo.models.Post;

import java.util.List;

public class CustomSearchResponse {
    private List<SimpleUser> users;
    private List<SimplePost> posts;

    public List<SimpleUser> getUsers() {
        return users;
    }

    public void setUsers(List<SimpleUser> users) {
        this.users = users;
    }

    public List<SimplePost> getPosts() {
        return posts;
    }

    public void setPosts(List<SimplePost> posts) {
        this.posts = posts;
    }
}




