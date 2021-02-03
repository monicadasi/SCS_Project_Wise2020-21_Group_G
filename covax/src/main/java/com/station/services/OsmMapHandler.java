package com.station.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.station.bean.LocationInfo;

import de.westnordost.osmapi.map.data.BoundingBox;
import de.westnordost.osmapi.map.data.Node;
import de.westnordost.osmapi.map.data.Relation;
import de.westnordost.osmapi.map.data.Way;
import de.westnordost.osmapi.map.handler.MapDataHandler;

public class OsmMapHandler implements MapDataHandler{
	
	List<LocationInfo> listReceivedFromOsm = new ArrayList<>();
	
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
		
		LocationInfo locInfo = new LocationInfo();
		
		locInfo.setLatitude(node.getPosition().getLatitude());
		locInfo.setLongitude(node.getPosition().getLongitude());
		
		Map<String, String> mapTag = node.getTags();
		for (Map.Entry<String, String> entry : mapTag.entrySet()) {
		    System.out.println(entry.getKey() + " = " + entry.getValue());
		}
		
		listReceivedFromOsm.add(locInfo);
		System.out.println("<-- Total Size --> : " + listReceivedFromOsm.size());
	}

}
