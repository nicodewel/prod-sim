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