package com.station.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.station.bean.SaveUserLocationData;

public interface UserLocationRepository extends JpaRepository<SaveUserLocationData, Long>{
	
	public List<SaveUserLocationData> findByUserId(Long userId);
}
