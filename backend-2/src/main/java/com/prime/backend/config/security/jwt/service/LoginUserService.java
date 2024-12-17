package com.prime.backend.config.security.jwt.service;

import com.prime.backend.common.enums.TenantType;
import com.prime.backend.config.security.jwt.entity.KosinUser;
import com.prime.backend.config.security.jwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LoginUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Transactional(rollbackFor = Exception.class)
    public KosinUser createDefaultUserData(String password, String userName, String tenantId) {
        KosinUser kosinUser = new KosinUser();
        if(userRepository.findByUsername(userName) == null){
                if(tenantId!=null){
                   kosinUser.setTenantId(tenantId);
                   kosinUser.setTenantType(TenantType.ADMIN);
                }else{
                   kosinUser.setTenantId(kosinUser.getId());
                   kosinUser.setTenantType(TenantType.SUPER_ADMIN);
                }
                   kosinUser.setUsername(userName);
                   kosinUser.setPassword(passwordEncoder.encode(password));
                   userRepository.save(kosinUser);
                   return kosinUser;
        }
        return kosinUser;
    }

}
