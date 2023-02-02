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
        activeSimulations.forEach(((productionLine) -> productionLine.addSimTime(1)));
    }

    public boolean addToSimulation(ProductionLine productionLine) {
        int index = activeSimulations.indexOf(productionLine);
        if (index == -1) {
            if (!productionLine.validateConfiguration()) return false;
            productionLine.setFinishedParts(0);
            activeSimulations.add(productionLine);
            return true;
        }
        activeSimulations.get(index).setSimSpeed(productionLine.getSimSpeed());
        return true;
    }

    public ProductionLine stopSimulation(ProductionLine productionLine){
        int index = activeSimulations.indexOf(productionLine);
        if (index == -1) {
            productionLine.setActive(false);
            return productionLine;
        }
        ProductionLine pl = activeSimulations.get(index);
        pl.setActive(false);
        ProductionLine finishedSim = productionLineRepository.save(pl);
        activeSimulations.remove(productionLine);
        return finishedSim;
    }

}