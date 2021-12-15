package com.runtimeTerror.where.services;

import com.runtimeTerror.where.models.Location;
import com.runtimeTerror.where.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    LocationRepository locationRepository;


    public void saveLocationData(Location location) {
        locationRepository.save(location);
    }

    public void deleteLocationData(Location existingLocation) {
        String username = existingLocation.getUsername();
        String objectName = existingLocation.getObjectName();
        Location location = locationRepository.findByUsernameAndObjectName(username, objectName).get(0);
        locationRepository.deleteById(location.getId());
    }

    public List<Location> getLocationData(String username){
        return locationRepository.findByUsername(username);
    }

}
