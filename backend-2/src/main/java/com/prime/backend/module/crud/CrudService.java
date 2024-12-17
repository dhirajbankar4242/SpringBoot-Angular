package com.prime.backend.module.crud;

import com.prime.backend.common.CustomId;
import com.prime.backend.config.exceptions.ApplicationException;
import com.prime.backend.config.exceptions.NoRecordFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class CrudService {

    private final CustomId customId;
    private final CrudRepository repository;

    public List<Crud> getAll(){
        return repository.findAll();
    }

    public void getById(String id){

    }

    @Transactional(rollbackFor = Exception.class)
    public void save(CrudDto dto) throws ApplicationException {
        String newId = customId.generateCustomId();
        Crud crud = new Crud();
        crud.setId(newId);
        crud.copyData(dto);
        repository.save(crud);
    }

    @Transactional(rollbackFor = Exception.class)
    public void update(CrudDto  dto) throws NoRecordFoundException, ApplicationException{
       Optional<Crud> crudOptional =  repository.findById(dto.getId());
       if(crudOptional.isPresent()){
           Crud crud = crudOptional.get();
           crud.setAlarm("Triggered");
           repository.save(crud);
       }else{
           throw new NoRecordFoundException();
       }
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(String id) throws NoRecordFoundException{

    }
}
