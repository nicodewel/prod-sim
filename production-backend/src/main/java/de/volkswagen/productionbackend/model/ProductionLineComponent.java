package de.volkswagen.productionbackend.model;

import lombok.Data;

import javax.persistence.*;


@Entity
@Data
@Inheritance( strategy = InheritanceType.JOINED)
public class ProductionLineComponent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    private String Name;
    private long productionTime;
}