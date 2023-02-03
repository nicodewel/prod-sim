package de.volkswagen.productionbackend.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static de.volkswagen.productionbackend.service.SimulationService.MINIMAL_STATION_COUNT;

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
    // Aktuelle Simulationsgeschwindigkeit
    private int simSpeed = 10;
    // Aktuelle Simulationszeit
    private float simTime = 0;
    // Zeit bis Fertigstellung
    private long timeToCompletion;
    private long finishedParts = 0;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "carModel_id")
    private CarModel carModel;
    @OneToMany(cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ProductionLineComponent> components = new ArrayList<>();

    public boolean validateConfiguration() {
        if (this.components.size() < MINIMAL_STATION_COUNT) return false;
        if (this.simSpeed <= 0) return false;
        if (this.carModel.getComplexity() < 0.5f || this.carModel.getComplexity() > 1.5f) return false;
        if (this.components.stream()
                .filter(v -> v.getType() == Type.station)
                .anyMatch(v -> v.getEmployees().isEmpty())
        ) return false;
        this.timeToCompletion = this.components.stream()
                .map(ProductionLineComponent::getProductionTime)
                .reduce(0L, Long::sum);
        this.isRunnable = true;
        return true;
    }

    public void addSimTime(long time) {
        this.simTime += time * this.simSpeed / this.carModel.getComplexity();
        while (this.simTime >= this.timeToCompletion) {
            this.simTime -= this.timeToCompletion;
            this.finishedParts += 1;
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductionLine that = (ProductionLine) o;

        return id == that.id;
    }

    public int getSimSpeed() {
        return simSpeed;
    }

    public void setSimSpeed(int simSpeed) {
        this.simSpeed = simSpeed;
    }

    @Override
    public int hashCode() {
        return (int) (id ^ (id >>> 32));
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isRunnable() {
        return isRunnable;
    }

    public void setRunnable(boolean runnable) {
        isRunnable = runnable;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public float getSimTime() {
        return simTime;
    }

    public void setSimTime(float simTime) {
        this.simTime = simTime;
    }

    public long getTimeToCompletion() {
        return timeToCompletion;
    }

    public void setTimeToCompletion(long timeToCompletion) {
        this.timeToCompletion = timeToCompletion;
    }

    public long getFinishedParts() {
        return finishedParts;
    }

    public void setFinishedParts(long finishedParts) {
        this.finishedParts = finishedParts;
    }

    public CarModel getCarModel() {
        return carModel;
    }

    public void setCarModel(CarModel carModel) {
        this.carModel = carModel;
    }

    public List<ProductionLineComponent> getComponents() {
        return components;
    }

    public void setComponents(List<ProductionLineComponent> components) {
        this.components = components;
    }
}