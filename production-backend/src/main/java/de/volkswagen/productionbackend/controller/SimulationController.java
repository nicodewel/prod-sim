package de.volkswagen.productionbackend.controller;


import de.volkswagen.productionbackend.model.ProductionLine;
import de.volkswagen.productionbackend.service.SimulationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SimulationController {

    private final SimulationService simulationService;

    public SimulationController(SimulationService simulationService) {
        this.simulationService = simulationService;
    }

    @GetMapping("/simulations")
    public ResponseEntity<List<ProductionLine>> getActiveSimulations() {
        return ResponseEntity.ok(this.simulationService.getActiveSimulations());
    }

    @PostMapping("/simulations")
    public ResponseEntity<ProductionLine> addToSimulation(@RequestBody ProductionLine productionLine) {
        if (this.simulationService.addToSimulation(productionLine)) {
            productionLine.setActive(true);
            return ResponseEntity.ok(productionLine);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/simulations/modifySpeed")
    public ResponseEntity<Boolean> modifySimulationSpeed(@RequestBody ProductionLine productionLine) {
        if (this.simulationService.addToSimulation(productionLine)) return ResponseEntity.accepted().build();
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/simulations")
    public ResponseEntity<ProductionLine> stopSimulation(@RequestBody ProductionLine productionLine) {
        return ResponseEntity.ok(this.simulationService.stopSimulation(productionLine));
    }
}