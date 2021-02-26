package com.station.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.station.bean.LocationSearch;
import com.station.bean.SaveUserLocationData;
import com.station.bean.User;
import com.station.bean.CityDivision;
import com.station.bean.CityNodes;
import com.station.bean.LocationInfo;
import com.station.repos.CityNodesRepository;
import com.station.repos.UserLocationRepository;
import com.station.services.LocationRecommender;
import com.station.services.OsmMapHandler;
import com.station.utility.Response;

import de.westnordost.osmapi.OsmConnection;
import de.westnordost.osmapi.overpass.OverpassMapDataDao;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/locationInfo")
public class LocationController {

	@Autowired
	private UserLocationRepository usrLocationRepos;

	@Autowired
	LocationRecommender locationRecommender;

	@Autowired
	private CityNodesRepository cityNodeRepo;

	List<SaveUserLocationData> userLocationList = null;
	List<User> userList = null;
	Map<CityDivision, Integer> cityDivisons = new HashMap<CityDivision, Integer>();

	@RequestMapping(method = RequestMethod.POST, value = "/saveLocation")
	public Response saveUserLocation(@RequestBody List<SaveUserLocationData> userLocation) {
		System.out.println(userLocation);

		if (!userLocation.isEmpty() && userLocation.size() >= 1 && userLocation.get(0).getUserId() != null) {
			userLocationList = usrLocationRepos.findByUserId(userLocation.get(0).getUserId());
		}

		return (userLocationList != null && userLocationList.isEmpty() && userLocationList.size() == 0)
				? Response.createSuccessResponse("Location Saved Successfully!!",
						usrLocationRepos.saveAll(userLocation))
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

		cityDivisons = locationRecommender.findRecommendations(null, locSearch.getNumOfStations());
		List<LocationInfo> covaxStations = new ArrayList<LocationInfo>();

		List<CityNodes> chosenCityNodes = new ArrayList<CityNodes>();

		for (Map.Entry<CityDivision, Integer> entry : cityDivisons.entrySet()) {

			LocationInfo locInfo = new LocationInfo();
			List<CityNodes> cityNodes = cityNodeRepo.findByPostcodeIn(entry.getKey().getPostalCodes());
			cityNodes.removeAll(chosenCityNodes);

			int limitedStations = entry.getValue() + 2;
			if (cityNodes.size() > limitedStations) {
				cityNodes = cityNodes.stream().limit(limitedStations).collect(Collectors.toList());
			}
			locInfo.setId(entry.getKey().getId());

			chosenCityNodes.addAll(cityNodes);
			locInfo.setCityInfo(cityNodes);
			locInfo.setAllowed(entry.getValue() < cityNodes.size() ? entry.getValue() : cityNodes.size());
			covaxStations.add(locInfo);
		}
		return (covaxStations.size() == 0) ? Response.createErrorResponse("No Covax station found for the city!!")
				: Response.createSuccessResponse("Covax Station Found!", covaxStations);
	}

	// overpass map api query
	public static List<CityNodes> searchStations() {
		OsmConnection connection = new OsmConnection("https://overpass-api.de/api/", "my user agent");
		OverpassMapDataDao overpass = new OverpassMapDataDao(connection);

		OsmMapHandler mdh = new OsmMapHandler();
		overpass.queryElements(
				"area[name=\"Frankfurt am Main\"]->.b;node(area.b)[\"amenity\"~\"hospital|clinic|doctors\"]; out meta;",
				mdh);

		System.out.println("Nodes from osm data : " + mdh.cityNodesListFromOsm.size());
		return mdh.cityNodesListFromOsm;
	}
}
