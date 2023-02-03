package de.volkswagen.productionbackend.controller;

import de.volkswagen.productionbackend.model.CarModel;
import de.volkswagen.productionbackend.service.CarModelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
public class CarModelController {

    private final CarModelService carModelService;

    public CarModelController(CarModelService carModelService) {
        this.carModelService = carModelService;
    }

    @GetMapping("/carModels")
    public ResponseEntity<List<CarModel>> getAll() {
        return ResponseEntity.ok(this.carModelService.getAllCarModels());
    }

    @GetMapping("/carModels/{id}")
    public ResponseEntity<CarModel> getById(@PathVariable long id) {
        if (this.carModelService.getCarModelById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(this.carModelService.getCarModelById(id).get());
    }

    @PostMapping("/carModels")
    public ResponseEntity<CarModel> save(@RequestBody CarModel carModel) {
        return ResponseEntity.ok(this.carModelService.saveCarModel(carModel));
    }


}