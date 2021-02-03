package com.station.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import com.station.controller.LocationController;
import com.station.repos.CityDivisionRepository;
import com.station.repos.CityNodesRepository;

import javax.sql.DataSource;

@Component
public class InitializeData {

    @Autowired
    private DataSource dataSource;
    @Autowired
    private CityDivisionRepository divisionRepo;
    @Autowired
    private CityNodesRepository cityNodesRepo;
    
    @EventListener(ApplicationReadyEvent.class)
    public void checkLoadNeeded() {
    	if(divisionRepo.count()==0) {
    		loadData();
    	}
    	if(cityNodesRepo.count() == 0) {
    		cityNodesRepo.saveAll(LocationController.searchStations());
    	}
    }
    public void loadData() {
            ResourceDatabasePopulator resourceDatabasePopulator = new ResourceDatabasePopulator(false, false, "UTF-8", new ClassPathResource("divisiondata.sql"));
        resourceDatabasePopulator.execute(dataSource);
    }
}