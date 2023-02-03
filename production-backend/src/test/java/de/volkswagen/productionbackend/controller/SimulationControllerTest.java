package de.volkswagen.productionbackend.controller;

import de.volkswagen.productionbackend.model.*;
import de.volkswagen.productionbackend.repository.CarModelRepository;
import de.volkswagen.productionbackend.repository.EmployeeRepository;
import de.volkswagen.productionbackend.repository.ProductionLineComponentRepository;
import de.volkswagen.productionbackend.service.ProductionLineService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class SimulationControllerTest {
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

    @BeforeAll
    void setUp() {
        List<ProductionLineComponent> productOrder = new ArrayList<>();

        ProductionLineComponent robot = new ProductionLineComponent();
        robot.setType(Type.robot);
        robot.setName("Robert");
        robot.setProductionTime(2);
        productOrder.add( productionLineComponentRepository.save(robot));

        ProductionLineComponent robot2 = new ProductionLineComponent();
        robot2.setType(Type.robot);
        robot2.setName("Robert");
        robot2.setProductionTime(2);
        productOrder.add( productionLineComponentRepository.save(robot2));

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
    void postSimulation() throws Exception {
        String request = "{\"id\":1,\"name\":\"Lenny\",\"simSpeed\":10,\"simTime\":0,\"timeToCompletion\":0,\"finishedParts\":0,\"carModel\":{\"id\":1,\"name\":\"ID3\",\"complexity\":1},\"components\":[{\"id\":1,\"name\":\"Robert\",\"step\":0,\"productionTime\":2,\"employees\":[],\"type\":\"robot\",\"onDuty\":true},{\"name\":\"Robert1\",\"step\":0,\"productionTime\":2,\"employees\":[],\"type\":\"robot\",\"onDuty\":true},{\"id\":2,\"name\":\"Band1\",\"step\":0,\"productionTime\":3,\"employees\":[{\"id\":1,\"name\":\"Erwin\",\"onDuty\":true}],\"type\":\"station\",\"onDuty\":true}],\"active\":true,\"runnable\":true}";
        mockMvc.perform(post("/simulations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Lenny"))
                .andExpect(jsonPath("$.active").value("true"))
                .andExpect(jsonPath("$.runnable").value("true"));
    }

}