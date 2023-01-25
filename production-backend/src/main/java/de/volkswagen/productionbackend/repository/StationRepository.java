package de.volkswagen.productionbackend.repository;

import de.volkswagen.productionbackend.model.Station;
import org.springframework.data.repository.CrudRepository;

public interface StationRepository extends CrudRepository<Station,Long> {
}