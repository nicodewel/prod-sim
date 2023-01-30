package de.volkswagen.productionbackend.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class ProductionLineComponent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private long productionTime;
    private boolean isOnDuty;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Employee> employees;
    @Enumerated(EnumType.STRING)
    private Type type;
}