package com.ecotwin.backend.service;

import com.ecotwin.backend.dto.SimulationRequest;
import com.ecotwin.backend.dto.SimulationResponse;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class RiskEngineService {

    private static final int CURRENT_OVERALL_RISK = 76;

    private static final double BASE_HEAT = 82;
    private static final double BASE_WATER = 67;
    private static final double BASE_FLOOD = 41;
    private static final double BASE_POLLUTION = 73;

    public Map<String, Object> getEnvironmentProfile(String location) {

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("location", location);
        response.put("overallRisk", CURRENT_OVERALL_RISK);
        response.put("riskLevel", "High");

        Map<String, Integer> risks = new LinkedHashMap<>();
        risks.put("heat", (int) BASE_HEAT);
        risks.put("water", (int) BASE_WATER);
        risks.put("flood", (int) BASE_FLOOD);
        risks.put("pollution", (int) BASE_POLLUTION);

        response.put("risks", risks);

        response.put(
                "summary",
                "High environmental risk driven primarily by heat exposure, "
                        + "water stress, and urban pollution."
        );

        return response;
    }

    public SimulationResponse simulate(SimulationRequest request) {

        double tree = clamp(request.treeCoverage(), 0, 50);
        double green = clamp(request.greenSpaces(), 0, 40);
        double water = clamp(request.waterConservation(), 0, 50);
        double infrastructure = clamp(
                request.sustainableInfrastructure(), 0, 40
        );

        int projectedHeat = calculateRisk(
                BASE_HEAT
                        - tree * 0.42
                        - green * 0.22
                        - infrastructure * 0.08
        );

        int projectedWater = calculateRisk(
                BASE_WATER
                        - water * 0.36
                        - green * 0.08
                        - infrastructure * 0.06
        );

        int projectedFlood = calculateRisk(
                BASE_FLOOD
                        - green * 0.18
                        - water * 0.08
                        - infrastructure * 0.20
        );

        int projectedPollution = calculateRisk(
                BASE_POLLUTION
                        - tree * 0.18
                        - green * 0.12
                        - infrastructure * 0.16
        );

        Map<String, Integer> currentRisks = new LinkedHashMap<>();
        currentRisks.put("heat", (int) BASE_HEAT);
        currentRisks.put("water", (int) BASE_WATER);
        currentRisks.put("flood", (int) BASE_FLOOD);
        currentRisks.put("pollution", (int) BASE_POLLUTION);

        Map<String, Integer> projectedRisks = new LinkedHashMap<>();
        projectedRisks.put("heat", projectedHeat);
        projectedRisks.put("water", projectedWater);
        projectedRisks.put("flood", projectedFlood);
        projectedRisks.put("pollution", projectedPollution);

        int projectedOverall = calculateOverallRisk(
                projectedHeat,
                projectedWater,
                projectedFlood,
                projectedPollution
        );

        int reduction = CURRENT_OVERALL_RISK - projectedOverall;

        double reductionPercent =
                reduction * 100.0 / CURRENT_OVERALL_RISK;

        String insight = buildInsight(
                reduction,
                tree,
                green,
                water,
                infrastructure
        );

        return new SimulationResponse(
                CURRENT_OVERALL_RISK,
                projectedOverall,
                reduction,
                Math.round(reductionPercent * 10.0) / 10.0,
                currentRisks,
                projectedRisks,
                insight
        );
    }

    private int calculateOverallRisk(
            int heat,
            int water,
            int flood,
            int pollution
    ) {
        double weightedRisk =
                heat * 0.30
                        + water * 0.25
                        + flood * 0.20
                        + pollution * 0.25;

        return (int) Math.round(weightedRisk);
    }

    private int calculateRisk(double value) {
        return (int) Math.round(clamp(value, 0, 100));
    }

    private double clamp(double value, double min, double max) {
        return Math.max(min, Math.min(max, value));
    }

    private String buildInsight(
            int reduction,
            double tree,
            double green,
            double water,
            double infrastructure
    ) {

        if (reduction <= 0) {
            return "Increase environmental interventions to achieve measurable risk reduction.";
        }

        String strongestAction;

        if (tree >= green && tree >= water && tree >= infrastructure) {
            strongestAction = "tree coverage";
        } else if (green >= water && green >= infrastructure) {
            strongestAction = "green spaces";
        } else if (water >= infrastructure) {
            strongestAction = "water conservation";
        } else {
            strongestAction = "sustainable infrastructure";
        }

        return "This scenario could reduce overall environmental risk by "
                + reduction
                + " points, with "
                + strongestAction
                + " providing the strongest contribution.";
    }
}
