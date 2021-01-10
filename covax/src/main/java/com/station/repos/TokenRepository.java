package com.station.repos;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.station.bean.Token;

public interface TokenRepository extends JpaRepository<Token, String> {

public List<Token> findByEmailAndTokenValue(String email,int token);
	
}
