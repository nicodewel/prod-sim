package de.volkswagen.productionbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
public class ProductionLineComponent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private long step;
    private long productionTime;
    private boolean isOnDuty;
    @OneToMany(cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Employee> employees;
    @Enumerated(EnumType.STRING)
    private Type type;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "productionline_id")
    private ProductionLine productionLine;

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

    public long getStep() {
        return step;
    }

    public void setStep(long step) {
        this.step = step;
    }

    public long getProductionTime() {
        return productionTime;
    }

    public void setProductionTime(long productionTime) {
        this.productionTime = productionTime;
    }

    public boolean isOnDuty() {
        return isOnDuty;
    }

    public void setOnDuty(boolean onDuty) {
        isOnDuty = onDuty;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public ProductionLine getProductionLine() {
        return productionLine;
    }

    public void setProductionLine(ProductionLine productionLine) {
        this.productionLine = productionLine;
    }
}