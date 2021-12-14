package com.runtimeTerror.where.repository;

import com.runtimeTerror.where.models.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {

    List<Location> findByUsername(String username);
}
