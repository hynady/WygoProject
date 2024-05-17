package com.rocket.wygo.services;

import com.rocket.wygo.models.Post;
import com.rocket.wygo.models.User;
import com.rocket.wygo.repositories.PostRepository;
import com.rocket.wygo.repositories.UserRepository;
import com.rocket.wygo.response.PostResponse;
import com.rocket.wygo.response.RecommendUser;
import com.rocket.wygo.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class HomePageService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PostRepository postRepository;

    @Transactional
    public List<RecommendUser> getRecommendUser(String username){
        User user = userRepository.findByUsername(username);

        List<RecommendUser> recommendUsers = new ArrayList<>();
        List<User> favorList = user.getFavorList();
        Collections.shuffle(favorList);

        for (User favorUser: favorList){
            RecommendUser recommendUser = new RecommendUser(favorUser.getUsername(),
                    favorUser.getName(), favorUser.getAvatar());
            recommendUsers.add(recommendUser);
            if (recommendUsers.size()>7){
                break;
            }
        }

        return recommendUsers;
    }

    @Transactional
    public List<PostResponse> getRecommendPost(String username, String time){
        LocalDateTime timeLimit = LocalDateTime.parse(time, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"));
        User user = userRepository.findByUsername(username);

        List<PostResponse> post = new ArrayList<>();
        List<User> favorList = user.getFavorList();

        int maxPost = 3;
        if (favorList.size()>5){
            maxPost = 2;
        }
        if (favorList.size()>9){
            maxPost = 1;
        }

        for (User favorUser: favorList){
            List<Post> userPost = postRepository.findByAuthor_Username(favorUser.getUsername());
            Collections.sort(userPost, new Comparator<Post>() {
                @Override
                public int compare(Post post1, Post post2) {
                    return post2.getPostTime().compareTo(post1.getPostTime());
                }
            });
            int numPost = 0;
            for (Post postUser : userPost){
                if (postUser.getPostTime().isBefore(timeLimit) && postUser.getAvailable()){
                    post.add(convertToPostResponse(postUser));
                    numPost++;
                }
                if (numPost>=maxPost){
                    break;
                }
            }
        }
        int numGet = Math.min(post.size(), 10);
        return post.subList(0,numGet);
    }
    public PostResponse convertToPostResponse(Post post){
        PostResponse postResponse = new PostResponse();
        postResponse.setId(post.getId());
        postResponse.setPostTime(post.getPostTime());
        UserResponse userRes = new UserResponse(
                post.getAuthor().getId(), post.getAuthor().getUsername(),post.getAuthor().getName() ,post.getAuthor().getBirth(), post.getAuthor().getHometown(),
                post.getAuthor().getAvatar(), post.getAuthor().getGender(), post.getAuthor().getBio(),
                post.getAuthor().getFavorList().size(), post.getAuthor().getDisfavorList().size(),
                post.getAuthor().getBefavoredList().size(), post.getAuthor().getBedisfavoredList().size(),
                post.getAuthor().getNotificationList().size(), post.getAuthor().getAvailable());
        postResponse.setAuthor(userRes);
        postResponse.setContent(post.getContent());
        postResponse.setLocation(post.getLocation());
        postResponse.setComment(post.getCommentList().size());
        postResponse.setMedia(post.getMedia());
        postResponse.setReaction(post.getReactions().size());
        return postResponse;
    }
}
