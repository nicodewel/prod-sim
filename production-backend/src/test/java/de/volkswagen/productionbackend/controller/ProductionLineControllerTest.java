package de.volkswagen.productionbackend.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import de.volkswagen.productionbackend.model.*;
import de.volkswagen.productionbackend.repository.CarModelRepository;
import de.volkswagen.productionbackend.repository.EmployeeRepository;
import de.volkswagen.productionbackend.repository.ProductionLineComponentRepository;
import de.volkswagen.productionbackend.repository.ProductionLineRepository;
import de.volkswagen.productionbackend.service.ProductionLineService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ProductionLineControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ProductionLineService productionLineService;
    @Autowired
    private ProductionLineComponentRepository productionLineComponentRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private CarModelRepository carRepository;

    public ProductionLineControllerTest() {

    }

    @BeforeAll
    void setUp() {
        List<ProductionLineComponent> productOrder = new ArrayList<>();

        ProductionLineComponent robot = new ProductionLineComponent();
        robot.setType(Type.robot);
        robot.setName("Robert");
        robot.setProductionTime(2);
        productOrder.add( productionLineComponentRepository.save(robot));

        Employee employee = new Employee();
        employee.setName("Erwin");
        Employee empToSave = employeeRepository.save(employee);


        ProductionLineComponent station = new ProductionLineComponent();
        station.setType(Type.station);
        station.setProductionTime(3);
        station.setName("Band1");
        ProductionLineComponent stationToSave = productionLineComponentRepository.save(station);
        stationToSave.getEmployees().add(empToSave);
        productOrder.add( stationToSave);

        CarModel carModel = new CarModel();
        carModel.setName("ID3");
        carModel.setComplexity(1.0f);
        CarModel carToAdd = carRepository.save(carModel);

        ProductionLine line = ProductionLine.builder()
                .name("Lenny")
                .isActive(true)
                .components(productOrder)
                .isRunnable(true)
                .build();

        ProductionLine line1 = productionLineService.saveProductionLine(line);
        line1.setCarModel(carToAdd);
        ProductionLine line2 = productionLineService.saveProductionLine(line1);

    }


    @Test
    void getConfigurations() throws Exception {
        mockMvc.perform(get("/productionLines"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Lenny"))
                .andExpect(jsonPath("$[0].carModel.name").value("ID3"))
                .andExpect(jsonPath("$[0].active").value("true"))
                .andExpect(jsonPath("$[0].components.length()").value(2));
    }

    @Test
    void postProductLine() throws Exception {
        String request = "{\"name\":\"Franz\",\"carModel\":{\"name\":\"ID4\",\"complexity\":1},\"components\":[{\"id\":\"2\",\"type\":\"station\",\"productionTime\":2,\"employees\":[{\"id\":\"1\",\"name\":\"Hans\"}],\"name\":\"Band2\"},{\"id\":\"1\",\"productionTime\":2,\"lifetime\":0,\"name\":\"Roberto\"}],\"active\":false,\"runnable\":true}";
        mockMvc.perform(post("/productionLines")
                .contentType(MediaType.APPLICATION_JSON)
                .content(request))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Franz"))
                .andExpect(jsonPath("$.carModel.name").value("ID4"))
                .andExpect(jsonPath("$.active").value("false"))
        ;
    }
}