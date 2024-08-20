package org.example.resources

import jakarta.inject.Inject
import jakarta.ws.rs.Path
import jakarta.ws.rs.GET
import jakarta.ws.rs.PathParam
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import org.example.services.DesignationService
import org.slf4j.LoggerFactory
@Path("/designation")
class DesignationResource @Inject constructor(private val desigService:DesignationService) {

    private val logger=LoggerFactory.getLogger(DesignationResource::class.java)

    @GET()
    @Path("/{dept_id}")
    @Produces(MediaType.APPLICATION_JSON)
    fun getDepartments(@PathParam("dept_id") dept_id:Int): Response {
        try {
            println("in designation resource")
            val dept = desigService.getAll(dept_id)
            return Response.ok(dept).build()
        } catch (e: Exception) {
            logger.error("Failed to fetch designation", e)
            return Response.serverError().entity("Internal Server Error").build()
        }
    }


}