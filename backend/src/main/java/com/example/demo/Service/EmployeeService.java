package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Employee;
import com.example.demo.Repository.EmployeeRepository;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Create

    public Employee createEmployee(Employee employee) {
        // Add any additional business logic before saving (e.g., generating employeeId)
        return employeeRepository.save(employee);

    }

    // Read
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(String id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public List<Employee> getEmployeesByDepartment(String department) {
        return employeeRepository.findByDepartment(department);
    }

    // Update
    public Employee updateEmployee(Employee employee) {
        // Add any business logic for updating (e.g., checking if employee exists)
        return employeeRepository.save(employee);
    }

    // Delete
    public void deleteEmployee(String id) {
        employeeRepository.deleteById(id);
    }
}