package com.runtimeTerror.where.controllers;

import com.runtimeTerror.where.repository.UserRepository;
import com.runtimeTerror.where.services.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


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
            path = "{id}/location/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadLocationImage(@PathVariable("id") Long id,
                                       @RequestParam("file") MultipartFile file){
        fileUploadService.uploadLocationImage(id, file);
    }

    @GetMapping("{userProfileId}/image/download")
    public byte[] downloadUserProfileImage(@PathVariable("userProfileId") Long id) {
        return fileUploadService.downloadUserProfileImage(id);
    }
}