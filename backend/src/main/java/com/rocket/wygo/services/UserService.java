package com.rocket.wygo.services;

import com.rocket.wygo.exceptions.LoginFailedException;
import com.rocket.wygo.exceptions.UpdateInfoException;
import com.rocket.wygo.exceptions.UserAlreadyExistsException;
import com.rocket.wygo.exceptions.UserNotFoundException;
import com.rocket.wygo.models.Post;
import com.rocket.wygo.models.User;
import com.rocket.wygo.repositories.UserRepository;
import com.rocket.wygo.response.UserDTO;
import com.rocket.wygo.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    UserUpdaterService userUpdaterService;

    @Transactional
    public void registerUser(String name, Date birth, String gender, String username, String email, String password) throws UserAlreadyExistsException {
        User existingUser = userRepository.findByUsername(username);
        if (existingUser != null) {
            throw new UserAlreadyExistsException("Username đã được sử dụng");
        }

        existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            throw new UserAlreadyExistsException("Email đã được sử dụng");
        }

        User user = new User(name, birth, gender, username, email, password); // Tạo mới đối tượng User với các trường mới
        userRepository.save(user);
    }

    @Transactional
    public User viewUserProfile(String username) throws UserNotFoundException {
        User targetUser = userRepository.findByUsername(username);
        if (targetUser == null) {
            throw new UserNotFoundException("Người dùng không tồn tại");
        }
        return targetUser;
    }

    @Transactional
    public void login(String username, String password) throws LoginFailedException {
        if (username.isBlank() || password.isBlank()){
            throw new LoginFailedException("Không được để trống trường thông tin!");
        }
        if (username.contains("@"))
        {
            User loginUser = userRepository.findByEmail(username);
            checkLoginUser(loginUser, password);
        }
        else
        {
            User loginUser = userRepository.findByUsername(username);
            checkLoginUser(loginUser, password);
        }
    }
    public void checkLoginUser(User loginUser, String password)
    {
        if (loginUser != null)
        {
            if (loginUser.getPassword().equals(password))
            {
                return;
            }
            throw new LoginFailedException("Mật khẩu không khớp!");
        }
        throw new LoginFailedException("Không tìm thấy người dùng!");
    }
    @Transactional
    public void updateUserInfo(String username, String changeType, String newInfo) throws UpdateInfoException
    {
        try {
            if (newInfo.trim().isBlank()){
                throw new UpdateInfoException("Không được để trống trường thông tin!");
            }
            switch (changeType) {
                case "avatar":
                    userUpdaterService.changeAvatar(username, newInfo);
                    break;
                case "bio":
                    userUpdaterService.changeBio(username, newInfo);
                    break;
                case "name":
                    userUpdaterService.changeName(username, newInfo);
                    break;
                case "gender":
                    userUpdaterService.changeGender(username, newInfo);
                    break;
                case "birth":
                    userUpdaterService.changeBirth(username, newInfo);
                    break;
                case "address":
                    userUpdaterService.changeAddress(username, newInfo);
                    break;
                case "username":
                    userUpdaterService.changeUsername(username, newInfo);
                    break;
                case "email":
                    userUpdaterService.changeEmail(username, newInfo);
                    break;
                case "password":
                    userUpdaterService.changePassword(username, newInfo);
                    break;
            }
        } catch (UpdateInfoException e) {
            throw e;
        }
    }

    @Transactional
    public void upvoteUser(String targetUsername, String authorUsername) throws Exception {
        User targetUser = userRepository.findByUsername(targetUsername);
        User authorUser = userRepository.findByUsername(authorUsername);

        if (targetUser == null) {
            throw new Exception("Người dùng " + targetUsername + " không tồn tại");
        }
        if (authorUser == null) {
            throw new Exception("Người dùng " + authorUsername + " không tồn tại");
        }

        // Kiểm tra xem đã upvote trước đó hay chưa
        boolean hasUpvoted = targetUser.getBefavoredList().contains(authorUser);

        if (hasUpvoted) {
            // Nếu đã upvote trước đó, hãy xóa upvote
            targetUser.getBefavoredList().remove(authorUser);
            authorUser.getFavorList().remove(targetUser);
        } else {
            // Nếu chưa upvote, hãy thêm upvote
            targetUser.getBefavoredList().add(authorUser);
            authorUser.getFavorList().add(targetUser);
        }

        // Lưu thay đổi vào cơ sở dữ liệu
        userRepository.save(targetUser);
        userRepository.save(authorUser);
    }


    @Transactional
    public void downvoteUser(String target, String author) throws Exception {
        User targetUser = userRepository.findByUsername(target);
        User authorUser = userRepository.findByUsername(author);
        if (targetUser == null) {
            throw new Exception("Người dùng " + target + " không tồn tại");
        }
        if (authorUser == null) {
            throw new Exception("Người dùng " + author + " không tồn tại");
        }

        // Kiểm tra xem đã downvote trước đó hay chưa
        boolean hasDownvoted = targetUser.getBedisfavoredList().contains(authorUser);

        if (hasDownvoted) {
            // Nếu đã downvote trước đó, hãy xóa downvote
            targetUser.getBedisfavoredList().remove(authorUser);
            authorUser.getDisfavorList().remove(targetUser);
        } else {
            // Nếu chưa downvote, hãy thêm downvote
            targetUser.getBedisfavoredList().add(authorUser);
            authorUser.getDisfavorList().add(targetUser);
        }
        userRepository.save(targetUser);
        userRepository.save(authorUser);
    }

    @Transactional
    public boolean hasUpvoted(String fromUsername, String toUsername) {
        User fromUser = userRepository.findByUsername(fromUsername);
        User toUser = userRepository.findByUsername(toUsername);

        if (fromUser == null || toUser == null) {
            return false;
        }

        // Kiểm tra xem đã upvote hay chưa
        return toUser.getBefavoredList().contains(fromUser);
    }

    @Transactional
    public boolean hasDownvoted(String fromUser, String toUser) {
        User fromUserEntity = userRepository.findByUsername(fromUser);
        User toUserEntity = userRepository.findByUsername(toUser);
        if (fromUserEntity == null || toUserEntity == null) {
            throw new RuntimeException("User not found");
        }
        return toUserEntity.getBedisfavoredList().contains(fromUserEntity);
    }


    @Transactional
    public User getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
    }
    @Transactional
    public UserResponse checkUserExisted(String username) {
        User user = new User();
        if (username.contains("@"))
        {
            user = userRepository.findByEmail(username);
        }
        else
        {
            user = userRepository.findByUsername(username);
        }
        if (user == null)
        {
            throw new LoginFailedException("Không tìm thấy người dùng!");
        }

        return convertToUserRes(user);
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

    @Transactional
    public void createUser(UserDTO userDTO) {
        String username = userDTO.getUsername();
        User user = userRepository.findByUsername(username);

        // Cập nhật thông tin từ UserDTO
        user.setName(userDTO.getName());
        user.setBirth(userDTO.getBirth());
        user.setHometown(userDTO.getHometown());
        user.setAvatar(userDTO.getAvatar());
        user.setGender(userDTO.getGender());
        user.setBio(userDTO.getBio());

        userRepository.save(user);
    }

    @Transactional
    public void changeUserStatus(String username)
    {
        User user = userRepository.findByUsername(username);
        if (user == null)
        {
            throw new RuntimeException("Không tìm thấy người dùng!");
        }
        user.setAvailable(!user.getAvailable());
        userRepository.save(user);
    }
}

