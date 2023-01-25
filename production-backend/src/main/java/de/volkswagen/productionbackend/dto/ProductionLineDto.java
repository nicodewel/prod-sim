package de.volkswagen.productionbackend.dto;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import de.volkswagen.productionbackend.model.CarModel;
import de.volkswagen.productionbackend.model.Employee;
import de.volkswagen.productionbackend.model.ProductionLine;
import de.volkswagen.productionbackend.model.ProductionLineComponent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration;

import java.lang.reflect.Type;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
public class ProductionLineDto {

    private long id;
    private boolean isRunnable;
    private boolean isActive;
    private CarModel carModel;
    private String componentMap;

}