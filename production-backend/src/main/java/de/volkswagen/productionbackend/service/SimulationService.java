package de.volkswagen.productionbackend.service;

import de.volkswagen.productionbackend.model.ProductionLine;
import de.volkswagen.productionbackend.repository.ProductionLineRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
@Data

public class SimulationService {

    public final static int MINIMAL_STATION_COUNT = 3;
    public final static int BASE_SIM_TIME = 1;

    private List<ProductionLine> activeSimulations = new ArrayList<>();
    private ProductionLineRepository productionLineRepository;

    public SimulationService(ProductionLineRepository productionLineRepository) {
        this.productionLineRepository = productionLineRepository;
    }

    // Ein Simulationsschritt wird pro Sekunde ausgeführt
    // Dabei wird bei einem minimalen Simulationsgeschwindigkeit (simSpeed) von 1 eine Produktionszeit von BASE_SIM_TIME s hinzugefügt
    @Scheduled(fixedRate = 1000)
    public void executeProductionStep() {

        System.out.println(BASE_SIM_TIME);
        System.out.println(MINIMAL_STATION_COUNT);
        this.activeSimulations.forEach(((productionLine) -> productionLine.addSimTime(BASE_SIM_TIME)));
    }

    public boolean addToSimulation(ProductionLine productionLine) {
        int index = this.activeSimulations.indexOf(productionLine);
        if (index == -1) {
            if (!productionLine.validateConfiguration()) return false;
            productionLine.setFinishedParts(0);
            this.activeSimulations.add(productionLine);
            return true;
        }
        this.activeSimulations.get(index).setSimSpeed(productionLine.getSimSpeed());
        return true;
    }

    public ProductionLine stopSimulation(ProductionLine productionLine) {
        int index = this.activeSimulations.indexOf(productionLine);
        if (index == -1) {
            productionLine.setActive(false);
            return productionLine;
        }
        ProductionLine pl = this.activeSimulations.get(index);
        pl.setActive(false);
        ProductionLine finishedSim = this.productionLineRepository.save(pl);
        this.activeSimulations.remove(productionLine);
        return finishedSim;
    }

}