package com.prime.backend.common;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PasswordGenrator {
    public char[] generatePswd(int len){
        String charsCaps="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String Chars="abcdefghijklmnopqrstuvwxyz";
        String nums="0123456789";
        String symbols="!@#$%^&*()_+-=.,/';:?><~*/-+";
        String passSymbols=charsCaps + Chars + nums +symbols;
        Random rnd=new Random();
        char[] password=new char[len];
        for(int i=0; i<len;i++){
            password[i]=passSymbols.charAt(rnd.nextInt(passSymbols.length()));
        }
        return password;
    }

}
