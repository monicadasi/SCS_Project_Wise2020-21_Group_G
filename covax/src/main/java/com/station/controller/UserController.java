package com.station.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.station.bean.User;
import com.station.repos.UserRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserRepository usrRepos;
	@RequestMapping(method = RequestMethod.POST, value = "/registration")
	public User userRegistration(@RequestBody User user) {
		System.out.println(user);
		user = usrRepos.save(user);
		return user;
	}

}
