package com.runtimeTerror.where.payload.response;

import com.runtimeTerror.where.payload.request.LoginRequest;
import com.runtimeTerror.where.payload.request.SignupRequest;
import com.runtimeTerror.where.payload.response.JwtResponse;
import com.runtimeTerror.where.payload.response.MessageResponse;

public class MessageResponse {
    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
