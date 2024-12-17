package com.prime.backend.config.security.jwt.repository;

import com.prime.backend.config.security.jwt.dto.AuthUserProjection;
import com.prime.backend.config.security.jwt.entity.KosinUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<KosinUser, String> {
     KosinUser findByUsername(String username);

    @Query(value = "select id, tenant_id AS tenantId, tenant_type AS tenantType from kosin_user u where u.username = :username", nativeQuery = true)
    Optional<AuthUserProjection> getAuthUserByLoginId(String username);

}
