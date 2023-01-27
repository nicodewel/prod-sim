package de.volkswagen.productionbackend.service;

import de.volkswagen.productionbackend.model.ProductionLine;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


import java.util.Map;


@Service
public class SimulationService {

    public static final int MINIMAL_STATION_COUNT = 3;

    private Map<ProductionLine, Long> activeSimulations;

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
        activeSimulations.put(productionLine, simSpeed);
        return true;
    }

}