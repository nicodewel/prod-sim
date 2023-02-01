package de.volkswagen.productionbackend.service;

import de.volkswagen.productionbackend.model.*;
import de.volkswagen.productionbackend.repository.CarModelRepository;
import de.volkswagen.productionbackend.repository.EmployeeRepository;
import de.volkswagen.productionbackend.repository.ProductionLineComponentRepository;
import de.volkswagen.productionbackend.repository.ProductionLineRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductionLineService {

    private final ProductionLineRepository productionLineRepository;
    private final EmployeeRepository employeeRepository;
    private final ProductionLineComponentRepository componentRepository;
    private final CarModelRepository carModelRepository;

    public ProductionLineService(ProductionLineRepository productionLineRepository, EmployeeRepository employeeRepository, ProductionLineComponentRepository componentRepository, CarModelRepository carModelRepository) {
        this.productionLineRepository = productionLineRepository;
        this.employeeRepository = employeeRepository;
        this.componentRepository = componentRepository;
        this.carModelRepository = carModelRepository;
    }

    public List<ProductionLine> getAllProductionLines(){
        List<ProductionLineComponent> components = this.componentRepository.findAll();
        List<ProductionLine> productionLines = this.productionLineRepository.findAll();
        List<CarModel> carModels = this.carModelRepository.findAll();
        productionLines.forEach(pl -> components.forEach(c -> {
            if (c.getProductionLine().getId() == pl.getId())
            pl.getComponents().add(c);}));

        return productionLines;
    }

    public Optional<ProductionLine> getProductionLineById(long id){
        return productionLineRepository.findById(id);
    }

    public void deleteProductionLineById(long id){
        productionLineRepository.deleteById(id);
    }

    public ProductionLine saveProductionLine(ProductionLine productionLine){
        List<ProductionLineComponent>  components = productionLine.getComponents();
        productionLine.setComponents(new ArrayList<>());
        productionLineRepository.save(productionLine);

        components.forEach(pc -> {
            List<Employee> employees = pc.getEmployees();
            pc.setEmployees(null);
            pc.setOnDuty(true);
            pc.setProductionLine(productionLine);
            if (pc.getType() == Type.station){
                pc.setEmployees(new ArrayList<>());
                employees.forEach(emp -> {
                    emp.setOnDuty(true);
                    emp.setComponent(pc);
                    employeeRepository.save(emp);
                    pc.getEmployees().add(emp);
                });
            }
            componentRepository.save(pc);
        });
        productionLine.setComponents(components);
        return productionLineRepository.save(productionLine);
    }
}