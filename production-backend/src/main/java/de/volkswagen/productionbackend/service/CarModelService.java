package de.volkswagen.productionbackend.service;

import de.volkswagen.productionbackend.model.CarModel;
import de.volkswagen.productionbackend.repository.CarModelRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarModelService {

    private final CarModelRepository carModelRepository;

    public CarModelService(CarModelRepository carModelRepository) {
        this.carModelRepository = carModelRepository;
    }

    public List<CarModel> getAllCarModels() {
        return this.carModelRepository.findAll();
    }

    public Optional<CarModel> getCarModelById(long id) {
        return this.carModelRepository.findById(id);
    }

    public void deleteCarModelById(long id) {
        this.carModelRepository.deleteById(id);
    }

    public CarModel saveCarModel(CarModel carModel) {
        return this.carModelRepository.save(carModel);
    }
}