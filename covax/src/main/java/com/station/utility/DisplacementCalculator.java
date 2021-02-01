package com.station.utility;

import java.util.HashMap;
import java.util.Map;

public class DisplacementCalculator {

	public static double distance(double lat1, double lat2, double lon1,
	        double lon2) {

	    final int R = 6371; // Radius of the earth

	    double latDistance = Math.toRadians(lat2 - lat1);
	    double lonDistance = Math.toRadians(lon2 - lon1);
	    double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
	            + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
	            * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
	    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	    double distance = R * c * 1000; // convert to meters


	    distance = Math.pow(distance, 2);

	    return Math.sqrt(distance);
	}
	public static Map<String,Double> midPoint(double lat1,double lon1,double lat2,double lon2){

	    double dLon = Math.toRadians(lon2 - lon1);

	    //convert to radians
	    lat1 = Math.toRadians(lat1);
	    lat2 = Math.toRadians(lat2);
	    lon1 = Math.toRadians(lon1);

	    double Bx = Math.cos(lat2) * Math.cos(dLon);
	    double By = Math.cos(lat2) * Math.sin(dLon);
	    double lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
	    double lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);
	    
	    Map<String,Double> retMap=new HashMap<String,Double>();
	    retMap.put("latitude",Math.toDegrees(lat3));
	    retMap.put("longtitude",Math.toDegrees(lon3));
	   	return retMap;
	}
	//TEST CASES
	public static void main1(String args[]) {
		System.out.println(midPoint(
		50.160308,8.763950,50.187500, 
		 8.791844));
	}
}
