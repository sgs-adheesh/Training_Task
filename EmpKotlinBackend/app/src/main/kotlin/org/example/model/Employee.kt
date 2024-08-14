package org.example.model

data class Employee(
    private var id: Int = 0,                // Default value for no-argument constructor
    private var name: String = "",
    private var department: String = "",
    private var designation: String = "",
    private var salary: Double = 0.0
) {

    fun getId(): Int {
        return id
    }

    fun getName(): String {
        return name
    }

    fun getDepartment(): String {
        return department
    }

    fun getDesignation(): String {
        return designation
    }

    fun getSalary(): Double {
        return salary
    }

    fun setId(id: Int) {
        this.id = id
    }

    fun setName(name: String) {
        this.name = name
    }

    fun setDepartment(department: String) {
        this.department = department
    }

    fun setDesignation(designation: String) {
        this.designation = designation
    }

    fun setSalary(salary: Double) {
        this.salary = salary
    }
}







/*DB Schema:
Table name : employee_master
Columns :
emp_id bigint primary key identity seed( should start from 1001)
emp_guid uuid not null
emp_name nvarchar(500) not null
department nvarchar(500) not null
desgination nvarchar(500) not null
salary decimal not null
allowance decimal not null default(0)
Kotlin:
Endpoint name : /api/v1/employee
Endpoint type: POST
Endpoint should use SetAllowance() which will set the allowance as 20% of salary to Manager designation and 10% to all other designations and add this allowance to Salary of employee
Should not use stored procedure
Use direct query(read from file)
to connect postgres db use below packages
"org.postgresql:postgresql"
"org.jdbi:jdbi3-postgres"
"org.jdbi:jdbi3-sqlobject"
Use 3 layer architecture controller, service, data layers
Use Gradlew */