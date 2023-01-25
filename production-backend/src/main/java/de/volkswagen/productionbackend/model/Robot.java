package de.volkswagen.productionbackend.model;

import lombok.Data;

import javax.persistence.*;


@Entity
@Data
@PrimaryKeyJoinColumn(referencedColumnName = "id")
public class Robot extends ProductionLineComponent {

    private long lifetime;
}