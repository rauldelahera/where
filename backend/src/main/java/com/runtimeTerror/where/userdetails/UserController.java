package com.runtimeTerror.where.userdetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserDetailServiceImpl userDetailService;

    @GetMapping
    public List<UserDetailsImpl> getAllUsers() {
        List<UserDetailsImpl> result = userDetailService.userRepository.findAll();
        return result;
    }
}
