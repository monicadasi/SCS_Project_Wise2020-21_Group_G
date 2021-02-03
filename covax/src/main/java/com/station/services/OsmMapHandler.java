package com.station.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.station.bean.CityNodes;

import de.westnordost.osmapi.map.data.BoundingBox;
import de.westnordost.osmapi.map.data.Node;
import de.westnordost.osmapi.map.data.Relation;
import de.westnordost.osmapi.map.data.Way;
import de.westnordost.osmapi.map.handler.MapDataHandler;

public class OsmMapHandler implements MapDataHandler {

	public List<CityNodes> cityNodesListFromOsm = new ArrayList<CityNodes>();
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

		CityNodes cityNode = new CityNodes();
		cityNode.setLat(node.getPosition().getLatitude());
		cityNode.setLon(node.getPosition().getLongitude());
		cityNode.setId(node.getId());

		Map<String, String> mapTag = node.getTags();
		if(mapTag.containsKey("addr:postcode")) {
		for (Map.Entry<String, String> entry : mapTag.entrySet()) {

			switch (entry.getKey()) {
			case "amenity": {
				cityNode.setAmenity(entry.getValue());
				break;
			}
			case "name": {
				cityNode.setName(entry.getValue());
				break;
			}
			case "phone": {
				cityNode.setPhone(entry.getValue());
				break;
			}
			case "addr:street": {
				cityNode.setStreet(entry.getValue());
				break;
			}
			case "addr:housenumber": {
				cityNode.setHousenumber(entry.getValue());
				break;
			}
			case "addr:postcode": {
				cityNode.setPostcode(entry.getValue());
				break;
			}
			case "opening_hours": {
				cityNode.setOpening_hours(entry.getValue());
				break;
			}
			case "website": {
				cityNode.setWebsite(entry.getValue());
				break;
			}
			default:
				break;
			}
		}
		cityNodesListFromOsm.add(cityNode);
		}
	}


	public void setAllowed(int allowed) {
		this.allowed = allowed;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
