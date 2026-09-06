package com.ecotwin.backend.dto;

public record SimulationRequest(
        double treeCoverage,
        double greenSpaces,
        double waterConservation,
        double sustainableInfrastructure
) {
}
