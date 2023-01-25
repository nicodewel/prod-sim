package de.volkswagen.productionbackend.repository;

import de.volkswagen.productionbackend.model.CarModel;
import org.springframework.data.repository.CrudRepository;

public interface CarModelRepository extends CrudRepository<CarModel,Long> {
}