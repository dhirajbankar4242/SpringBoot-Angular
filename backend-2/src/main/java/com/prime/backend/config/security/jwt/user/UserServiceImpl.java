package com.prime.backend.config.security.jwt.user;


import com.prime.backend.config.security.jwt.dto.AuthUserProjection;
import com.prime.backend.config.security.jwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public Optional<AuthUserProjection> getAuthUserByLoginId(String username) {
        return userRepository.getAuthUserByLoginId(username);
    }



}



