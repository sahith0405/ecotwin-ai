package com.ecotwin.backend.controller;

import com.ecotwin.backend.dto.SimulationRequest;
import com.ecotwin.backend.dto.SimulationResponse;
import com.ecotwin.backend.service.RiskEngineService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/environment")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class EnvironmentController {

    private final RiskEngineService riskEngineService;

    public EnvironmentController(RiskEngineService riskEngineService) {
        this.riskEngineService = riskEngineService;
    }

    @GetMapping("/{location}")
    public Map<String, Object> getEnvironment(
            @PathVariable String location) {

        return riskEngineService.getEnvironmentProfile(location);
    }

    @PostMapping("/simulate")
    public SimulationResponse simulate(
            @RequestBody SimulationRequest request) {

        return riskEngineService.simulate(request);
    }
}
