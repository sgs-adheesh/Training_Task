package org.example.services

import jakarta.inject.Inject
import org.example.data.DepartmentDao
import org.example.model.Department
import org.jdbi.v3.core.Jdbi

class DepartmentService @Inject constructor(private val jdbi:Jdbi) {

    private val db: DepartmentDao =jdbi.onDemand(DepartmentDao::class.java)


    fun getAll(): List<Department> {
        println("in dept service")
        return db.getAll()
    }



}
