package com.station.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.station.bean.LocationInfo;

public interface UserLocationRepository extends JpaRepository<LocationInfo, Long>{
	
	public List<LocationInfo> findByUserId(Long userId);
	//public List<LocationInfo> findByCity(String cityName);
}
