package com.station.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.station.bean.CityDivision;

public interface CityDivisionRepository extends JpaRepository<CityDivision, Long> {
	 public List<CityDivision> findAllByOrderByPopulationDesc();
}
