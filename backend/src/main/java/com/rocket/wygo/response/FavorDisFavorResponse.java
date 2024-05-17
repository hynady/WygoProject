package com.rocket.wygo.response;

import java.util.List;

public class FavorDisFavorResponse {
    List<UserResponse> favorList;
    List<UserResponse> disfavorList;
    List<UserResponse> befavorList;

    public List<UserResponse> getFavorList() {
        return favorList;
    }

    public void setFavorList(List<UserResponse> favorList) {
        this.favorList = favorList;
    }

    public List<UserResponse> getDisfavorList() {
        return disfavorList;
    }

    public void setDisfavorList(List<UserResponse> disfavorList) {
        this.disfavorList = disfavorList;
    }

    public List<UserResponse> getBefavorList() {
        return befavorList;
    }

    public void setBefavorList(List<UserResponse> befavorList) {
        this.befavorList = befavorList;
    }

}
