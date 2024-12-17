package com.prime.backend.config.security.jwt.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.prime.backend.common.enums.TenantType;

import java.time.LocalDateTime;

public interface AuthUserProjection {

    @JsonIgnore
    String getId();

    String getLoginId();

    TenantType getTenantType();

    @JsonIgnore
    String getTenantId();

}
