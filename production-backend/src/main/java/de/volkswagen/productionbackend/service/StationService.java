package de.volkswagen.productionbackend.service;

import de.volkswagen.productionbackend.model.Station;
import de.volkswagen.productionbackend.repository.StationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StationService {

    private final StationRepository stationRepository;

    public StationService(StationRepository stationRepository) {
        this.stationRepository = stationRepository;
    }

    public List<Station> getAllStations(){
        return stationRepository.findAll();
    }

    public Optional<Station> getStationById(long id){
        return stationRepository.findById(id);
    }

    public void deleteStationById(long id){
        stationRepository.deleteById(id);
    }

    public Station saveStation(Station station){
        return stationRepository.save(station);
    }
}