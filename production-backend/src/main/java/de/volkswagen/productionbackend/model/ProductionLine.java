package de.volkswagen.productionbackend.model;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

import static de.volkswagen.productionbackend.service.SimulationService.MINIMAL_STATION_COUNT;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
    @ManyToOne(cascade = CascadeType.ALL)
    private CarModel carModel;
    @OneToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "production_componentOrder_mapping", joinColumns = {@JoinColumn(name = "productionLine_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "component_id", referencedColumnName = "id")})
    @MapKeyColumn(name = "step")
    private Map<Long, ProductionLineComponent> componentMap;

    public boolean validateConfiguration() {
        if (componentMap.size() <= MINIMAL_STATION_COUNT) return false;
        if (componentMap.values().stream()
                .filter(v -> v.getType() == Type.station)
                .filter(v -> v.getEmployees().isEmpty())
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

    public void addSimTime(long time) {
        simTime += time;
        while (simTime >= timeToCompletion) {
            simTime -= timeToCompletion;
            finishedParts += 1;
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductionLine that = (ProductionLine) o;

        return id == that.id;
    }

    @Override
    public int hashCode() {
        return (int) (id ^ (id >>> 32));
    }
}