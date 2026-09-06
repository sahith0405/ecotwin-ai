package com.ecotwin.backend.dto;

public record SimulationRequest(
        String location,
        double treeCoverage,
        double greenSpaces,
        double waterConservation,
        double sustainableInfrastructure
) {}
