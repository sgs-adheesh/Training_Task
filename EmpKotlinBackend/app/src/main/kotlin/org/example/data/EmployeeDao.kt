package org.example.data

import org.example.model.Employee
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper
import org.jdbi.v3.sqlobject.customizer.Bind
import org.jdbi.v3.sqlobject.statement.SqlQuery
import org.jdbi.v3.sqlobject.statement.SqlUpdate

interface EmployeeDao {
    @SqlUpdate("INSERT INTO employees (name, department, designation, salary) VALUES (:name, :department, :designation, :salary)")
    fun addEmployee(
        @Bind("name") name: String,
        @Bind("department") department: String,
        @Bind("designation") designation: String,
        @Bind("salary") salary: Double
    )

    @SqlQuery("SELECT * FROM employees")
    @RegisterBeanMapper(Employee::class)
    fun getAll():List<Employee>
}