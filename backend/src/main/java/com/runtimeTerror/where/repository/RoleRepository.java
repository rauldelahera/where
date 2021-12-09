package com.runtimeTerror.where.repository;


import java.util.Optional;

import com.runtimeTerror.where.models.ERole;
import com.runtimeTerror.where.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}