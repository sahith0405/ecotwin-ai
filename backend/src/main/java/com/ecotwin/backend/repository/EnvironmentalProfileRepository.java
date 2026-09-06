package com.ecotwin.backend.repository;

import com.ecotwin.backend.entity.EnvironmentalProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnvironmentalProfileRepository
        extends JpaRepository<EnvironmentalProfile, Long> {

    Optional<EnvironmentalProfile> findByLocationIgnoreCase(String location);
}
