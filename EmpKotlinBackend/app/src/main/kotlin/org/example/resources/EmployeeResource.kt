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
         try {
            println("in resource post")
            val resp=empService.addEmployee(emp)
            return Response.ok(resp).build()
        } catch (e: Exception) {
            logger.error("Failed to add employee", e)
            return Response.status(Response.Status.CONFLICT).entity("Internal Server Error..Failed to add employee").build()
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

    @GET
    @Path("/{emp_id}")
    @Produces(MediaType.APPLICATION_JSON)
    fun getEmployeeById(@PathParam("emp_id")emp_id:Int):Response{
        try {
            val emp=empService.getById(emp_id)
            return Response.ok(emp).build()
        }
        catch (e: Exception){
            logger.error("Failed to fetch employee", e)
            return Response.serverError().entity("Internal Server Error").build()
        }
    }

    @DELETE
    @Path("/{emp_id}")
    fun deleteEmployee(@PathParam("emp_id")emp_id:Int):Response{
        try {
            return Response.ok(empService.deleteById(emp_id)).build()
        }
        catch (e:Exception){
            logger.error("Failed to fetch employee", e)
            return Response.serverError().entity("Internal Server Error").build()
        }
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    fun updateEmployee(emp:Employee):Response {
        try {
            val resp = empService.updateEmployee(emp)
            return Response.ok(resp).build()
        } catch (e: Exception) {
            logger.error("Failed to update employee", e)
            return Response.status(Response.Status.CONFLICT).entity("Internal Server Error..Failed to add employee").build()
        }
    }


}

