package com.ecotwin.backend.service;

import com.ecotwin.backend.dto.AIAnalysisResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AIAnalystService {

    private final RiskEngineService riskEngineService;

    public AIAnalystService(RiskEngineService riskEngineService) {
        this.riskEngineService = riskEngineService;
    }

    public AIAnalysisResponse analyze(String location) {

        Map<String, Object> profile =
                riskEngineService.getEnvironmentProfile(location);

        int overallRisk = ((Number) profile.get("overallRisk")).intValue();
        String riskLevel = (String) profile.get("riskLevel");

        @SuppressWarnings("unchecked")
        Map<String, Object> risks =
                (Map<String, Object>) profile.get("risks");

        int heat = ((Number) risks.get("heat")).intValue();
        int water = ((Number) risks.get("water")).intValue();
        int flood = ((Number) risks.get("flood")).intValue();
        int pollution = ((Number) risks.get("pollution")).intValue();

        String primaryConcern;
        String diagnosis;
        String simulationAdvice;

        List<String> recommendations = new ArrayList<>();
        List<String> impactAreas = new ArrayList<>();

        int highestRisk = Math.max(
                Math.max(heat, water),
                Math.max(flood, pollution)
        );

        if (highestRisk == heat) {
            primaryConcern = "Heat Exposure";

            diagnosis = location +
                    " shows elevated heat exposure. Urban heat can increase " +
                    "thermal stress, energy demand and vulnerability during extreme weather.";

            recommendations.add("Increase tree canopy and shaded public spaces.");
            recommendations.add("Expand parks and other green infrastructure.");
            recommendations.add("Prioritize heat-resilient urban development.");

            impactAreas.add("Lower surface heat");
            impactAreas.add("Improve thermal comfort");
            impactAreas.add("Increase urban resilience");

            simulationAdvice =
                    "Start by increasing tree coverage and green spaces in the What-If Simulator.";

        } else if (highestRisk == water) {
            primaryConcern = "Water Stress";

            diagnosis = location +
                    " is experiencing significant water pressure. Improving water efficiency " +
                    "and conservation can reduce long-term environmental stress.";

            recommendations.add("Increase water conservation and reuse.");
            recommendations.add("Improve efficiency of urban water systems.");
            recommendations.add("Expand rainwater harvesting and storage.");

            impactAreas.add("Reduce water demand");
            impactAreas.add("Improve water resilience");
            impactAreas.add("Strengthen resource efficiency");

            simulationAdvice =
                    "Increase water conservation in the What-If Simulator to explore potential reductions.";

        } else if (highestRisk == flood) {
            primaryConcern = "Flood Risk";

            diagnosis = location +
                    " has elevated flood exposure. Green infrastructure and resilient drainage " +
                    "can help manage stormwater and reduce environmental vulnerability.";

            recommendations.add("Expand permeable and green spaces.");
            recommendations.add("Strengthen sustainable drainage infrastructure.");
            recommendations.add("Improve stormwater retention and management.");

            impactAreas.add("Reduce runoff");
            impactAreas.add("Improve drainage resilience");
            impactAreas.add("Protect vulnerable areas");

            simulationAdvice =
                    "Increase green spaces and sustainable infrastructure in the What-If Simulator.";

        } else {
            primaryConcern = "Pollution Pressure";

            diagnosis = location +
                    " shows elevated pollution pressure. Reducing emissions and increasing " +
                    "urban greenery can improve environmental conditions.";

            recommendations.add("Increase urban vegetation and tree coverage.");
            recommendations.add("Support cleaner and more sustainable infrastructure.");
            recommendations.add("Reduce major sources of urban emissions.");

            impactAreas.add("Improve air quality");
            impactAreas.add("Reduce emissions");
            impactAreas.add("Strengthen urban environmental health");

            simulationAdvice =
                    "Increase tree coverage and sustainable infrastructure to explore potential impact.";
        }

        return new AIAnalysisResponse(
                location,
                overallRisk,
                riskLevel,
                primaryConcern,
                diagnosis,
                recommendations,
                impactAreas,
                simulationAdvice
        );
    }
}
