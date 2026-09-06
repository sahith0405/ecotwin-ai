package com.ecotwin.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "environmental_profiles")
public class EnvironmentalProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String location;


    @Column(name = "overall_risk", nullable = false)
    private double overallRisk;

    @Column(name = "heat_risk", nullable = false)
    private double heatRisk;

    @Column(name = "water_risk", nullable = false)
    private double waterRisk;

    @Column(name = "flood_risk", nullable = false)
    private double floodRisk;

    @Column(name = "pollution_risk", nullable = false)
    private double pollutionRisk;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public EnvironmentalProfile() {
    }

    public Long getId() {
        return id;
    }

    public String getLocation() {
        return location;
    }


    public double getOverallRisk() {
        return overallRisk;
    }

    public double getHeatRisk() {
        return heatRisk;
    }

    public double getWaterRisk() {
        return waterRisk;
    }

    public double getFloodRisk() {
        return floodRisk;
    }

    public double getPollutionRisk() {
        return pollutionRisk;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLocation(String location) {
        this.location = location;
    }


    public void setOverallRisk(double overallRisk) {
        this.overallRisk = overallRisk;
    }

    public void setHeatRisk(double heatRisk) {
        this.heatRisk = heatRisk;
    }

    public void setWaterRisk(double waterRisk) {
        this.waterRisk = waterRisk;
    }

    public void setFloodRisk(double floodRisk) {
        this.floodRisk = floodRisk;
    }

    public void setPollutionRisk(double pollutionRisk) {
        this.pollutionRisk = pollutionRisk;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
