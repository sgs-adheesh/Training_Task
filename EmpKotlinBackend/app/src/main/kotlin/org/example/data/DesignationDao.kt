package org.example.data


import org.example.model.Designation
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper
import org.jdbi.v3.sqlobject.customizer.Bind
import org.jdbi.v3.sqlobject.statement.SqlQuery

interface DesignationDao {
    @SqlQuery("SELECT * FROM designations WHERE department_id=:dept_id")
    @RegisterBeanMapper(Designation::class)
    fun getAll(@Bind("dept_id")dept_id:Int): List<Designation>
}