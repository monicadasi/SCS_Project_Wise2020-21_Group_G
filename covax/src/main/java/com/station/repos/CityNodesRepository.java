package com.station.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.station.bean.CityNodes;

public interface CityNodesRepository extends JpaRepository<CityNodes, Long> {
	
	public List<CityNodes> findByPostcodeInOrderByPostcodeDesc(List<String> postalCodes);
}
