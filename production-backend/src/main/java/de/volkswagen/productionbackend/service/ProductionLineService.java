package de.volkswagen.productionbackend.service;

import de.volkswagen.productionbackend.model.*;
import de.volkswagen.productionbackend.repository.ProductionLineRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ProductionLineService {

    private final ProductionLineRepository productionLineRepository;

    public ProductionLineService(ProductionLineRepository productionLineRepository) {
        this.productionLineRepository = productionLineRepository;

        Robot robot = new Robot();
        robot.setName("Robert");
        robot.setLifetime(10000);
        robot.setProductionTime(2);
        robot.setStep(1);

        Employee employee = new Employee();
        employee.setName("Erwin");

        Station station = new Station();
        station.setProductionTime(3);
        station.setStep(2);
        station.setName("Band1");
        station.setEmployees(Arrays.asList(employee));

        CarModel carModel = new CarModel();
        carModel.setName("ID3");
        carModel.setComplexity(1.0f);

        ProductionLine line = new ProductionLine();
        line.setActive(true);
        line.setComponents(Arrays.asList(robot,station));
        line.setRunnable(true);
        line.setCarModel(carModel);

        productionLineRepository.save(line);
    }

    public List<ProductionLine> getAllProductionLines(){
        return productionLineRepository.findAll();
    }

    public Optional<ProductionLine> getProductionLineById(long id){
        return productionLineRepository.findById(id);
    }

    public void deleteProductionLineById(long id){
        productionLineRepository.deleteById(id);
    }

    public ProductionLine saveProductionLine(ProductionLine productionLine){
        return productionLineRepository.save(productionLine);
    }
}