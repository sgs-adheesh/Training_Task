package org.example.model

data class Department(
    private var id: Int = 0,                // Default value for no-argument constructo
    private var department: String = ""
) {
    fun getId(): Int {
        return id
    }

    fun getDepartment(): String {
        return department
    }

    fun setId(id: Int) {
        this.id = id
    }

    fun setDepartment(department: String) {
        this.department = department
    }
}