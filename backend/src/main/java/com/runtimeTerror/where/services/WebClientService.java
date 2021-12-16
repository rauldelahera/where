package com.runtimeTerror.where.services;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.runtimeTerror.where.models.Object;
import com.runtimeTerror.where.repository.ObjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;


@Service
public class WebClientService {

    @Autowired
    Environment env;

    @Autowired
    ObjectRepository objectRepository;

    public void getDVLAContent(String username, String objectName, String licencePlate) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        String queryPlate = String.format("{\"registrationNumber\":\"%s\"}", licencePlate);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles"))
                .header("Content-Type", "application/json")
                .header("x-api-key", "")
                .POST(HttpRequest.BodyPublishers.ofString(queryPlate))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        storeData(username, objectName, response.body());
    }

    public void storeData(String username, String objectName, String response) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Object carObject = new Object();
        carObject = objectMapper.readValue(response, Object.class);
        carObject.setUsername(username);
        carObject.setObjectType("car");
        carObject.setObjectName(objectName);
        objectRepository.save(carObject);
    }
}
