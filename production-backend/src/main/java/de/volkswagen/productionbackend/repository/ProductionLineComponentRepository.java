package de.volkswagen.productionbackend.repository;

import de.volkswagen.productionbackend.model.ProductionLineComponent;
import org.springframework.data.repository.CrudRepository;

public interface ProductionLineComponentRepository extends CrudRepository<ProductionLineComponent,Long> {
}