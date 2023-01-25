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
    @ManyToOne(cascade = CascadeType.PERSIST)
    private CarModel carModel;
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<ProductionLineComponent> components;


}