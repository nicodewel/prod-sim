package de.volkswagen.productionbackend.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@PrimaryKeyJoinColumn(referencedColumnName = "id")
public class Station extends ProductionLineComponent{

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Employee> employees;

}