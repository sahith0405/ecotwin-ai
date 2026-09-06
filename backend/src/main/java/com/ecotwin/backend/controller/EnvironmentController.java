package com.ecotwin.backend.controller;

import com.ecotwin.backend.dto.AIAnalysisResponse;
import com.ecotwin.backend.dto.SimulationRequest;
import com.ecotwin.backend.dto.SimulationResponse;
import com.ecotwin.backend.service.AIAnalystService;
import com.ecotwin.backend.service.RiskEngineService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/environment")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
})
public class EnvironmentController {

    private final RiskEngineService riskEngineService;
    private final AIAnalystService aiAnalystService;

    public EnvironmentController(
            RiskEngineService riskEngineService,
            AIAnalystService aiAnalystService
    ) {
        this.riskEngineService = riskEngineService;
        this.aiAnalystService = aiAnalystService;
    }

    @GetMapping("/{location}")
    public Map<String, Object> getEnvironment(
            @PathVariable String location
    ) {
        return riskEngineService.getEnvironmentProfile(location);
    }

    @GetMapping("/{location}/ai-analysis")
    public AIAnalysisResponse getAIAnalysis(
            @PathVariable String location
    ) {
        return aiAnalystService.analyze(location);
    }

    @PostMapping("/simulate")
    public SimulationResponse simulate(
            @RequestBody SimulationRequest request
    ) {
        return riskEngineService.simulate(request);
    }
}
