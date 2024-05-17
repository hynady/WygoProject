package com.rocket.wygo.services;

import com.rocket.wygo.models.Post;
import com.rocket.wygo.models.User;
import com.rocket.wygo.repositories.PostRepository;
import com.rocket.wygo.repositories.UserRepository;
import com.rocket.wygo.response.FavorDisFavorResponse;
import com.rocket.wygo.response.PostResponse;
import com.rocket.wygo.response.UserPostResponse;
import com.rocket.wygo.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ViewPersonalPageService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PostRepository postRepository;

    public UserPostResponse viewPersonalPage(String username) throws Exception {
        User user = userRepository.findByUsername(username);
        List<Post> postList = postRepository.findByAuthor_Username(username);
        if (user == null) {
            throw new Exception("Người dùng " + username + " không tồn tại");
        }
        UserResponse userRes = new UserResponse(
                user.getId(), user.getUsername(), user.getName() ,user.getBirth(), user.getHometown(),
                user.getAvatar(), user.getGender(), user.getBio(),
                user.getFavorList().size(), user.getDisfavorList().size(),
                user.getBefavoredList().size(), user.getBedisfavoredList().size(),
                user.getNotificationList().size(), user.getAvailable());
        List<PostResponse> postDTOList = new ArrayList<>();
        for (Post post : postList) {
            PostResponse postDTO = new PostResponse(
                    post.getId(), userRes, post.getPostTime(),
                    post.getContent(), post.getLocation(), post.getMedia(),
                    post.getReactions().size(),post.getCommentList().size(), post.getAvailable() );
            postDTOList.add(postDTO);
        }
        UserPostResponse userPostDTO = new UserPostResponse();
        userPostDTO.setUser(userRes);
        userPostDTO.setPosts(postDTOList);
        return userPostDTO;
    }

    public FavorDisFavorResponse getFavorDisfavorList(String username) throws Exception{

        FavorDisFavorResponse list = new FavorDisFavorResponse();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new Exception("Người dùng " + username + " không tồn tại");
        }

        List<UserResponse> favorList = new ArrayList<>();
        for (User favorUser : user.getFavorList()) {
            UserResponse userResponse = convertToUserResponse(favorUser);
            favorList.add(userResponse);
        }
        list.setFavorList(favorList);

        List<UserResponse> befavorList = new ArrayList<>();
        for (User befavorUser : user.getBefavoredList()) {
            UserResponse userResponse = convertToUserResponse(befavorUser);
            befavorList.add(userResponse);
        }
        list.setBefavorList(befavorList);

        List<UserResponse> disfavorList = new ArrayList<>();
        for (User disfavorUser : user.getDisfavorList()) {
            UserResponse userResponse = convertToUserResponse(disfavorUser);
            disfavorList.add(userResponse);
        }
        list.setDisfavorList(disfavorList);

        return list;
    }

    private UserResponse convertToUserResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setName(user.getName());
        userResponse.setBirth(user.getBirth());
        userResponse.setHometown(user.getHometown());
        userResponse.setAvatar(user.getAvatar());
        userResponse.setGender(user.getGender());
        userResponse.setBio(user.getBio());
        userResponse.setFavorListSize(user.getFavorList().size());
        userResponse.setDisfavorListSize(user.getDisfavorList().size());
        userResponse.setBefavoredListSize(user.getBefavoredList().size());
        userResponse.setBedisfavoredListSize(user.getBedisfavoredList().size());
        userResponse.setNotificationListSize(user.getNotificationList().size());
        userResponse.setAvailable(user.getAvailable());
        return userResponse;
    }
}
