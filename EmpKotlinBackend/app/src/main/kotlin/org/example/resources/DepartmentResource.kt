package org.example.resources

import jakarta.inject.Inject
import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import org.example.services.DepartmentService
import org.slf4j.LoggerFactory


@Path("/department")
class DepartmentResource @Inject constructor(private val deptService: DepartmentService){

    private val logger=LoggerFactory.getLogger(DepartmentResource::class.java)

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    fun getDepartments(): Response {
        try {
            println("in dept resource")
            val dept = deptService.getAll()
            return Response.ok(dept).build()
        } catch (e: Exception) {
            logger.error("Failed to fetch departments", e)
            return Response.serverError().entity("Internal Server Error").build()
        }
    }

}