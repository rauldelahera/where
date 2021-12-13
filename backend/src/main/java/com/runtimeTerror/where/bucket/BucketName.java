package com.runtimeTerror.where.bucket;

public enum BucketName {
    PROFILE_IMAGE("wdili");

    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}
