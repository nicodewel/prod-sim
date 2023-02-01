package de.volkswagen.productionbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.security.PrivateKey;

@Entity
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private boolean isOnDuty;

    @ManyToOne
    @JoinColumn(name = "component_id")
    @JsonBackReference
    private ProductionLineComponent component;
}