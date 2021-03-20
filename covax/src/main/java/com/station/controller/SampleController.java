package com.station.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.station.bean.CityDivision;
import com.station.bean.LocationSearch;
import com.station.repos.CityDivisionRepository;
import com.station.repos.CityNodesRepository;
import com.station.services.LocationRecommender;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SampleController {
	@Autowired
	CityDivisionRepository cityDivisionrepo;
	@Autowired
	LocationRecommender locationRecommender;
	@Autowired
	LocationController locationController;
	@Autowired
	CityNodesRepository cityNoderepo;

	@RequestMapping("/working")
	public String isWorking() {
		System.out.println("got req");
		// test

		List<String> postalCodes = new ArrayList<String>();
		postalCodes.add("60487");
		postalCodes.add("60549");
		postalCodes.add("60313");
		postalCodes.add("60528");

		LocationSearch loc = new LocationSearch();
		loc.setCityName("Frankfurt am Main");
		System.out.println("Searched PostCodes : " + cityNoderepo.findByPostcodeInOrderByPostcodeDesc(postalCodes).size());

		return "{\"value\":\"WORKING\"}";
	}

	@RequestMapping("/divisions")
	public List<CityDivision> getDivisions() {
		System.out.println("got req");
		return cityDivisionrepo.findAll();
	}

	@GetMapping("/divisionstest/{stations}")
	public Set<CityDivision> getDivisionsTest(@PathVariable int stations) {
		System.out.println("got req");
		Map<CityDivision, Integer> vals = locationRecommender.findRecommendations(null, stations);
		vals.forEach((k, v) -> System.out.println(k.getName() + "-" + v));
		return vals.keySet();
	}

}
