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
	@RequestMapping(method = RequestMethod.POST, value = "/changePassword")
	public Response changePassword(@RequestBody User user) {
		userList=usrRepos.findByEmail(user.getEmail());
		User retUser=fetchAndUpdate(userList,user);
		return (retUser!=null)? Response.createSuccessResponse("Password change Successful!", retUser):
			Response.createErrorResponse("Error in finding user!");
		
	}

	private User fetchAndUpdate(List<User> userList,User user) {
		// TODO Auto-generated method stub
		if(userList.isEmpty()|| userList.size()>1) {
			return null;
		}
		else {
			User modUser=userList.get(0);
			modUser.setPassword(user.getPassword());
			return usrRepos.save(modUser);
		}
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
