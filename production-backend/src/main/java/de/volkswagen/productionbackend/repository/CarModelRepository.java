package de.volkswagen.productionbackend.repository;

import de.volkswagen.productionbackend.model.CarModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface CarModelRepository extends JpaRepository<CarModel,Long> {
}