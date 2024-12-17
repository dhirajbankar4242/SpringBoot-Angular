package com.prime.backend.config.security.jwt.user;


import com.prime.backend.config.exceptions.ApplicationException;
import com.prime.backend.config.security.jwt.dto.AuthUserProjection;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.Optional;

public interface UserService {

    Optional<AuthUserProjection> getAuthUserByLoginId(String username);

}
