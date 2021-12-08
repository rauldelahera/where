package com.runtimeTerror.where.userdetails;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<UserDetailsImpl, UUID> {
}
