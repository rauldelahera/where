package com.runtimeTerror.where.controllers;


import com.google.common.base.Splitter;
import com.runtimeTerror.where.models.Object;
import com.runtimeTerror.where.services.ObjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/object")
public class ObjectController {

    @Autowired
    ObjectService objectService;

    @GetMapping("{username}/get")
    public List<Object> retrieveUsersObjects(@PathVariable("username") String username) {
        return objectService.findByUsername(username);
    }

    @PostMapping("{username}/add")
    public void saveObjectData(@PathVariable("username") String username, @RequestBody Object object) {
        objectService.saveObject(username, object);

    }
}
