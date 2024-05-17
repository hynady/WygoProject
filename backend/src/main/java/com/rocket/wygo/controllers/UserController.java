package com.rocket.wygo.controllers;

import com.rocket.wygo.exceptions.LoginFailedException;
import com.rocket.wygo.exceptions.UpdateInfoException;
import com.rocket.wygo.exceptions.UserAlreadyExistsException;
import com.rocket.wygo.exceptions.UserNotFoundException;
import com.rocket.wygo.models.User;
import com.rocket.wygo.requests.*;
import com.rocket.wygo.response.UserResponse;
import com.rocket.wygo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping ("/users")
public class UserController {
    @Autowired
    private UserService userService;
    @CrossOrigin(origins = "https://wygo-react-frontend.vercel.app")
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegistrationRequest registrationRequest) {
        try {
            userService.registerUser(registrationRequest.getName(), registrationRequest.getBirth(), registrationRequest.getGender(), registrationRequest.getUsername(), registrationRequest.getEmail(), registrationRequest.getPassword());
            return ResponseEntity.ok("Đăng ký thành công");
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<Map<String, Object>> getUserProfile(@PathVariable String username) {
        System.out.println(username);
        try {
            User user = userService.viewUserProfile(username);
            Map<String, Object> userProfile = new HashMap<>();

            userProfile.put("user", userService.convertToUserRes(user));
            userProfile.put("email", user.getEmail());
//            userProfile.put("favorListSize", user.getFavorList().size());
//            userProfile.put("disfavorListSize", user.getDisfavorList().size());
//            userProfile.put("befavoredListSize", user.getBefavoredList().size());
//            userProfile.put("bedisfavoredListSize", user.getBedisfavoredList().size());
//            userProfile.put("notificationListSize", user.getNotificationList().size());

            return ResponseEntity.ok(userProfile);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/user/{user}")
    public ResponseEntity<UserResponse> getUserByEmailOrUsername(@PathVariable String user) {
        try {
            UserResponse userRes = userService.checkUserExisted(user);
            return ResponseEntity.ok(userRes);
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @CrossOrigin(origins = "https://wygo-react-frontend.vercel.app")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest)
    {
        try {
            userService.login(loginRequest.getUsername(), loginRequest.getPassword());
            return ResponseEntity.ok("Đăng nhập thành công");
        } catch (LoginFailedException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/change-info")
    public  ResponseEntity<String> updateUserInfo(@RequestBody UpdateInfoRequest updateInfoRequest)
    {
        try {
            userService.updateUserInfo(updateInfoRequest.getUsername(), updateInfoRequest.getChangeType(), updateInfoRequest.getNewInfo());
            return ResponseEntity.ok("Thay đổi thông tin thành công!");
        } catch (UpdateInfoException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/upvote")
    public ResponseEntity<String> upvoteRequest(@RequestBody UpDownVoteRequest upVoteRequest) {
        try {
            userService.upvoteUser(upVoteRequest.getTargetUsername(), upVoteRequest.getAuthorUsername());
            return ResponseEntity.ok("Upvoted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/downvote")
    public ResponseEntity<String> downvoteRequest(@RequestBody UpDownVoteRequest downVoteRequest) {
        try {
            userService.downvoteUser(downVoteRequest.getTargetUsername(), downVoteRequest.getAuthorUsername());
            return ResponseEntity.ok("Downvoted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/hasUpvoted/{fromUser}/{toUser}")
    public ResponseEntity<Boolean> hasUpvoted(@PathVariable String fromUser, @PathVariable String toUser) {
        try {
            boolean hasUpvoted = userService.hasUpvoted(fromUser, toUser);
            return ResponseEntity.ok(hasUpvoted);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @GetMapping("/hasDownvoted/{fromUser}/{toUser}")
    public ResponseEntity<Boolean> hasDownvoted(@PathVariable String fromUser, @PathVariable String toUser) {
        try {
            boolean hasDownvoted = userService.hasDownvoted(fromUser, toUser);
            return ResponseEntity.ok(hasDownvoted);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("/status")
    public ResponseEntity<String> changeUserStatus(@RequestBody String username)
    {
        Logger LOGGER = Logger.getLogger(UserController.class.getName());

        // Bỏ ký tự đầu và ký tự cuối
        String trimmedUsername = username.substring(1, username.length() - 1);
        LOGGER.warning(trimmedUsername);

        try {
            userService.changeUserStatus(trimmedUsername);
            return ResponseEntity.ok().body("Thay đổi trạng thái thành công!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




//    @PostMapping("/{id}/enable")
//    public ResponseEntity<User> enableUser(@PathVariable Integer id) {
//        User user = userService.enableUser(id);
//        return ResponseEntity.ok(user);
//    }
//
//    @PostMapping("/{id}/disable")
//    public ResponseEntity<User> disableUser(@PathVariable Integer id) {
//        User user = userService.disableUser(id);
//        return ResponseEntity.ok(user);
//    }
}
