package com.rocket.wygo.repositories;

import com.rocket.wygo.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
}
