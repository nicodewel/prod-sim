package de.volkswagen.productionbackend.controller;


import de.volkswagen.productionbackend.model.ProductionLine;
import de.volkswagen.productionbackend.service.SimulationService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class SimulationController {

    private final SimulationService simulationService;

    public SimulationController(SimulationService simulationService) {
        this.simulationService = simulationService;
    }

    @GetMapping("/simulations")
    public ResponseEntity<List<ProductionLine>>getActiveSimulations(){
        return ResponseEntity.ok(simulationService.getActiveSimulations());
    }

    @PostMapping("/simulations")
    public ResponseEntity<ProductionLine> addToSimulation(@RequestBody ProductionLine productionLine, @RequestParam Long simSpeed){
        if (simulationService.addToSimulation(productionLine, simSpeed)) {
            productionLine.setActive(true);
            return ResponseEntity.ok(productionLine);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/simulations/modifySpeed")
    public ResponseEntity<Boolean> modifySimulationSpeed(@RequestBody ProductionLine productionLine, @RequestParam Long simSpeed){
        if (simulationService.addToSimulation(productionLine, simSpeed)) return ResponseEntity.accepted().build();
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/simulations")
    public ResponseEntity<Void> stopSimulation(@RequestBody ProductionLine productionLine){
        simulationService.stopSimulation(productionLine);
        return ResponseEntity.noContent().build();
    }
}