package com.station.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.station.services.EmailSender;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SampleController {

	@RequestMapping("/working")
	public String isWorking() {
		System.out.println("got req");
		return "{\"value\":\"WORKING\"}";
	}

}
