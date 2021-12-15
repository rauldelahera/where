package com.runtimeTerror.where.controllers;

import com.runtimeTerror.where.repository.UserRepository;
import com.runtimeTerror.where.services.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@RestController
@RequestMapping("api/fileupload")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FileUpload {

    private final FileUploadService fileUploadService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    public FileUpload(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @PostMapping(
            path = "{id}/image/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadUserProfileImage(@PathVariable("id") Long id,
                                       @RequestParam("file") MultipartFile file){
        fileUploadService.uploadUserProfileImage(id, file);
    }

    @PostMapping(
            path = "{username}/imagelocation/upload/{objectName}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadUserLocationImage(@PathVariable("username") String username,
                                       @PathVariable("objectName") String objectName,
                                       @RequestParam("file") MultipartFile file){
        System.out.println(objectName);
        fileUploadService.uploadUserLocationImage(username, objectName, file);
    }


    @GetMapping("{userProfileId}/image/download")
    public byte[] downloadUserProfileImage(@PathVariable("userProfileId") Long id) {
        return fileUploadService.downloadUserProfileImage(id);
    }

}