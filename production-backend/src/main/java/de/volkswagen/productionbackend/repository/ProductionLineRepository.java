package de.volkswagen.productionbackend.repository;

import de.volkswagen.productionbackend.model.ProductionLine;
import org.springframework.data.repository.CrudRepository;

public interface ProductionLineRepository extends CrudRepository<ProductionLine,Long> {
}