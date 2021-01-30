package com.station.utility;

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
	//TEST CASES
	public static void test() {
		System.out.println(distance(
		50.160308,50.187500, 8.763950,
		 8.791844));
	}
}
