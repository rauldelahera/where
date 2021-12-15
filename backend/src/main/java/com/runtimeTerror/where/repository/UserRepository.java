package com.runtimeTerror.where.repository;

import java.util.Optional;

import com.runtimeTerror.where.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    User findUserByUsername(String username);

    Boolean existsByEmail(String email);

    User findUserById(Long id);
}
