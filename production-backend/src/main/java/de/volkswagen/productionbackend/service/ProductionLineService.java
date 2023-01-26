package de.volkswagen.productionbackend.service;

import de.volkswagen.productionbackend.model.*;
import de.volkswagen.productionbackend.repository.ProductionLineRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductionLineService {

    private final ProductionLineRepository productionLineRepository;

    public ProductionLineService(ProductionLineRepository productionLineRepository) {
        this.productionLineRepository = productionLineRepository;

//        Robot robot = new Robot();
//        robot.setName("Robert");
//        robot.setLifetime(10000);
//        robot.setProductionTime(2);
//
//        Employee employee = new Employee();
//        employee.setName("Erwin");
//
//        Station station = new Station();
//        station.setProductionTime(3);
//        station.setName("Band1");
//        station.setEmployees(Arrays.asList(employee));
//
//        CarModel carModel = new CarModel();
//        carModel.setName("ID3");
//        carModel.setComplexity(1.0f);
//
//        ProductionLine line = new ProductionLine();
//        line.setActive(true);
//        Map<Long,ProductionLineComponent> productOrderMap = new HashMap<>();
//        productOrderMap.put(1l,station);
//        productOrderMap.put(2l,robot);
//        line.setComponentMap(productOrderMap);
//        line.setRunnable(true);
//
//        productionLineRepository.save(line);
    }

    public List<ProductionLine> getAllProductionLines(){
        List<ProductionLine> productionLines = productionLineRepository.findAll();
        return productionLines;
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