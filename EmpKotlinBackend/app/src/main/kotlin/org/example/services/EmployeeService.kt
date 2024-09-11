package org.example.services

import jakarta.inject.Inject
import org.example.customeException.CustomException
import org.example.data.EmployeeDao
import org.example.model.Employee
import org.jdbi.v3.core.Jdbi

class EmployeeService @Inject constructor(private val jdbi: Jdbi) {
    private val db: EmployeeDao = jdbi.onDemand(EmployeeDao::class.java)

    fun addEmployee(emp: Employee): String {
        println("in service addEmp")

        val employees: List<Employee> = db.getAll().toList()

            if (employees.any{it.getName().equals(emp.getName())}) {
                throw CustomException("Employee name is already existing")
            }

        db.addEmployee(emp.getName(), emp.getDepartment(), emp.getDesignation(), emp.getSalary())
        return "Employee added Successfully"


    }


    fun getAll() :List<Employee>{
        println("in service getEmp")
        return db.getAll()
    }

    fun getById(empId: Int): Employee {
        val emp:Employee = db.getById(empId)
        return emp
    }

    fun deleteById(empId: Int): String {
        db.deleteById(empId)
        return "employee with id ${empId} is deleted"
    }

    fun updateEmployee(emp: Employee): String {
        val employees: List<Employee> = db.getAll().toList()

        if (employees.any{it.getName().equals(emp.getName())} ) {
            if (!employees.any { it.getId().equals(emp.getId()) }) {
                throw CustomException("Employee name is already existing,so can not update name")
            }

        }
        db.updateEmp(emp.getId(),emp.getName(),emp.getDepartment(),emp.getDesignation(),emp.getSalary())
        return "Employee updated"
    }
}