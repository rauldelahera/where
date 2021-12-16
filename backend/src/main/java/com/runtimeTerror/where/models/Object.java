package com.runtimeTerror.where.models;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.text.DateFormat;

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

    private String registrationNumber;

    private Integer co2Emissions;

    private String fuelType;

    private String colour;

    private String make;

    private Integer engineCapacity;

    private Boolean markedForExport;

    private String motStatus;

    private String typeApproval;

    private Integer yearOfManufacture;

    private String taxStatus;

    private String dateOfLastV5CIssued;

    private String taxDueDate;

    private String motExpiryDate;

    private String wheelplan;

    private String monthOfFirstRegistration;

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

    public Object(String username, String objectName, String objectType, String registrationNumber, Integer co2Emissions, String fuelType, String colour, String make, String taxDueDate, String motExpiryDate) {
        this.username = username;
        this.objectName = objectName;
        this.objectType = objectType;
        this.registrationNumber = registrationNumber;
        this.co2Emissions = co2Emissions;
        this.fuelType = fuelType;
        this.colour = colour;
        this.make = make;
        this.taxDueDate = taxDueDate;
        this.motExpiryDate = motExpiryDate;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public Integer getCo2Emissions() {
        return co2Emissions;
    }

    public void setCo2Emissions(Integer co2Emissions) {
        this.co2Emissions = co2Emissions;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getTaxDueDate() {
        return taxDueDate;
    }

    public void setTaxDueDate(String taxDueDate) {
        this.taxDueDate = taxDueDate;
    }

    public String getMotExpiryDate() {
        return motExpiryDate;
    }

    public void setMotExpiryDate(String motExpiryDate) {
        this.motExpiryDate = motExpiryDate;
    }



    public Integer getEngineCapacity() {
        return engineCapacity;
    }

    public void setEngineCapacity(Integer engineCapacity) {
        this.engineCapacity = engineCapacity;
    }

    public Boolean getMarkedForExport() {
        return markedForExport;
    }

    public void setMarkedForExport(Boolean markedForExport) {
        this.markedForExport = markedForExport;
    }

    public String getMotStatus() {
        return motStatus;
    }

    public void setMotStatus(String motStatus) {
        this.motStatus = motStatus;
    }

    public String getTypeApproval() {
        return typeApproval;
    }

    public void setTypeApproval(String typeApproval) {
        this.typeApproval = typeApproval;
    }

    public Integer getYearOfManufacture() {
        return yearOfManufacture;
    }

    public void setYearOfManufacture(Integer yearOfManufacture) {
        this.yearOfManufacture = yearOfManufacture;
    }

    public String getTaxStatus() {
        return taxStatus;
    }

    public void setTaxStatus(String taxStatus) {
        this.taxStatus = taxStatus;
    }

    public String getDateOfLastV5CIssued() {
        return dateOfLastV5CIssued;
    }

    public void setDateOfLastV5CIssued(String dateOfLastV5CIssued) {
        this.dateOfLastV5CIssued = dateOfLastV5CIssued;
    }

    public String getWheelplan() {
        return wheelplan;
    }

    public void setWheelplan(String wheelplan) {
        this.wheelplan = wheelplan;
    }

    public String getMonthOfFirstRegistration() {
        return monthOfFirstRegistration;
    }

    public void setMonthOfFirstRegistration(String monthOfFirstRegistration) {
        this.monthOfFirstRegistration = monthOfFirstRegistration;
    }
}
