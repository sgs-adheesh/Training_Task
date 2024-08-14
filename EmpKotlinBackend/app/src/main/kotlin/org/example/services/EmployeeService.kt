package org.example.services

import jakarta.inject.Inject
import org.example.data.EmployeeDao
import org.example.model.Employee
import org.jdbi.v3.core.Jdbi

class EmployeeService @Inject constructor(private val jdbi: Jdbi){
    private val db: EmployeeDao =jdbi.onDemand(EmployeeDao::class.java)

    fun addEmployee(emp:Employee):String{
        println("in service addEmp")
        db.addEmployee(emp.getName(),emp.getDepartment(),emp.getDesignation(),emp.getSalary())
        return "Employee added Successfully1"
    }

    fun getAll() :List<Employee>{
        println("in service getEmp")
        return db.getAll()
    }
}