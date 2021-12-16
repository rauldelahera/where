package com.runtimeTerror.where.repository;

import com.runtimeTerror.where.models.Object;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ObjectRepository extends JpaRepository<Object, Long> {
    List<Object> findAllByUsername(String username);


}
