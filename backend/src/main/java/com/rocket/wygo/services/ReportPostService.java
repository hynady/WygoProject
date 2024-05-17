package com.rocket.wygo.services;

import com.rocket.wygo.models.Post;
import com.rocket.wygo.models.ReportPost;
import com.rocket.wygo.models.User;
import com.rocket.wygo.repositories.PostRepository;
import com.rocket.wygo.repositories.ReportPostRepository;
import com.rocket.wygo.repositories.UserRepository;
import com.rocket.wygo.response.PostResponse;
import com.rocket.wygo.response.ReportPostResponse;
import com.rocket.wygo.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Service
public class ReportPostService {
    @Autowired
    ReportPostRepository reportPostRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PostRepository postRepository;
    @Transactional
    public void reportPost(Integer postId, Integer userReportedId, String reportType)
    {
        User userReport = userRepository.findById(userReportedId).orElse(null);
        if (userReport == null)
        {
            throw new RuntimeException("Gửi báo cáo thất bại, không tìm thấy người dùng!");
        }
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null)
        {
            throw new RuntimeException("Gửi báo cáo thất bại, không tìm thấy bài viết!");
        }
        if (reportType.trim().isBlank()){
            throw new RuntimeException("Không được để trống lý do!");
        }
        ReportPost reportPost = new ReportPost(userReport, post, reportType);
        reportPostRepository.save(reportPost);
    }
    @Transactional
    public List<ReportPostResponse> getAllReportPosts() {
        List<ReportPost> reportPosts = reportPostRepository.findAll();
        List<ReportPostResponse> reportPostDTOs = new ArrayList<>();
        for (ReportPost reportPost : reportPosts) {
            ReportPostResponse reportPostDTO = new ReportPostResponse();
            reportPostDTO.setId(reportPost.getId());
            reportPostDTO.setReportType(reportPost.getReportType());

            User reportAuthor = reportPost.getAuthor();
            UserResponse reportAuthorDTO = new UserResponse(
                    reportAuthor.getId(), reportAuthor.getUsername() , reportAuthor.getName() ,reportAuthor.getBirth(), reportAuthor.getHometown(),
                    reportAuthor.getAvatar(), reportAuthor.getGender(), reportAuthor.getBio(),
                    reportAuthor.getFavorList().size(), reportAuthor.getDisfavorList().size(),
                    reportAuthor.getBefavoredList().size(), reportAuthor.getBedisfavoredList().size(),
                    reportAuthor.getNotificationList().size(), reportAuthor.getAvailable());

            reportPostDTO.setAuthor(reportAuthorDTO);

            Post reportObject = reportPost.getReportObject();
            User authorPost = reportObject.getAuthor();
            UserResponse postAuthorDTO = new UserResponse(
                    authorPost.getId(), authorPost.getUsername() , authorPost.getName(),authorPost.getBirth(), authorPost.getHometown(),
                    authorPost.getAvatar(), authorPost.getGender(), authorPost.getBio(),
                    authorPost.getFavorList().size(), authorPost.getDisfavorList().size(),
                    authorPost.getBefavoredList().size(), authorPost.getBedisfavoredList().size(),
                    authorPost.getNotificationList().size(), authorPost.getAvailable());
            PostResponse postDTO = new PostResponse( reportObject.getId(), postAuthorDTO, reportObject.getPostTime(),
                    reportObject.getContent(), reportObject.getLocation(), reportObject.getMedia(),
                    reportObject.getCommentList().size(), reportObject.getReactions().size(),
                    reportObject.getAvailable());
            reportPostDTO.setReportObject(postDTO);
            reportPostDTO.setReportTime(reportPost.getTimestamp());
            reportPostDTO.setResolved(reportPost.isResolved());
            reportPostDTOs.add(reportPostDTO);
        }

        return reportPostDTOs;
    }
    @Transactional
    public void resolveReportPost(Long postId) {
        ReportPost reportPost = reportPostRepository.findById(postId).orElse(null);
        Logger LOGGER = Logger.getLogger(ReportPostService.class.getName());
        LOGGER.warning(reportPost.getId()+"");
        if (reportPost == null)
        {
            throw new RuntimeException("Không tìm thấy bài viết!");
        }
        reportPost.setResolved(!reportPost.isResolved());
        reportPostRepository.save(reportPost);
    }
    @Transactional
    public Integer getPostIdFromReportId(Long reportPostId) {
        ReportPost reportPost = reportPostRepository.findById(reportPostId)
                .orElseThrow(() -> new RuntimeException("Report post not found"));
        return reportPost.getReportObject().getId();
    }
}
