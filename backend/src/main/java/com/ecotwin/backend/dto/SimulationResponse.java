package com.ecotwin.backend.dto;

import java.util.Map;

public record SimulationResponse(
        int currentOverallRisk,
        int projectedOverallRisk,
        int riskReduction,
        double reductionPercent,
        Map<String, Integer> currentRisks,
        Map<String, Integer> projectedRisks,
        String insight
) {
}
