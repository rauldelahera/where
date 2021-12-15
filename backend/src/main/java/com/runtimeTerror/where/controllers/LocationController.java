package com.runtimeTerror.where.controllers;

import com.runtimeTerror.where.models.Location;
import com.runtimeTerror.where.payload.request.LoginRequest;
import com.runtimeTerror.where.payload.response.JwtResponse;
import com.runtimeTerror.where.security.jwt.JwtUtils;
import com.runtimeTerror.where.security.services.UserDetailsImpl;
import com.runtimeTerror.where.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/location")
public class LocationController {

    @Autowired
    LocationService locationService;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/{username}/add")
    public void saveLocationData(@PathVariable("username") String username,
                                 @RequestBody Location location) {
        locationService.saveLocationData(username, location);
    }

    @DeleteMapping("/{username}/delete")
    public void deleteLocationData(@PathVariable("username") String username, @RequestBody Location location) {
        Location existingLocation = new Location(location.getUsername(), location.getObjectName(),
                location.getLatitude(), location.getLongitude());
        existingLocation.setUsername(username);
        locationService.deleteLocationData(existingLocation);
    }

    @GetMapping("/{username}/get")
    public List<Location> get(@PathVariable String username) {
        return  locationService.getLocationData(username);
    }



}
