package com.station.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import com.station.repos.CityDivisionRepository;

import javax.sql.DataSource;

@Component
public class InitializeData {

    @Autowired
    private DataSource dataSource;
    @Autowired
    private CityDivisionRepository divisionRepo;

    @EventListener(ApplicationReadyEvent.class)
    public void checkLoadNeeded() {
    	if(divisionRepo.count()==0) {
    		loadData();
    	}
    }
    public void loadData() {
            ResourceDatabasePopulator resourceDatabasePopulator = new ResourceDatabasePopulator(false, false, "UTF-8", new ClassPathResource("divisiondata.sql"));
        resourceDatabasePopulator.execute(dataSource);
    }
}