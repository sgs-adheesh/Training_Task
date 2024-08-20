package org.example.model

class Designation(
    private var id: Int = 0,                // Default value for no-argument constructo
    private var designation: String = "",
    private var department_id: Int = 0
) {
    fun getId(): Int {
        return id
    }

    fun getDesignation(): String {
        return designation
    }

    fun getDepartment_id():Int{
        return department_id
    }

    fun setId(id: Int) {
        this.id = id
    }

    fun setDesignation(designation: String) {
        this.designation = designation
    }

    fun setDepartment_id(department_id:Int){
        this.department_id=department_id
    }

}