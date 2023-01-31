package de.volkswagen.productionbackend.controller;


import de.volkswagen.productionbackend.model.ProductionLine;
import de.volkswagen.productionbackend.service.SimulationService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class SimulationController {

    private SimulationService simulationService;

    public SimulationController(SimulationService simulationService) {
        this.simulationService = simulationService;
    }

    @GetMapping("/simulations")
    public ResponseEntity<Map<ProductionLine, Long>> getActiveSimulations(){
        return ResponseEntity.ok(simulationService.getActiveSimulations());
    }

    @PostMapping("/simulations")
    public ResponseEntity<Void> addToSimulation(@RequestBody ProductionLine productionLine, @RequestParam Long simSpeed){
        if (simulationService.addToSimulation(productionLine, simSpeed)) {
            productionLine.setActive(true);
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/simulations/modifySpeed")
    public ResponseEntity<Boolean> modifySimulationSpeed(@RequestBody ProductionLine productionLine, @RequestParam Long simSpeed){
        if (simulationService.addToSimulation(productionLine, simSpeed)) return ResponseEntity.accepted().build();
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/simulations")
    public ResponseEntity<Void> removeFromSimulation(@RequestBody ProductionLine productionLine){
        simulationService.removeFromSimulation(productionLine);
        return ResponseEntity.noContent().build();
    }
}