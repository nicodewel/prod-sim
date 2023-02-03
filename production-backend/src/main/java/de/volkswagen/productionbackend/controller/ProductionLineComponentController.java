package de.volkswagen.productionbackend.controller;

import de.volkswagen.productionbackend.model.ProductionLineComponent;
import de.volkswagen.productionbackend.service.ProductionLineComponentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductionLineComponentController {

    private final ProductionLineComponentService productionLineComponentService;

    public ProductionLineComponentController(ProductionLineComponentService productionLineComponentService) {
        this.productionLineComponentService = productionLineComponentService;
    }

    @GetMapping("/productionLineComponents")
    public ResponseEntity<List<ProductionLineComponent>> getAll() {
        return ResponseEntity.ok(this.productionLineComponentService.getAllProductionLineComponents());
    }

    @GetMapping("/productionLineComponents/{id}")
    public ResponseEntity<ProductionLineComponent> getById(@PathVariable long id) {
        if (this.productionLineComponentService.getProductionLineComponentById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(this.productionLineComponentService.getProductionLineComponentById(id).get());
    }

    @PostMapping("/productionLineComponents")
    public ResponseEntity<ProductionLineComponent> save(@RequestBody ProductionLineComponent productionLineComponent) {
        return ResponseEntity.ok(this.productionLineComponentService.saveProductionLineComponent(productionLineComponent));
    }
}