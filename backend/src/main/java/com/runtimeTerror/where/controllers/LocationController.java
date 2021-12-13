package com.runtimeTerror.where.controllers;

import com.runtimeTerror.where.models.Location;
import com.runtimeTerror.where.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/location")
public class LocationController {

    @Autowired
    LocationService locationService;


    @PostMapping("{username}/add")
    public void saveLocationData(@PathVariable("username") String username,
                                 @RequestBody Location location) {
        Location newLocation = new Location(location.getUsername(), location.getObjectName(),
                location.getLatitude(), location.getLongitude());
        newLocation.setUsername(username);
        locationService.saveLocationData(newLocation);
    }

    @DeleteMapping("{username}/delete")
    public void deleteLocationData(@PathVariable("username") String username, @RequestBody Location location) {
        Location existingLocation = new Location(location.getUsername(), location.getObjectName(),
                location.getLatitude(), location.getLongitude());
        existingLocation.setUsername(username);
        locationService.deleteLocationData(existingLocation);
    }


}
