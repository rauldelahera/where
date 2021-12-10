package com.runtimeTerror.where.AmazonConfig;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.AmazonS3EncryptionClientV2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.amazonaws.auth.profile.internal.ProfileKeyConstants.AWS_ACCESS_KEY_ID;
import static com.amazonaws.auth.profile.internal.ProfileKeyConstants.AWS_SECRET_ACCESS_KEY;

@Configuration
public class AmazonConfig {

    @Bean
    public AmazonS3 s3() {
        AWSCredentials awsCredentials = new BasicAWSCredentials("", "");

        return AmazonS3ClientBuilder
                .standard()
                .withRegion(Regions.EU_WEST_2)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}