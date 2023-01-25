package de.volkswagen.productionbackend.model;



import javax.persistence.*;

import lombok.Data;

import java.util.List;

@Data
@Entity
public class ProductionLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    private boolean isRunnable;
    private boolean isActive;
    @ManyToOne
    private CarModel carModel;
    @OneToMany
    private List<ProductionLineComponent> components;


}