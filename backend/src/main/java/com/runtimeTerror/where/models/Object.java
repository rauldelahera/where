package com.runtimeTerror.where.models;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@NoArgsConstructor
@Entity
@Table (name = "objects")
public class Object {
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
    private String objectType;

    public Object(String username, String objectName) {
        this.username = username;
        this.objectName = objectName;
    }

    public Object(String username, String objectName, String objectType) {
    }

    public Long getId() {
        return id;
    }

    public String getUsername() { return username; }

    public String getObjectType() { return objectType; }

    public void setObjectType(String objectType) { this.objectType = objectType;}

    public void setUsername(String username) { this.username = username; }

    public String getObjectName() {
        return objectName;
    }

    public void setObjectName(String objectName) {
        this.objectName = objectName;
    }
}
