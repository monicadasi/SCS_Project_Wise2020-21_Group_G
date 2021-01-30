package com.station.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.station.bean.CityDivision;
import com.station.repos.CityDivisionRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SampleController {
	@Autowired
	CityDivisionRepository cityDivisionrepo;

	@RequestMapping("/working")
	public String isWorking() {
		System.out.println("got req");
		return "{\"value\":\"WORKING\"}";
	}
	@RequestMapping("/divisions")
	public List<CityDivision> getDivisions() {
		System.out.println("got req");
		return cityDivisionrepo.findAll();
	}

}
