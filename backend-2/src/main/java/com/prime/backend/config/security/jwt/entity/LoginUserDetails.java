package com.prime.backend.config.security.jwt.entity;

import com.prime.backend.common.enums.TenantType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public class LoginUserDetails {

    @Column(length = 16)
    @Enumerated(EnumType.STRING)
    protected TenantType tenantType;

    @Column(length = 64)
    protected String tenantId;

}
