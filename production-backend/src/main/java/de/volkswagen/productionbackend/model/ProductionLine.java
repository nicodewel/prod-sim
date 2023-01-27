package de.volkswagen.productionbackend.model;

import javax.persistence.*;

import lombok.Builder;
import lombok.Data;

import java.util.Map;
import java.util.stream.Collectors;

import static de.volkswagen.productionbackend.service.SimulationService.MINIMAL_STATION_COUNT;

@Data
@Entity
@Builder
public class ProductionLine {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private boolean isRunnable = false;
    private boolean isActive = false;
    // Aktuelle Simulationszeit in ms
    private long simTime = 0;
    // Zeit bis Fertigstellung in ms
    private long timeToCompletion;
    private long finishedParts = 0;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private CarModel carModel;
    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "production_componentOrder_mapping", joinColumns = {@JoinColumn(name = "productionLine_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "component_id", referencedColumnName = "id")})
    @MapKeyColumn(name = "step")
    private Map<Long, ProductionLineComponent> componentMap;

    public boolean validateConfiguration() {
        if (componentMap.size() <= MINIMAL_STATION_COUNT) return false;
        if (componentMap.values().stream()
                .filter(v -> v.getClass() == Station.class)
                .filter(v -> ((Station) v).getEmployees().isEmpty())
                .findAny()
                .isEmpty()
        ) return false;
        timeToCompletion = componentMap.values().stream()
                .map(v -> v.getProductionTime())
                .reduce(0L, (a, b) -> a + b)
                .longValue();
        isRunnable = true;
        return true;
    }
//TODO: Handling ergänzen wenn mehrere Teile in einem Simulationsschritt fertig gestellt werden.
    public void addSimTime(long time) {
        simTime += time;
        if (simTime >= timeToCompletion) {
            simTime -= timeToCompletion;
            finishedParts += 1;
        }
    }
}