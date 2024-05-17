package com.rocket.wygo.controllers;

import com.rocket.wygo.requests.CommentRequest;
import com.rocket.wygo.requests.PostIdRequest;
import com.rocket.wygo.requests.PostRequest;
import com.rocket.wygo.response.CommentDTO;
import com.rocket.wygo.response.PostResponse;
import com.rocket.wygo.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping("/detail")
    public ResponseEntity<PostResponse> getPostDetail(@RequestBody PostIdRequest postIdRequest)
    {
        try {
            return ResponseEntity.ok(postService.getPostDetail(postIdRequest.getPostId()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PostMapping("/status")
    public ResponseEntity<String> changePostStatus(@RequestBody PostIdRequest postIdRequest)
    {
        try {
            postService.changePostStatus(postIdRequest.getPostId());
            return ResponseEntity.ok().body("Thay đổi trạng thái thành công!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/posting")
    public ResponseEntity<String> postingRequest(@RequestBody PostRequest postRequest)
    {
        try {
            postService.posting(postRequest.getAuthor(), postRequest.getContent()
                    , postRequest.getLocation(), postRequest.getMedia());
            return ResponseEntity.ok("Posting Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/comment")
    public ResponseEntity<String> addComment(@RequestBody CommentRequest commentRequest) {
        try {
            postService.addComment(commentRequest.getPostId(), commentRequest.getAuthorUsername(), commentRequest.getContent());
            return ResponseEntity.ok("Bình luận thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<CommentDTO>> getCommentsForPost(@PathVariable Integer postId) {
        try {
            List<CommentDTO> comments = postService.getCommentsForPost(postId);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
