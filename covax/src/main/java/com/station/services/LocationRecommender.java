package com.station.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.station.bean.CityDivision;
import com.station.repos.CityDivisionRepository;
import com.station.utility.DisplacementCalculator;

@Service
public class LocationRecommender {
	@Autowired
	CityDivisionRepository cityDivisionRepo;
	
	public HashMap<CityDivision,Integer> findRecommendations(String city,int noOfStations){
		List<CityDivision> cityDivisions=cityDivisionRepo.findAllByOrderByPopulationDesc();
		int size=cityDivisions.size();
		/*IF noOfStations < size
		 * merge lowest ones with nearest one till noOfStations < size 
		 */
		
		while(noOfStations < size) {
			findLowestAndMerge(cityDivisions,size);
			size--;
		}
		
		/*IF noOfStations > size
		 * add extras to divisions based on highest population 
		 */
		
		
		return createHashMap(cityDivisions,(int)noOfStations/size,noOfStations%size-1);
	}

	private HashMap<CityDivision, Integer> createHashMap(List<CityDivision> cityDivisions, int stationsPerEntry, int indexTillExtra) {
		// TODO Auto-generated method stub
		HashMap<CityDivision, Integer> retMap=new HashMap<CityDivision,Integer>();
		for(int i=0;i<cityDivisions.size();i++) {
			retMap.put(cityDivisions.get(i), stationsPerEntry+((i<=indexTillExtra)?1:0));
		}
		return retMap;
	}

	private void findLowestAndMerge(List<CityDivision> cityDivisions,int size) {
		// TODO Auto-generated method stub
		CityDivision lowestCity=cityDivisions.get(size-1);
		int combineIndex=0;
		double minDistance=Double.MAX_VALUE,tempDistance=0;
		for(int i=0;i<size-2;i++) {
			tempDistance=DisplacementCalculator.distance(lowestCity.getLatitude(), cityDivisions.get(i).getLatitude(), lowestCity.getLongitude(),  cityDivisions.get(i).getLongitude());
			if(tempDistance<minDistance) {
				minDistance=tempDistance;
				combineIndex=i;
			}
		}
		combineListValues(cityDivisions,size-1,combineIndex);
	}

	private void combineListValues(List<CityDivision> cityDivisions, int firstIndex, int secondIndex) {
		// TODO Auto-generated method stub
		CityDivision newCityDivision=createNewCityDivision(cityDivisions.remove(firstIndex),cityDivisions.remove(secondIndex));
		mergeCityDivision(cityDivisions,newCityDivision);
	}


	private CityDivision createNewCityDivision(CityDivision firstDivision, CityDivision secondDivision) {
		// TODO Auto-generated method stub

		return firstDivision.combineWithAnother(secondDivision);
	}
	private void mergeCityDivision(List<CityDivision> cityDivisions, CityDivision newCityDivision) {
		// TODO Auto-generated method stub
		if(cityDivisions.size()==0) {
			cityDivisions.add(newCityDivision);
		}
		else {
			boolean flag=true;
		for(int i=0;i<cityDivisions.size();i++) {
			if(cityDivisions.get(i).getPopulation()<=newCityDivision.getPopulation()) {
				cityDivisions.add(i, newCityDivision);
				flag=false;
				break;
			}
		}
		if(flag) {
			cityDivisions.add(newCityDivision);
		}
		}
	}
}
