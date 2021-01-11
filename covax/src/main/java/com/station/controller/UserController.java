package com.station.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.station.bean.User;
import com.station.repos.UserRepository;
import com.station.utility.Response;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserRepository usrRepos;
	
	List<User> userList = null;
	
	@RequestMapping(method = RequestMethod.POST, value = "/registration")
	public Response userRegistration(@RequestBody User user) {
		System.out.println(user);
		userList = usrRepos.findByEmail(user.getEmail());
		return (userList.size() == 0) ? Response.createSuccessResponse("Registration Successful!", usrRepos.save(user)):
		Response.createErrorResponse("User already exists!");
	}

	
	@RequestMapping(method = RequestMethod.POST, value = "/login")
	public Response userLogin(@RequestBody User user) {
		System.out.println(user);
		return verifyLogin(user);
	}


	private Response verifyLogin(User user) {
		
		if(user.getEmail() != null && user.getPassword() != null)
		{
			userList = usrRepos.findByEmailAndPassword(user.getEmail(), user.getPassword());
		}
		
		return (userList.size() == 1) ? Response.createSuccessResponse("Login Successful!", userList.get(0)):
			Response.createErrorResponse("Login Unsuccessful!");
		
	}

}
