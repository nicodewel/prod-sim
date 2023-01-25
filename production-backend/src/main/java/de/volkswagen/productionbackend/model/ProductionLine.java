package de.volkswagen.productionbackend.model;


import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class ProductionLine {

    private boolean isRunnable;
    private boolean isActive;
}