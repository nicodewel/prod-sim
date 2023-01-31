package de.volkswagen.productionbackend.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Entity

public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private boolean isOnDuty;
    @ManyToOne
    private ProductionLineComponent productionLineComponent;

    public long getId () {
        return id;
    }


    public String getName () {
        return name;
    }

    public void setName (String name) {
        this.name = name;
    }

    public boolean isOnDuty () {
        return isOnDuty;
    }

    public void setOnDuty (boolean onDuty) {
        isOnDuty = onDuty;
    }

    public ProductionLineComponent getProductionLineComponent () {
        return productionLineComponent;
    }

    public void setProductionLineComponent (ProductionLineComponent productionLineComponent) {
        this.productionLineComponent = productionLineComponent;
    }
}