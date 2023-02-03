package de.volkswagen.productionbackend.repository;

import de.volkswagen.productionbackend.model.ProductionLine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductionLineRepository extends JpaRepository<ProductionLine, Long> {
}