package com.station.bean;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class LocationInfo {

	Long userId;
	Integer allowed;
	Long id;
	List<CityNodes> cityInfo;
	
	
	public List<CityNodes> getCityInfo() {
		return cityInfo;
	}

	public void setCityInfo(List<CityNodes> cityInfo) {
		this.cityInfo = cityInfo;
	}	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Integer getAllowed() {
		return allowed;
	}

	public void setAllowed(Integer allowed) {
		this.allowed = allowed;
	}

	@JsonIgnore
	@JsonProperty(value = "userId")
	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}	

}


