package com.runtimeTerror.where.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table( name= "locations",
        uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username", "objectName"})
        })
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 30)
    private String objectName;

    @NotBlank
    @Size(max = 30)
    private Double longitude;

    @NotBlank
    @Size(max = 30)
    private Double latitude;

    public Location(String username, String objectName, Double longitude, Double latitude) {
        this.username = username;
        this.objectName = objectName;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public Location() {

    }

    public Long getId() {
        return id;
    }

    public String getObjectName() {
        return objectName;
    }

    public void setObjectName(String objectName) {
        this.objectName = objectName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }
}
