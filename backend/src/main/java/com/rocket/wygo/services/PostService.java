package com.rocket.wygo.services;

import com.rocket.wygo.models.Comment;
import com.rocket.wygo.models.Post;
import com.rocket.wygo.models.User;
import com.rocket.wygo.repositories.CommentRepository;
import com.rocket.wygo.repositories.PostRepository;
import com.rocket.wygo.repositories.UserRepository;
import com.rocket.wygo.response.CommentDTO;
import com.rocket.wygo.response.PostResponse;
import com.rocket.wygo.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Console;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CommentRepository commentRepository;
    @Transactional
    public PostResponse getPostDetail(Integer postId)
    {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null)
        {
            throw new RuntimeException("Không tìm thấy bài viết!");
        }
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
    @Transactional
    public void changePostStatus(Integer postId)
    {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null)
        {
            throw new RuntimeException("Không tìm thấy bài viết!");
        }
        post.setAvailable(!post.getAvailable());
        postRepository.save(post);
    }

    @Transactional
    public void posting(String author, String content, String location, String media) throws Exception
    {
        System.out.println(author);
        User authorUser = userRepository.findByUsername(author);
        if (authorUser == null) {
            throw new Exception("Người dùng " + author + " không tồn tại");
        }
        Post post = new Post();
        post.setAuthor(authorUser);
        post.setContent(content);
        post.setLocation(location);
        post.setMedia(media);
        post.setAvailable(true);
        post.setPostTime(LocalDateTime.now());
        postRepository.save(post);
    }
    @Transactional
    public void addComment(Integer postId, String authorUsername, String content) {
        User author = userRepository.findByUsername(authorUsername);
        if (author == null) {
            throw new RuntimeException("Người dùng không tồn tại");
        }
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Bài viết không tồn tại"));

        Comment comment = new Comment();
        comment.setAuthor(author);
        comment.setContent(content);
        comment.setCommentTime(LocalDateTime.now());
        commentRepository.save(comment);

        // Lấy danh sách comment của post và thêm comment mới vào danh sách đó
        List<Comment> comments = post.getCommentList();
        comments.add(comment);
        // Cập nhật lại danh sách comment của post
        post.setCommentList(comments);
    }
    @Transactional
    public List<CommentDTO> getCommentsForPost(Integer postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Bài viết không tồn tại"));

        List<Comment> comments = post.getCommentList();
        List<CommentDTO> commentDTOs = new ArrayList<>();

        for (Comment comment : comments) {
            CommentDTO commentDTO = new CommentDTO();
            commentDTO.setAvatar(comment.getAuthor().getAvatar());
            commentDTO.setAuthorName(comment.getAuthor().getName());
            commentDTO.setContent(comment.getContent());
            commentDTO.setCommentTime(comment.getCommentTime());
            commentDTOs.add(commentDTO);
        }

        return commentDTOs;
    }

}
