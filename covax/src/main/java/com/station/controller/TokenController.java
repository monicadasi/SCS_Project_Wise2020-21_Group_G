package com.station.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.station.bean.Token;
import com.station.services.TokenHandler;
import com.station.utility.Response;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TokenController {
	@Autowired
	TokenHandler tokenHandler;
	@RequestMapping(
		    value = "/sendtoken", 
		    method = RequestMethod.POST)
	public Response sendMail(@RequestBody Map<String, Object> payload) {
		String email=(String) payload.get("email");
		return tokenHandler.sendToken(email);
	}
	@RequestMapping(
		    value = "/verifytoken", 
		    method = RequestMethod.POST)
	public Response verifyToken(@RequestBody Token token) {
		return tokenHandler.verifyToken(token);
	}
}
