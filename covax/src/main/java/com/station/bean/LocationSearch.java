package com.station.bean;

public class LocationSearch {
	public Integer getNumOfStations() {
		return numOfStations;
	}

	public void setNumOfStations(Integer numOfStations) {
		this.numOfStations = numOfStations;
	}

	String cityName;
	Integer numOfStations;

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
}
