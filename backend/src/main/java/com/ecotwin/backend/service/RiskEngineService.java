package com.ecotwin.backend.service;

import com.ecotwin.backend.dto.SimulationRequest;
import com.ecotwin.backend.dto.SimulationResponse;
import com.ecotwin.backend.entity.EnvironmentalProfile;
import com.ecotwin.backend.repository.EnvironmentalProfileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class RiskEngineService {

    private final EnvironmentalProfileRepository repository;

    public RiskEngineService(EnvironmentalProfileRepository repository) {
        this.repository = repository;
    }

    public Map<String, Object> getEnvironmentProfile(String location) {

        EnvironmentalProfile profile = getProfile(location);

        int heat = toRisk(profile.getHeatRisk());
        int water = toRisk(profile.getWaterRisk());
        int flood = toRisk(profile.getFloodRisk());
        int pollution = toRisk(profile.getPollutionRisk());
        int overallRisk = toRisk(profile.getOverallRisk());

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("location", profile.getLocation());
        response.put("overallRisk", overallRisk);
        response.put("riskLevel", getRiskLevel(overallRisk));

        Map<String, Integer> risks = new LinkedHashMap<>();
        risks.put("heat", heat);
        risks.put("water", water);
        risks.put("flood", flood);
        risks.put("pollution", pollution);

        response.put("risks", risks);

        response.put(
                "summary",
                buildSummary(heat, water, flood, pollution)
        );

        return response;
    }

    public SimulationResponse simulate(SimulationRequest request) {

        EnvironmentalProfile profile = getProfile(request.location());

        double baseHeat = profile.getHeatRisk();
        double baseWater = profile.getWaterRisk();
        double baseFlood = profile.getFloodRisk();
        double basePollution = profile.getPollutionRisk();

        int currentOverallRisk = toRisk(profile.getOverallRisk());

        double tree = clamp(request.treeCoverage(), 0, 50);
        double green = clamp(request.greenSpaces(), 0, 40);
        double water = clamp(request.waterConservation(), 0, 50);
        double infrastructure = clamp(
                request.sustainableInfrastructure(), 0, 40
        );

        int projectedHeat = calculateRisk(
                baseHeat
                        - tree * 0.42
                        - green * 0.22
                        - infrastructure * 0.08
        );

        int projectedWater = calculateRisk(
                baseWater
                        - water * 0.36
                        - green * 0.08
                        - infrastructure * 0.06
        );

        int projectedFlood = calculateRisk(
                baseFlood
                        - green * 0.18
                        - water * 0.08
                        - infrastructure * 0.20
        );

        int projectedPollution = calculateRisk(
                basePollution
                        - tree * 0.18
                        - green * 0.12
                        - infrastructure * 0.16
        );

        Map<String, Integer> currentRisks = new LinkedHashMap<>();
        currentRisks.put("heat", toRisk(baseHeat));
        currentRisks.put("water", toRisk(baseWater));
        currentRisks.put("flood", toRisk(baseFlood));
        currentRisks.put("pollution", toRisk(basePollution));

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

        int reduction = currentOverallRisk - projectedOverall;

        double reductionPercent =
                currentOverallRisk == 0
                        ? 0
                        : reduction * 100.0 / currentOverallRisk;

        String insight = buildInsight(
                reduction,
                tree,
                green,
                water,
                infrastructure
        );

        return new SimulationResponse(
                currentOverallRisk,
                projectedOverall,
                reduction,
                Math.round(reductionPercent * 10.0) / 10.0,
                currentRisks,
                projectedRisks,
                insight
        );
    }

    private EnvironmentalProfile getProfile(String location) {

        return repository.findByLocationIgnoreCase(location)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Environmental profile not found for: " + location
                ));
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

    private int toRisk(double value) {
        return calculateRisk(value);
    }

    private double clamp(double value, double min, double max) {
        return Math.max(min, Math.min(max, value));
    }

    private String getRiskLevel(int risk) {

        if (risk >= 70) {
            return "High";
        }

        if (risk >= 40) {
            return "Moderate";
        }

        return "Low";
    }

    private String buildSummary(
            int heat,
            int water,
            int flood,
            int pollution
    ) {

        if (heat >= water && heat >= pollution) {
            return "Environmental risk is driven primarily by heat exposure, "
                    + "with additional pressure from water stress and pollution.";
        }

        if (water >= pollution) {
            return "Environmental risk is driven primarily by water stress, "
                    + "with additional pressure from heat exposure and pollution.";
        }

        return "Environmental risk is driven primarily by urban pollution, "
                + "with additional pressure from heat exposure and water stress.";
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
