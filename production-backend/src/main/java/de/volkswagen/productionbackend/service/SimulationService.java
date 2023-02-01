package de.volkswagen.productionbackend.service;

import de.volkswagen.productionbackend.model.ProductionLine;
import de.volkswagen.productionbackend.repository.ProductionLineRepository;
import lombok.Data;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Data
public class SimulationService {

    public static final int MINIMAL_STATION_COUNT = 3;

    private List<ProductionLine> activeSimulations = new ArrayList<>();
    private ProductionLineRepository productionLineRepository;

    public SimulationService(ProductionLineRepository productionLineRepository) {
        this.productionLineRepository = productionLineRepository;
    }

    // Ein Simulationsschritt wird pro Sekunde ausgeführt
    // Dabei wird bei einem minimalen Simulationsgeschwindigkeit (simSpeed) von 1 eine Produktionszeit von 1s hinzugefügt
    @Scheduled(fixedRate = 1000)
    public void executeProductionStep() {
        activeSimulations.forEach(((productionLine) -> {
            productionLine.addSimTime(1);
        }));
    }

    public boolean addToSimulation(ProductionLine productionLine) {
        if (!productionLine.validateConfiguration()) return false;
        productionLine.setFinishedParts(0);
        activeSimulations.add(productionLine);
        return true;
    }

    public boolean stopSimulation(ProductionLine productionLine){
        if (!activeSimulations.contains(productionLine)) return false;
        activeSimulations.remove(productionLine);
        productionLine.setActive(false);
        productionLineRepository.save(productionLine);
        return true;
    }

    public boolean modifySimSpeed(ProductionLine productionLine, int simSpeed){
        if (!activeSimulations.contains(productionLine)) return false;
        productionLine.setSimSpeed(simSpeed);
        activeSimulations.add(productionLine);
        return true;
    }

}