package com.station.bean;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.station.services.ListToStringConverter;

@Entity
public class CityDivision {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@Column
	String name;
	@Convert(converter = ListToStringConverter.class)
	List<String> postalCodes;
	@Convert(converter = ListToStringConverter.class)
	List<String> cityDistricts;
	@Column
	double area;
	@Column
	double population;
	@Column
	double populationDensity;
	@Column
	String latitude;
	@Column
	String longitude;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getArea() {
		return area;
	}
	public void setArea(double area) {
		this.area = area;
	}
	public double getPopulation() {
		return population;
	}
	public void setPopulation(double population) {
		this.population = population;
	}
	public double getPopulationDensity() {
		return populationDensity;
	}
	public void setPopulationDensity(double populationDensity) {
		this.populationDensity = populationDensity;
	}
	public List<String> getPostalCodes() {
		return postalCodes;
	}
	public void setPostalCodes(List<String> postalCodes) {
		this.postalCodes = postalCodes;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public List<String> getCityDistricts() {
		return cityDistricts;
	}
	public void setCityDistricts(List<String> cityDistricts) {
		this.cityDistricts = cityDistricts;
	}
	
}
