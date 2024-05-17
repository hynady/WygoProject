package com.rocket.wygo.response;

import com.rocket.wygo.models.Post;
import com.rocket.wygo.models.User;

import java.util.List;

public class SearchResultsRespond {
    private List<User> users;
    private List<Post> posts;

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }
}
