package com.runtimeTerror.where.controllers;


import com.google.common.base.Splitter;
import com.runtimeTerror.where.models.Object;
import com.runtimeTerror.where.services.LocationService;
import com.runtimeTerror.where.services.ObjectService;
import com.runtimeTerror.where.services.WebClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/object")
public class ObjectController {

    @Autowired
    ObjectService objectService;

    @Autowired
    WebClientService webClientService;

    @Autowired
    LocationService locationService;


    @GetMapping("{username}/get")
    public List<Object> retrieveUsersObjects(@PathVariable("username") String username) {
        return objectService.findByUsername(username);
    }

    @PostMapping("{username}/add")
    public void saveObjectData(@PathVariable("username") String username, @RequestBody Object object) throws IOException, InterruptedException {
        if (object.getRegistrationNumber() != null || object.getRegistrationNumber() == ""){
        String licencePlate = object.getRegistrationNumber();
        String processed = licencePlate.replaceAll("[^\\p{IsAlphabetic}\\p{IsDigit}]", "");
        String objectName = object.getObjectName();
        webClientService.getDVLAContent(username, objectName, processed);
        }
        else {
        objectService.saveObject(username, object);}
    }

    @PostMapping("{username}/dvla/{objectName}")
    public void getDVLAData(@PathVariable("username") String username,
                            @PathVariable("objectName") String objectName,
                            @RequestBody String licencePlate) throws IOException, InterruptedException {
        String processed = licencePlate.replaceAll("[^\\p{IsAlphabetic}\\p{IsDigit}]", "");
        webClientService.getDVLAContent(username, objectName, processed);
    }
}
