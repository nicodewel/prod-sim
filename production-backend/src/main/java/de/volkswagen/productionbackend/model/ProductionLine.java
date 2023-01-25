package de.volkswagen.productionbackend.model;



import javax.persistence.*;
import lombok.Data;

@Data
@Entity
public class ProductionLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    private boolean isRunnable;
    private boolean isActive;
    private CarModel carModel;


}