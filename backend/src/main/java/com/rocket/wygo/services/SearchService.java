package com.rocket.wygo.services;

import com.rocket.wygo.models.Post;
import com.rocket.wygo.models.SimplePost;
import com.rocket.wygo.models.SimpleUser;
import com.rocket.wygo.models.User;
import com.rocket.wygo.repositories.PostRepository;
import com.rocket.wygo.repositories.UserRepository;
import com.rocket.wygo.response.CustomSearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public CustomSearchResponse search(String query) {
        List<User> users = userRepository.findByNameContainingOrUsernameContaining(query, query);
        List<Post> posts = postRepository.findByContentContaining(query);

        // Convert User objects to SimpleUser objects
        List<SimpleUser> simpleUsers = users.stream()
                .map(user -> new SimpleUser(user.getId(), user.getName(), user.getUsername(), user.getAvatar()))
                .collect(Collectors.toList());

        // Convert Post objects to SimplePost objects
        List<SimplePost> simplePosts = posts.stream()
                .map(post -> {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
                    String formattedDate = post.getPostTime().format(formatter);
                    return new SimplePost(post.getId(), new SimpleUser(post.getAuthor().getId(), post.getAuthor().getName(), post.getAuthor().getUsername(), post.getAuthor().getAvatar()), formattedDate, post.getContent());
                })
                .collect(Collectors.toList());

        CustomSearchResponse response = new CustomSearchResponse();
        response.setUsers(simpleUsers);
        response.setPosts(simplePosts);

        return response;
    }
}
