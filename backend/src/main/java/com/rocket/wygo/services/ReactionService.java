package com.rocket.wygo.services;

import com.rocket.wygo.models.Post;
import com.rocket.wygo.models.Reaction;
import com.rocket.wygo.models.User;
import com.rocket.wygo.repositories.PostRepository;
import com.rocket.wygo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReactionService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PostRepository postRepository;

    @Transactional
    public void react(String author, int postId) throws Exception {
        User authorUser = userRepository.findByUsername(author);
        if (authorUser == null) {
            throw new Exception("Người dùng " + author + " không tồn tại");
        }

        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            throw new Exception("Post không tồn tại");
        }

        Post post = optionalPost.get();
        Reaction existingReaction = post.getReactions().stream()
                .filter(reaction -> reaction.getAuthor().equals(authorUser))
                .findFirst()
                .orElse(null);

        if (existingReaction != null) {
            post.getReactions().remove(existingReaction);
        } else {
            Reaction reaction = new Reaction();
            reaction.setAuthor(authorUser);
            post.getReactions().add(reaction);
        }
        postRepository.save(post);
    }

    @Transactional(readOnly = true)
    public List<String> getReactionAuthorsByPostId(int postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + postId));

        return post.getReactions().stream()
                .map(reaction -> reaction.getAuthor().getUsername())
                .collect(Collectors.toList());
    }
}
