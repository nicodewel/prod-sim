package de.volkswagen.productionbackend.repository;

import de.volkswagen.productionbackend.model.Robot;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RobotRepository extends JpaRepository<Robot,Long> {
}