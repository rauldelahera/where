package com.runtimeTerror.where.controllers;

import com.amazonaws.services.identitymanagement.model.UserDetail;
import com.runtimeTerror.where.models.User;
import com.runtimeTerror.where.repository.UserRepository;
import com.runtimeTerror.where.services.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/fileupload")
@CrossOrigin("*")
public class FileUpload {

    private final FileUploadService fileUploadService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    public FileUpload(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

//    @GetMapping
//    public Long getUserProfile() {
//        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User user = userRepository.findByUsername(userDetails.getUsername())
//                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userDetails.getUsername()));
//        return user.getId();
//    }

    @PostMapping(
            path = "{id}/image/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadUserProfileImage(@PathVariable("id") Long id,
                                       @RequestParam("file") MultipartFile file){
        fileUploadService.uploadUserProfileImage(id, file);
    }

    @GetMapping("{userProfileId}/image/download")
    public byte[] downloadUserProfileImage(@PathVariable("userProfileId") Long id) {
        return fileUploadService.downloadUserProfileImage(id);
    }
}