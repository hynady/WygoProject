package com.rocket.wygo.controllers;

import com.rocket.wygo.exceptions.UserAlreadyExistsException;
import com.rocket.wygo.requests.PostIdRequest;
import com.rocket.wygo.requests.ReportPostIDRequest;
import com.rocket.wygo.requests.ReportPostRequest;
import com.rocket.wygo.requests.ReportUserRequest;
import com.rocket.wygo.response.MessageResponse;
import com.rocket.wygo.response.ReportPostResponse;
import com.rocket.wygo.response.ReportUserResponse;
import com.rocket.wygo.services.ReportPostService;
import com.rocket.wygo.services.ReportUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/reports")
public class ReportController {
    @Autowired
    private ReportPostService reportPostService;
    @Autowired
    private ReportUserService reportUserService;
    @PostMapping("/post")
    public ResponseEntity<String> reportPost(@RequestBody ReportPostRequest reportPostRequest)
    {
        try {
            reportPostService.reportPost(reportPostRequest.getPostId(), reportPostRequest.getUserReportedId(), reportPostRequest.getReportType());
            return ResponseEntity.ok().body("Báo cáo bài viết thành công!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/post/resolve")
    public ResponseEntity<String> resolveReportPost(@RequestBody ReportPostIDRequest reportPostIDRequest) {
        try {
            Logger LOGGER = Logger.getLogger(ReportPostService.class.getName());
            LOGGER.warning(reportPostIDRequest.getReportPostId()+"");
            reportPostService.resolveReportPost(reportPostIDRequest.getReportPostId());
            return ResponseEntity.ok().body("Thay doi trang thai giai quyet thành công!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/post/{reportPostId}/get-post-id")
    public ResponseEntity<Integer> getPostIdFromReportId(@PathVariable Long reportPostId) {
        try {
            Logger LOGGER = Logger.getLogger(ReportPostService.class.getName());
            LOGGER.warning(reportPostId+"");
                Integer postId = reportPostService.getPostIdFromReportId(reportPostId);
            return ResponseEntity.ok(postId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/post/all")
    public ResponseEntity<List<ReportPostResponse>> getAllReportPosts() {
        try {
            List<ReportPostResponse> reportPosts = reportPostService.getAllReportPosts();
            return new ResponseEntity<>(reportPosts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/user")
    public ResponseEntity<String> reportUser(@RequestBody ReportUserRequest reportUserRequest) {
        try {
            reportUserService.newReportUser(reportUserRequest.getAuthorUsername(), reportUserRequest.getTargetUsername(), reportUserRequest.getReason());
            return ResponseEntity.ok("Báo cáo thành công");
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/user/all")
    public  ResponseEntity<List<ReportUserResponse>> getAllReportUsers()
    {
        try {
            return ResponseEntity.ok().body(reportUserService.getAllReportUsers());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
