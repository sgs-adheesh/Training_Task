package org.example.resources

import jakarta.inject.Inject
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import org.example.model.Employee
import org.example.services.EmployeeService
import org.slf4j.LoggerFactory


@Path("/employee")
class EmployeeResource @Inject constructor(private val empService:EmployeeService) {

    private val logger = LoggerFactory.getLogger(EmployeeResource::class.java)

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    fun addEmployee(emp:Employee):Response{
        return try {
            println("in resorce post")
            var resp=empService.addEmployee(emp)
            Response.status(Response.Status.CREATED).build()
        } catch (e: Exception) {
            logger.error("Failed to add employee", e)
            Response.serverError().entity("Internal Server Error").build()
        }
    }




    @GET
    @Produces(MediaType.APPLICATION_JSON)
    fun getEmployees(): Response {
        try {
            val employees = empService.getAll()
            return Response.ok(employees).build()
        } catch (e: Exception) {
            logger.error("Failed to fetch employees", e)
           return Response.serverError().entity("Internal Server Error").build()
        }
    }
}

//fun getEmployee(): List<Employee> {
//    println("in resorce get")
//    return empService.getAll()
//}