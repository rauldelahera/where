package com.runtimeTerror.where.services;

import com.runtimeTerror.where.models.Location;
import com.runtimeTerror.where.models.Object;
import com.runtimeTerror.where.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    LocationRepository locationRepository;


    public void saveLocationData(String username, Location location) {
        Location newLocation = new Location(location.getUsername(), location.getObjectName(),
                location.getLatitude(), location.getLongitude());
        newLocation.setUsername(username);
        locationRepository.save(location);
    }

    public void deleteLocationData(Location existingLocation) {
        String username = existingLocation.getUsername();
        String objectName = existingLocation.getObjectName();
        Location location = locationRepository.findByUsernameAndObjectName(username, objectName).get(0);
        locationRepository.deleteById(location.getId());
    }

    public List<Location> findByUsername(String username) {
        return locationRepository.findByUsername(username);
    }

    public List<Location> getLocationData(String username){
        return locationRepository.findByUsername(username);
    }

//    public Location getLocationData(Location location){
//        String username = location.getUsername();
//        return locationRepository.findByUsername(username).get(0);
//    }

}
