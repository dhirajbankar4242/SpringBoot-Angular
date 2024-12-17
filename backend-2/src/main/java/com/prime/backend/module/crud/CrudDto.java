package com.prime.backend.module.crud;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CrudDto {

    private String id;

    private String entryName;

    private String humidity;

    private String temp;


    private String alarm;
}
