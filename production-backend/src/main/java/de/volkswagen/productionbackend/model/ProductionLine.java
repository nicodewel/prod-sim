package de.volkswagen.productionbackend.model;



import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class ProductionLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private boolean isRunnable;
    private boolean isActive;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private CarModel carModel;
    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "production_componentOrder_mapping", joinColumns = {@JoinColumn(name = "productionLine_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "component_id", referencedColumnName = "id")})
    @MapKeyColumn(name = "step")
    private Map<Long,ProductionLineComponent> componentMap;

    public ProductionLine(long id, boolean isRunnable, boolean isActive, CarModel carModel) {
        this.id = id;
        this.isRunnable = isRunnable;
        this.isActive = isActive;
        this.carModel = carModel;
    }


}