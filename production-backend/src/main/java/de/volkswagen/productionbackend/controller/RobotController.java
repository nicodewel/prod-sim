package de.volkswagen.productionbackend.controller;

import de.volkswagen.productionbackend.model.Robot;
import de.volkswagen.productionbackend.service.RobotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
public class RobotController {

    private final RobotService robotService;

    public RobotController(RobotService robotService) {
        this.robotService = robotService;
    }

    @GetMapping("/robots")
    public ResponseEntity<List<Robot>> getAll(){
        return ResponseEntity.ok(robotService.getAllRobots());
    }

    @GetMapping("/robots/{id}")
    public ResponseEntity<Robot> getById(@PathVariable long id){
        if (robotService.getRobotById(id).isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(robotService.getRobotById(id).get());
    }

    @PostMapping("/robots")
    public ResponseEntity<Robot> save(@RequestBody Robot robot){
        return ResponseEntity.ok(robotService.saveRobot(robot));
    }


}