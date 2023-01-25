package de.volkswagen.productionbackend.repository;

import de.volkswagen.productionbackend.model.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface StationRepository extends JpaRepository<Station,Long> {
}