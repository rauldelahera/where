package com.runtimeTerror.where.services;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.lang.GeoLocation;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.GpsDirectory;
import com.runtimeTerror.where.bucket.BucketName;
import com.runtimeTerror.where.filestore.FileStore;
import com.runtimeTerror.where.models.Location;
import com.runtimeTerror.where.models.User;
import com.runtimeTerror.where.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

import static org.apache.http.entity.ContentType.*;

@Service
public class FileUploadService  {

    private final UserRepository userRepository;

    private final FileStore fileStore;

    @Autowired
    LocationService locationService;

    @Autowired
    public FileUploadService(UserRepository userRepository, FileStore fileStore) {
        this.userRepository = userRepository;
        this.fileStore = fileStore;
    }

    User getUserProfile(Long id) {
        return userRepository.findUserById(id);
    }

    public void uploadUserProfileImage(Long id, MultipartFile file) {
        isFileEmpty(file);
        isImage(file);
        User user = getUserProfile(id);
        try {
            extractGPSFromMeta(user, file);
        } catch (Exception e) {}
        Map<String, String> metadata = extractMetaData(file);
        String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), user.getId());
        String filename = String.format("%s-%s", UUID.randomUUID(), file.getOriginalFilename());
        try {
            fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
            user.setUserProfileImageLink(filename);
            userRepository.save(user);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    public void uploadLocationImage(Long id, MultipartFile file) {
        isFileEmpty(file);
        isImage(file);
        User user = getUserProfile(id);
        Map<String, String> metadata = extractMetaData(file);
        String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), user.getId());
        String filename = String.format("%s-%s", UUID.randomUUID(), file.getOriginalFilename());
        try {
            fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
            user.setUserProfileImageLink(filename);
            userRepository.save(user);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    private void extractGPSFromMeta(User user, MultipartFile file) throws IOException, ImageProcessingException {
        Metadata metadata = ImageMetadataReader.readMetadata(file.getInputStream());
        GpsDirectory gpsDirectory = metadata.getFirstDirectoryOfType(GpsDirectory.class);
        GeoLocation location = gpsDirectory.getGeoLocation();
        String username = user.getUsername();
        double lat = location.getLatitude();
        double lng = location.getLongitude();
        Location newLocation = new Location(username, " ", lat, lng);
        locationService.saveLocationData(username, newLocation);
        }

    private Map<String, String> extractMetaData(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        return metadata;
    }

    private void isImage(MultipartFile file) {
        if (!Arrays.asList(IMAGE_JPEG.getMimeType(), IMAGE_PNG.getMimeType(), IMAGE_GIF.getMimeType()).contains(file.getContentType())) {
            throw new IllegalStateException("File must be an image" + file.getContentType());
        }
    }

    private void isFileEmpty(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalStateException("Sorry, this file is empty");
        }
    }

    public byte[] downloadUserProfileImage(Long id) {
        User user = getUserProfile(id);
        String path = String.format("%s/%s",
                BucketName.PROFILE_IMAGE.getBucketName(),
                user.getId());

        return user.getUserProfileImageLink()
                .map(key -> fileStore.download(path, key))
                .orElse(new byte[0]);
    }


//    private User getUserProfileorThrow(Long id) {
//        return User
//                .getUserProfile(id)
//                .stream()
//                .filter(userProfile -> userProfile.getUserProfileId().equals(userProfileID))
//                .findFirst()
//                .orElseThrow(() -> new IllegalStateException(String.format("User profile %s not found", userProfileID)));
//    }
}
