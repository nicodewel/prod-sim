package de.volkswagen.productionbackend.repository;

import de.volkswagen.productionbackend.model.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee,Long> {
}