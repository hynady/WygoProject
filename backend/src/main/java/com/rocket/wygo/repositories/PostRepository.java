package com.rocket.wygo.repositories;

import com.rocket.wygo.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByAuthor_Username(String username);
    List<Post> findByContentContaining(String content);

}