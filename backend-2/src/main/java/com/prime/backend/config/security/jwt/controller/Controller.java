package com.prime.backend.config.security.jwt.controller;

import com.prime.backend.config.exceptions.ApplicationException;
import com.prime.backend.config.security.jwt.dto.*;
import com.prime.backend.config.security.jwt.repository.UserRepository;
import com.prime.backend.config.security.jwt.service.CustomKosinUserDetails;
import com.prime.backend.config.security.jwt.service.JwtService;
import com.prime.backend.config.security.jwt.service.LoginUserService;
import com.prime.backend.config.security.jwt.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class Controller {

    @Autowired
    private  UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private LoginUserService loginUserService;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;


@PostMapping("/login")
public JwtResponseDTO AuthenticateAndGetToken(@RequestBody AuthRequestDTO authRequestDTO) throws ApplicationException {
    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword()));
    if(authentication.isAuthenticated()){
        AuthUserProjection authUserProjection = userService.getAuthUserByLoginId(authRequestDTO.getUsername()).orElseThrow(() -> new ApplicationException("Application exception user not found"));
        CustomKosinUserDetails customUserDetails = new CustomKosinUserDetails(authUserProjection.getId(),authUserProjection.getTenantId(),authUserProjection.getTenantType());
        return new JwtResponseDTO(jwtService.GenerateToken(customUserDetails.getTenantId(),authRequestDTO.getUsername(),customUserDetails.getTenantType()));
    } else {
        throw new UsernameNotFoundException("invalid user request..!!");
    }
}


}
