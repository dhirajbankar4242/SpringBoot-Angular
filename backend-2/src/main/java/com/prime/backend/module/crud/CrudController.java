package com.prime.backend.module.crud;

import com.prime.backend.config.exceptions.ApplicationException;
import com.prime.backend.config.exceptions.NoRecordFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("censorDetails")
public class CrudController {

    private final CrudService service;
    @GetMapping
    public List<Crud> getAll(){
        return service.getAll();
    }

    @GetMapping("{id}")
    public void getById(@PathVariable String id) throws NoRecordFoundException {

    }

    @PostMapping
    public void save(@RequestBody CrudDto dto) throws ApplicationException {
        service.save(dto);
    }

    @PutMapping("/trigger")
    public void update(@RequestBody CrudDto dto) throws NoRecordFoundException, ApplicationException {
        service.update(dto);
    }

    @PutMapping("/trigger2")
    public void update2(@RequestBody CrudDto dto) throws NoRecordFoundException, ApplicationException {
        service.update2(dto);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) throws NoRecordFoundException{

    }
}
