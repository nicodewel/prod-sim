package de.volkswagen.productionbackend.service;

import de.volkswagen.productionbackend.model.Robot;
import de.volkswagen.productionbackend.repository.RobotRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RobotService {

    private final RobotRepository robotRepository;

    public RobotService(RobotRepository robotRepository) {
        this.robotRepository = robotRepository;
    }

    public List<Robot> getAllRobots(){
        return robotRepository.findAll();
    }

    public Optional<Robot> getRobotById(long id){
        return robotRepository.findById(id);
    }

    public void deleteRobotById(long id){
        robotRepository.deleteById(id);
    }

    public Robot saveRobot(Robot robot){
        return robotRepository.save(robot);
    }
}