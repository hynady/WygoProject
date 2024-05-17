package com.rocket.wygo.services;

import com.rocket.wygo.exceptions.UserAlreadyExistsException;
import com.rocket.wygo.exceptions.UserNotFoundException;
import com.rocket.wygo.models.ReportUser;
import com.rocket.wygo.models.User;
import com.rocket.wygo.repositories.ReportUserRepository;
import com.rocket.wygo.repositories.UserRepository;
import com.rocket.wygo.response.ReportUserResponse;
import com.rocket.wygo.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReportUserService {
    @Autowired
    private ReportUserRepository reportUserRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void newReportUser(String authorUsername, String targetUsername, String reason) throws UserAlreadyExistsException {
        User authorObject = userRepository.findByUsername(authorUsername);
        User targetObject = userRepository.findByUsername(targetUsername);
        if (targetObject == null || authorObject == null) {
            throw new UserNotFoundException("Username không tìm thấy");
        }

        ReportUser reportUser = new ReportUser(authorObject, targetObject, reason);
        reportUserRepository.save(reportUser);
    }
    @Transactional
    public List<ReportUserResponse> getAllReportUsers()
    {
        List<ReportUser> reportUsers = reportUserRepository.findAll();
        List<ReportUserResponse> reportUserResponses = new ArrayList<>();
        for (ReportUser reportUser : reportUsers){
            reportUserResponses.add(convertToResponseObject(reportUser));
        }
        //abcd
        return reportUserResponses;
    }

    public ReportUserResponse convertToResponseObject(ReportUser reportUser)
    {
        ReportUserResponse response = new ReportUserResponse();
        response.setId(reportUser.getId());
        response.setAuthor(convertToUserRes(reportUser.getAuthor()));
        response.setReportObject(convertToUserRes(reportUser.getReportObject()));
        response.setReportType(reportUser.getReportType());
        return response;
    }

    public UserResponse convertToUserRes(User user)
    {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setName(user.getName());
        userResponse.setBirth(user.getBirth());
        userResponse.setHometown(user.getHometown());
        userResponse.setAvatar(user.getAvatar());
        userResponse.setGender(user.getGender());
        userResponse.setBio(user.getBio());
        userResponse.setAvailable(user.getAvailable());
        userResponse.setFavorListSize(user.getFavorList().size());
        userResponse.setDisfavorListSize(user.getDisfavorList().size());
        userResponse.setBefavoredListSize(user.getBefavoredList().size());
        userResponse.setBedisfavoredListSize(user.getBedisfavoredList().size());
        userResponse.setNotificationListSize(user.getNotificationList().size());
        return userResponse;
    }
}
