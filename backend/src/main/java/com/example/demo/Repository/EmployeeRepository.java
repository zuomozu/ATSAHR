package com.example.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.Entity.Employee;
import java.util.List;

public interface EmployeeRepository extends MongoRepository<Employee, String> {

    // Find employees by various criteria

    List<Employee> findByJobDetailsEmployeeId(String employeeId);

    List<Employee> findByLastName(String lastName);

    List<Employee> findByDepartment(String department);

    // Find employees with active employment (endDate is null)
    List<Employee> findByJobDetailsEndDateIsNull();

    // Find employees by manager
    List<Employee> findByJobDetailsManagerId(String managerId);

    // ... Add more query methods as needed based on your specific use cases
}