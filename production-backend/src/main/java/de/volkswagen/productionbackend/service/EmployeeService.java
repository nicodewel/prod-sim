package de.volkswagen.productionbackend.service;

import de.volkswagen.productionbackend.model.Employee;
import de.volkswagen.productionbackend.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllEmployees() {
        return this.employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(long id) {
        return this.employeeRepository.findById(id);
    }

    public void deleteEmployeeById(long id) {
        this.employeeRepository.deleteById(id);
    }

    public Employee saveEmployee(Employee employee) {
        return this.employeeRepository.save(employee);
    }
}