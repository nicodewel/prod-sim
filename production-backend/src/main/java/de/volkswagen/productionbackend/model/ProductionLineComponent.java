package de.volkswagen.productionbackend.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity

public class ProductionLineComponent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private long productionTime;
    private boolean isOnDuty;
    @OneToMany(cascade = CascadeType.MERGE)
    @JoinColumn(name="production_line_component_id")
    private List<Employee> employees;
    @Enumerated(EnumType.STRING)
    private Type type;

    public long getId () {
        return id;
    }

    public String getName () {
        return name;
    }

    public void setName (String name) {
        this.name = name;
    }

    public long getProductionTime () {
        return productionTime;
    }

    public void setProductionTime (long productionTime) {
        this.productionTime = productionTime;
    }

    public boolean isOnDuty () {
        return isOnDuty;
    }

    public void setOnDuty (boolean onDuty) {
        isOnDuty = onDuty;
    }

    public List<Employee> getEmployees () {
        return employees;
    }

    public void setEmployees (List<Employee> employees) {
        this.employees = employees;
    }

    public Type getType () {
        return type;
    }

    public void setType (Type type) {
        this.type = type;
    }
}