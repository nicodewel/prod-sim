package de.volkswagen.productionbackend.mapper;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import de.volkswagen.productionbackend.dto.ProductionLineDto;
import de.volkswagen.productionbackend.model.Employee;
import de.volkswagen.productionbackend.model.ProductionLine;
import de.volkswagen.productionbackend.model.ProductionLineComponent;

import java.lang.reflect.Type;
import java.util.Map;

public class Mapper {

    public static ProductionLineDto mapProductionLine(ProductionLine p) {

        ProductionLineDto res = new ProductionLineDto(
                p.getId(),
                p.isRunnable(),
                p.isActive(),
                p.getCarModel(),
                new Gson().toJson(p.getComponentMap())
        );
        return res;
    }

    public static ProductionLine mapProductionLine(ProductionLineDto p) {
        Type mapType = new TypeToken<Map<String, Employee>>() {
        }.getType();
        ProductionLine res = new ProductionLine(
                p.getId(),
                p.isRunnable(),
                p.isActive(),
                p.getCarModel(),
                new Gson().fromJson(p.getComponentMap(), mapType)
        );
        return res;
    }
}