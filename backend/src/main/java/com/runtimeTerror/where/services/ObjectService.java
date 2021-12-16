package com.runtimeTerror.where.services;

import com.runtimeTerror.where.models.Object;
import com.runtimeTerror.where.repository.ObjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ObjectService {

    @Autowired
    ObjectRepository objectRepository;

    public void saveObject(String username, Object object) {
        object.setUsername(username);
        objectRepository.save(object);
    }



    public List<Object> findByUsername(String username) {
        return objectRepository.findAllByUsername(username);
    }
}
