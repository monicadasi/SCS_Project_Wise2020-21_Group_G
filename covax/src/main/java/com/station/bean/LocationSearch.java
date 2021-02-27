package com.station.bean;

public class LocationSearch {
	Long userId;
	String cityName;
	Integer numOfStations;

	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	public Integer getNumOfStations() {
		return numOfStations;
	}
	public void setNumOfStations(Integer numOfStations) {
		this.numOfStations = numOfStations;
	}

	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
}
