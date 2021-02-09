package com.station.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.station.bean.GeoCoordinatesInfo;
import com.station.bean.LocationInfo;

import de.westnordost.osmapi.map.data.BoundingBox;
import de.westnordost.osmapi.map.data.Node;
import de.westnordost.osmapi.map.data.Relation;
import de.westnordost.osmapi.map.data.Way;
import de.westnordost.osmapi.map.handler.MapDataHandler;

public class OsmMapHandler implements MapDataHandler{
	

//	// static variable single_instance of type OsmMapHandler
//	private static OsmMapHandler single_instance = null;
//
//	// private constructor restricted to this class itself
//	private OsmMapHandler() {
//	}
//
//	// static method to create instance of Singleton class
//	public static OsmMapHandler getInstance() {
//		if (single_instance == null)
//			single_instance = new OsmMapHandler();
//
//		return single_instance;
//	}
	
	List<LocationInfo> listReceivedFromOsm = new ArrayList<>();
	List<GeoCoordinatesInfo> geoCoordList = new ArrayList<GeoCoordinatesInfo>();
	int allowed = 0;
	long id = 0;
	
	@Override
	public void handle(BoundingBox bounds) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void handle(Way way) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void handle(Relation relation) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void handle(Node node) {
		// TODO Auto-generated method stub
		System.out.println("\n" + "handle(Node : " + node.getId() + ")");
		System.out.println(node.getPosition().getLatitude()+" "+node.getPosition().getLongitude());
				
		geoCoordList.add(new GeoCoordinatesInfo(node.getPosition().getLatitude(), node.getPosition().getLongitude()));
		
		Map<String, String> mapTag = node.getTags();
		for (Map.Entry<String, String> entry : mapTag.entrySet()) {
		    System.out.println(entry.getKey() + " = " + entry.getValue());
		}
				
		System.out.println("<-- Total Size --> : " + geoCoordList.size());
	}
	
	public List<GeoCoordinatesInfo> getSearchResultFromOsm() {
		return geoCoordList;
	}
	
	public void setAllowed(int allowed) {
		this.allowed = allowed;
	}
	
	public void setId(Long id)
	{
		this.id = id;
	}

}
