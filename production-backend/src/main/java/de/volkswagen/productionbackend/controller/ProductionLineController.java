package de.volkswagen.productionbackend.controller;

import de.volkswagen.productionbackend.model.ProductionLine;
import de.volkswagen.productionbackend.service.ProductionLineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
public class ProductionLineController {

    private final ProductionLineService productionLineService;

    public ProductionLineController(ProductionLineService productionLineService) {
        this.productionLineService = productionLineService;
    }

    @GetMapping("/productionLines")
    public ResponseEntity<List<ProductionLine>> getAll(){
        return ResponseEntity.ok(productionLineService.getAllProductionLines());
    }

    @GetMapping("/productionLines/{id}")
    public ResponseEntity<ProductionLine> getById(@PathVariable long id){
        if (productionLineService.getProductionLineById(id).isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(productionLineService.getProductionLineById(id).get());
    }

    @PostMapping("/productionLines")
    public ResponseEntity<ProductionLine> save(@RequestBody ProductionLine productionLine){
        System.out.println (productionLine);
        return ResponseEntity.ok(productionLineService.saveProductionLine(productionLine));
    }


}