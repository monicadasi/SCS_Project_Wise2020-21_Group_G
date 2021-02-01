package com.station.bean;

import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;

import com.station.services.ListToStringConverter;
import com.station.utility.DisplacementCalculator;

@Entity
//@NamedQuery(name = "CityDivision.findAll", query="select c from CityDivision c order by c.population desc")
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
	double latitude;
	@Column
	double longitude;
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

	public List<String> getCityDistricts() {
		return cityDistricts;
	}
	public void setCityDistricts(List<String> cityDistricts) {
		this.cityDistricts = cityDistricts;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public CityDivision combineWithAnother(CityDivision other) {
		this.name+=", "+other.name;
		this.area+=other.area;
		this.population+=other.population;
		this.populationDensity=(this.population/this.area);
		this.postalCodes.addAll(other.postalCodes);
		this.cityDistricts.addAll(other.cityDistricts);
		Map<String,Double> midPoint=DisplacementCalculator.midPoint(this.latitude, this.longitude, other.latitude, other.longitude);
		this.latitude=midPoint.get("latitude");
		this.longitude=midPoint.get("longtitude");
		return this;
	}
}
