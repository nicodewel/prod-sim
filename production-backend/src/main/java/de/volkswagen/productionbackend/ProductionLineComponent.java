package de.volkswagen.productionbackend;


import de.volkswagen.productionbackend.model.ProductionLine;

public interface ProductionLineComponent {

    boolean addToProductionLine(ProductionLine pl);
}