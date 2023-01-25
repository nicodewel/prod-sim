package de.volkswagen.productionbackend.repository;

import de.volkswagen.productionbackend.model.ProductionLineComponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ProductionLineComponentRepository extends JpaRepository<ProductionLineComponent,Long> {
}