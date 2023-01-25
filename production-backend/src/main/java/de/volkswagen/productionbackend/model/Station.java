package de.volkswagen.productionbackend.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@PrimaryKeyJoinColumn(referencedColumnName = "id")
public class Station extends ProductionLineComponent{

    @OneToMany
    private List<Employee> employees;

}