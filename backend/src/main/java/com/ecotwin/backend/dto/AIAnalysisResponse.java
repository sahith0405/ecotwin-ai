package com.ecotwin.backend.dto;

import java.util.List;

public record AIAnalysisResponse(
        String location,
        int overallRisk,
        String riskLevel,
        String primaryConcern,
        String diagnosis,
        List<String> recommendations,
        List<String> impactAreas,
        String simulationAdvice
) {}
