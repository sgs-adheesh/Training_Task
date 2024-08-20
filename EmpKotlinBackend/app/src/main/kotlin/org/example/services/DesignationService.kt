package org.example.services

import jakarta.inject.Inject
import org.example.data.DesignationDao
import org.example.model.Designation
import org.jdbi.v3.core.Jdbi

class DesignationService @Inject constructor(private val jdbi: Jdbi){
    private val db:DesignationDao=jdbi.onDemand(DesignationDao::class.java)

    fun getAll(dept_i:Int):List<Designation>{
        return db.getAll(dept_i)
    }
}