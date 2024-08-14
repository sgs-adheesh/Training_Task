package org.example
import io.dropwizard.core.Configuration;
import io.dropwizard.db.DataSourceFactory;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;



class Configuration :Configuration(){
    @Valid
    @NotNull
    @JsonProperty("database")
    val database:DataSourceFactory= DataSourceFactory();
}