package de.volkswagen.productionbackend.repository;

import de.volkswagen.productionbackend.model.Robot;
import org.springframework.data.repository.CrudRepository;

public interface RobotRepository extends CrudRepository<Robot,Long> {
}