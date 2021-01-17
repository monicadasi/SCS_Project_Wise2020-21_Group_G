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
public class CityDistrict {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@Column
	String name;
	@Convert(converter = ListToStringConverter.class)
	List<String> postalCodes;
	@Column
	double area;
	@Column
	int population;
	@Column
	double populationDensity;
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
	public int getPopulation() {
		return population;
	}
	public void setPopulation(int population) {
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
	
}
