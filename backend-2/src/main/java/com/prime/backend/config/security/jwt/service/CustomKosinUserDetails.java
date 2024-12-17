package com.prime.backend.config.security.jwt.service;

import com.prime.backend.common.enums.TenantType;
import com.prime.backend.config.security.jwt.entity.KosinUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CustomKosinUserDetails extends KosinUser implements UserDetails {

    String id;
    private String username;
    private String password;
    Collection<? extends GrantedAuthority> authorities;

    public CustomKosinUserDetails(String id, String tenantId, TenantType tenantType) {
        this.id = id;
        this.tenantId = tenantId;
        this.tenantType = tenantType;
    }

    public CustomKosinUserDetails(KosinUser byUsername) {
        this.setId(byUsername.getId());
        this.username = byUsername.getUsername();
        this.password= byUsername.getPassword();
        this.tenantId = byUsername.getTenantId();
        List<GrantedAuthority> auths = new ArrayList<>();
        this.authorities = auths;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public TenantType getTenantType(){
        return tenantType;
    }

    public void setTenantType(TenantType tenantType){
        this.tenantType = tenantType;
    }

}
