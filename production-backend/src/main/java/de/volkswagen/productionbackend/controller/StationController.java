package de.volkswagen.productionbackend.controller;

import de.volkswagen.productionbackend.model.Station;
import de.volkswagen.productionbackend.service.StationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
public class StationController {

    private final StationService stationService;

    public StationController(StationService stationService) {
        this.stationService = stationService;
    }

    @GetMapping("/stations")
    public ResponseEntity<List<Station>> getAll(){
        return ResponseEntity.ok(stationService.getAllStations());
    }

    @GetMapping("/stations/{id}")
    public ResponseEntity<Station> getById(@PathVariable long id){
        if (stationService.getStationById(id).isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(stationService.getStationById(id).get());
    }

    @PostMapping("/stations")
    public ResponseEntity<Station> save(@RequestBody Station station){
        return ResponseEntity.ok(stationService.saveStation(station));
    }


}