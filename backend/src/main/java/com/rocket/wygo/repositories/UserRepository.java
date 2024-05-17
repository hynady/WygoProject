package com.rocket.wygo.repositories;

import com.rocket.wygo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);

    User findByEmail(String email);

    List<User> findByUsernameContaining(String username);

    List<User> findByNameContainingOrUsernameContaining(String name, String username);

}