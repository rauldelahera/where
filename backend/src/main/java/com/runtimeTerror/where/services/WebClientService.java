package com.runtimeTerror.where.services;

import com.amazonaws.services.dataexchange.model.Details;
import com.google.common.net.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class WebClientService {

    @Autowired
    Environment env;

    WebClient webClient = WebClient.create("https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles");

    String response = webClient.post()
            .uri("")
            .header("x-api-key: ", env.getProperty("DVLA_API_KEY"))
            .body(Mono.just(empl), Employee.class)
            .retrieve(
}