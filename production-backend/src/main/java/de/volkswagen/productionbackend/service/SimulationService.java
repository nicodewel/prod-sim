package de.volkswagen.productionbackend.service;

import de.volkswagen.productionbackend.model.ProductionLine;
import de.volkswagen.productionbackend.repository.ProductionLineRepository;
import lombok.Data;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.Map;


@Service
@Data
public class SimulationService {

    public static final int MINIMAL_STATION_COUNT = 3;

    private Map<ProductionLine, Long> activeSimulations = new HashMap<>();
    private ProductionLineRepository productionLineRepository;

    public SimulationService(ProductionLineRepository productionLineRepository) {
        this.productionLineRepository = productionLineRepository;
    }

    // Ein Simulationsschritt wird pro Sekunde ausgeführt
    // Dabei wird bei einem minimalen Simulationsgeschwindigkeit (simSpeed) von 1 eine Produktionszeit von 1s hinzugefügt
    @Scheduled(fixedRate = 1000)
    public void executeProductionStep() {
        activeSimulations.forEach(((productionLine, simSpeed) -> {
            productionLine.addSimTime(1 * simSpeed );
        }));
    }

    public boolean addToSimulation(ProductionLine productionLine, long simSpeed) {
        if (!productionLine.validateConfiguration()) return false;
        productionLine.setFinishedParts(0);
        activeSimulations.put(productionLine, simSpeed);
        return true;
    }

    public boolean pauseSimulation(ProductionLine productionLine){
        if (!activeSimulations.containsKey(productionLine)) return false;
        activeSimulations.remove(productionLine);
        productionLine.setActive(false);
        productionLineRepository.save(productionLine);
        return true;
    }





    public void removeFromSimulation(ProductionLine productionLine){
      activeSimulations.remove(productionLine);
    }

    public void changeModelForCurrentSimulation(ProductionLine productionLine){

    }

    public boolean modifySimSpeed(ProductionLine productionLine, long simSpeed){
        if (!activeSimulations.containsKey(productionLine)) return false;
        activeSimulations.put(productionLine,simSpeed);
        return true;
    }

}