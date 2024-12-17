package com.prime.backend.config;

import com.prime.backend.config.security.jwt.service.LoginUserService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Log4j2
public class StartUp {

    @Autowired
    private final LoginUserService loginUserService;

    @PostConstruct
    void doInit() {

        log.info("<==============================Application Starting==========================================>");
        try {
            createDefaultUser();
        } catch (Exception e) {
            log.info("Error While Creating default setting --->" + e.getMessage(), e);
        }
        log.info("<=====>***<============>Application Started<===========>***<=================================>");
    }

    private void createDefaultUser() {
            loginUserService.createDefaultUserData("Super@1234", "SUPER_ADMIN", null);
        }

    }



