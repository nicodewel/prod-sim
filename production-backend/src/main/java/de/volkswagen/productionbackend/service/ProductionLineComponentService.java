package de.volkswagen.productionbackend.service;

import de.volkswagen.productionbackend.model.ProductionLineComponent;
import de.volkswagen.productionbackend.repository.ProductionLineComponentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductionLineComponentService {

    private final ProductionLineComponentRepository productionLineComponentRepository;

    public ProductionLineComponentService(ProductionLineComponentRepository productionLineComponentRepository) {
        this.productionLineComponentRepository = productionLineComponentRepository;
    }

    public List<ProductionLineComponent> getAllProductionLineComponents() {
        return this.productionLineComponentRepository.findAll();
    }

    public Optional<ProductionLineComponent> getProductionLineComponentById(long id) {
        return this.productionLineComponentRepository.findById(id);
    }

    public void deleteProductionLineComponentById(long id) {
        this.productionLineComponentRepository.deleteById(id);
    }

    public ProductionLineComponent saveProductionLineComponent(ProductionLineComponent productionLineComponent) {
        return this.productionLineComponentRepository.save(productionLineComponent);
    }
}