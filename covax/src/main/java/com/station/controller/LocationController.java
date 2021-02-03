package com.station.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.commons.lang3.StringUtils;

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
import com.station.services.OsmMapHandler;
import com.station.utility.Response;


import de.westnordost.osmapi.OsmConnection;
import de.westnordost.osmapi.map.handler.MapDataHandler;
import de.westnordost.osmapi.overpass.OverpassMapDataDao;

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
		
		userLocationList = usrLocationRepos.findByUserId(user.getId());
		System.out.println(userLocationList);
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
	
	public static void osmMapDataQueryProcessing(String cityName, List<String> postalCodes) {
		OsmConnection connection = new OsmConnection("https://overpass-api.de/api/", "my user agent");
		OverpassMapDataDao overpass = new OverpassMapDataDao(connection);

		MapDataHandler mdh = new OsmMapHandler();
	  
		String query = "area[name=\"%replace_city_name%\"]->.b; node(area.b)[amenity=hospital][\"addr:postcode\"=\"%replace_postal_code%\"]; out meta;";

		// query for hospitals
		for(String code : postalCodes)
		{
			overpass.queryElements(processosmQLQuery(query, cityName, code), mdh);
		}


		// query for clinics
		query = "area[name=\"%replace_city_name%\"]->.b; node(area.b)[amenity=clinic][\"addr:postcode\"=\"%replace_postal_code%\"]; out meta;";	
		for(String code : postalCodes)
		{
			overpass.queryElements(processosmQLQuery(query, cityName, code), mdh);
		}

		// query for doctors
		query = "area[name=\"%replace_city_name%\"]->.b; node(area.b)[amenity=doctors][\"addr:postcode\"=\"%replace_postal_code%\"]; out meta;";
		for(String code : postalCodes)
		{
			overpass.queryElements(processosmQLQuery(query, cityName, code), mdh);
		}
	}
	
	private static String processosmQLQuery(String query, String cityName, String postCode) {
		/*
		 * Pattern p = Pattern.compile("replace_city_name"); Matcher m =
		 * p.matcher(query); StringBuffer sb = new StringBuffer();
		 * 
		 * while (m.find()) { m.appendReplacement(sb, cityName); } m.appendTail(sb);
		 * System.out.println("1st step : " + sb);
		 * 
		 * StringBuffer sb1 = new StringBuffer(); Pattern p1 =
		 * Pattern.compile("replace_postal_code"); Matcher m1 =
		 * p1.matcher(sb.toString()); while (m1.find()) { m1.appendReplacement(sb1,
		 * postCode); } m1.appendTail(sb1);
		 * 
		 * System.out.println(sb1);
		 */
		
		Map<String,String> tokens = new HashMap<String,String>();
		tokens.put("replace_city_name", cityName);
		tokens.put("replace_postal_code", postCode);

		String template = query;

		// Create pattern of the format "%(replace_city_name|replace_postal_code)%"
		String patternString = "%(" + StringUtils.join(tokens.keySet(), "|") + ")%";
	   //System.out.println("pattern string " + patternString);
		Pattern pattern = Pattern.compile(patternString);
		Matcher matcher = pattern.matcher(template);

		StringBuffer sb = new StringBuffer();
		while(matcher.find()) {
		    matcher.appendReplacement(sb, tokens.get(matcher.group(1)));
		}
		matcher.appendTail(sb);

		System.out.println(sb.toString());
		return sb.toString();
	}
}
