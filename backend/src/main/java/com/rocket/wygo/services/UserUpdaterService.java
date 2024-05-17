package com.rocket.wygo.services;

import com.rocket.wygo.exceptions.UpdateInfoException;
import com.rocket.wygo.exceptions.UserAlreadyExistsException;
import com.rocket.wygo.models.User;
import com.rocket.wygo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;

@Service
public class UserUpdaterService {
    @Autowired
    private UserRepository userRepository;
    @Transactional
    public void changeAvatar(String username, String newAvatar)
    {
        User user = userRepository.findByUsername(username);
        if (user == null)
        {
            throw new UpdateInfoException("Cập nhật thông tin không thành công!");
        }
        user.setAvatar(newAvatar);
        userRepository.save(user);
    }
    @Transactional
    public void changeBio(String username, String newBio)
    {
        User user = userRepository.findByUsername(username);
        if (user == null)
        {
            throw new UpdateInfoException("Cập nhật thông tin không thành công!");
        }
        user.setBio(newBio);
        userRepository.save(user);
    }
    @Transactional
    public void changeName(String username, String newName)
    {
        User user = userRepository.findByUsername(username);
        if (user == null)
        {
            throw new UpdateInfoException("Cập nhật thông tin không thành công!");
        }
        user.setName(newName);
        userRepository.save(user);
    }
    @Transactional
    public void changeGender(String username, String newGender)
    {
        User user = userRepository.findByUsername(username);
        if (user == null)
        {
            throw new UpdateInfoException("Cập nhật thông tin không thành công!");
        }
        user.setGender(newGender);
        userRepository.save(user);
    }
    @Transactional
    public void changeBirth(String username, String newBirth)
    {
        User user = userRepository.findByUsername(username);
        if (user == null)
        {
            throw new UpdateInfoException("Cập nhật thông tin không thành công!");
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        try {
            user.setBirth(dateFormat.parse(newBirth));
        } catch (Exception e)
        {
            throw new RuntimeException();
        }
        userRepository.save(user);
    }
    @Transactional
    public void changeAddress(String username, String newAddress)
    {
        User user = userRepository.findByUsername(username);
        if (user == null)
        {
            throw new UpdateInfoException("Cập nhật thông tin không thành công!");
        }
        user.setHometown(newAddress);
        userRepository.save(user);
    }
    @Transactional
    public void changeUsername(String username, String newUserName)
    {
        User user = userRepository.findByUsername(username);
        if (user == null)
        {
            throw new UpdateInfoException("Cập nhật thông tin không thành công!");
        }
        User userExisted = userRepository.findByUsername(newUserName);
        if (userExisted != null)
        {
            throw new UpdateInfoException("Tên người dùng đã tồn tại!");
        }
        user.setUsername(newUserName);
        userRepository.save(user);
    }
    @Transactional
    public void changeEmail(String username, String newEmail)
    {
        User user = userRepository.findByUsername(username);
        if (user == null)
        {
            throw new UpdateInfoException("Cập nhật thông tin không thành công!");
        }
        //handle confirmation
        user.setEmail(newEmail);
        userRepository.save(user);
    }
    @Transactional
    public void changePassword(String username, String newPassword)
    {
        User user = userRepository.findByUsername(username);
        if (user == null)
        {
            throw new UpdateInfoException("Cập nhật thông tin không thành công!");
        }
        user.setPassword(newPassword);
        userRepository.save(user);
    }
}
