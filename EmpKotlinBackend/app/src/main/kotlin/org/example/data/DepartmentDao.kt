package org.example.data

import org.example.model.Department
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper
import org.jdbi.v3.sqlobject.statement.SqlQuery

interface DepartmentDao {
    @SqlQuery("SELECT * FROM departments")
    @RegisterBeanMapper(Department::class)
    fun getAll(): List<Department>
}