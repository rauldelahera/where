package com.runtimeTerror.where.services;

import com.runtimeTerror.where.models.Location;
import com.runtimeTerror.where.models.Object;
import com.runtimeTerror.where.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        Location location = locationRepository.findByUsername(username).get(0);
        locationRepository.deleteById(location.getId());
    }

//    public Location getLocationData(Location location){
//        String username = location.getUsername();
//        return locationRepository.findByUsername(username).get(0);
//    }

}
