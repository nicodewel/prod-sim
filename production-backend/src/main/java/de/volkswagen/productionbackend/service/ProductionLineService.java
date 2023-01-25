package de.volkswagen.productionbackend.service;

import com.fasterxml.jackson.databind.util.JSONPObject;
import de.volkswagen.productionbackend.dto.ProductionLineDto;
import de.volkswagen.productionbackend.mapper.Mapper;
import de.volkswagen.productionbackend.model.*;
import de.volkswagen.productionbackend.repository.ProductionLineRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
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
//        robot.setStep(1);
//
//        Employee employee = new Employee();
//        employee.setName("Erwin");
//
//        Station station = new Station();
//        station.setProductionTime(3);
//        station.setStep(2);
//        station.setName("Band1");
//        station.setEmployees(Arrays.asList(employee));
//
//        CarModel carModel = new CarModel();
//        carModel.setName("ID3");
//        carModel.setComplexity(1.0f);
//
//        ProductionLine line = new ProductionLine();
//        line.setActive(true);
//        line.setComponents(Arrays.asList(robot,station));
//        line.setRunnable(true);
//
//        productionLineRepository.save(line);
    }

    public List<ProductionLineDto> getAllProductionLines(){
        List<ProductionLine> productionLines = productionLineRepository.findAll();
        return productionLines.stream().map(productionLine -> Mapper.mapProductionLine(productionLine)).collect(Collectors.toList());
    }

    public Optional<ProductionLine> getProductionLineById(long id){
        return productionLineRepository.findById(id);
    }

    public void deleteProductionLineById(long id){
        productionLineRepository.deleteById(id);
    }

    public ProductionLineDto saveProductionLine(ProductionLineDto dto){
        ProductionLine productionLine = Mapper.mapProductionLine(dto);
        return productionLineRepository.save(productionLine);
    }
}