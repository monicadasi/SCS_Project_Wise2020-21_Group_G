package com.station.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.station.bean.LocationSearch;
import com.station.bean.User;
import com.station.bean.LocationInfo;
import com.station.repos.UserLocationRepository;
import com.station.repos.UserRepository;
import com.station.utility.Response;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/userLocation")
public class LocationController {

	@Autowired
	private UserLocationRepository usrLocationRepos;

	List<LocationInfo> userLocationList = null;
	List<User> userList = null;

	@RequestMapping(method = RequestMethod.POST, value = "/saveLocation")
	public Response saveUserLocation(@RequestBody List<LocationInfo> userLocation) {
		System.out.println(userLocation);
		
		if(!userLocation.isEmpty() && userLocation.size() >= 1 && userLocation.get(0).getUserId() != null)
		{
			userLocationList = usrLocationRepos.findByUserId(userLocation.get(0).getUserId());	
		}

		return (userLocationList != null && userLocationList.isEmpty() && userLocationList.size() == 0)
				? Response.createSuccessResponse("Location Saved Successfully!!", usrLocationRepos.saveAll(userLocation))
				: Response.createErrorResponse("Unable to save the location!");
	}

	@RequestMapping(method = RequestMethod.POST, value = "/getLocation")
	public Response getUserLocation(@RequestBody User user) {
		System.out.println(user);
		userLocationList = usrLocationRepos.findByUserId(user.getId());
		return (userLocationList.size() == 0) ? Response.createErrorResponse("User Not Found!")
				: Response.createSuccessResponse("User Found", usrLocationRepos.findByUserId(user.getId()));
	}

	@RequestMapping(method = RequestMethod.POST, value = "/getLocationByCity")
	public Response getLocationByCityName(@RequestBody LocationSearch locSearch) {
		System.out.println(locSearch);
		// (TODO) (monica) dummy to be replaced by actual data from the OSM algorithm
		List<LocationInfo> userLocationList = null;
		// TODO : can also create a db and save it there , or return local list

		return (userLocationList.size() == 0) ? Response.createErrorResponse("No Covax station found for the city!!"):
			Response.createSuccessResponse("Covax Station Found!",  userLocationList);
	}

}
