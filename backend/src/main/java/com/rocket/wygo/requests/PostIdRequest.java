package com.rocket.wygo.requests;

import jakarta.persistence.criteria.CriteriaBuilder;

public class PostIdRequest {
    Integer postId;

    public PostIdRequest() {
    }

    public PostIdRequest(Integer postId) {
        this.postId = postId;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }
}
