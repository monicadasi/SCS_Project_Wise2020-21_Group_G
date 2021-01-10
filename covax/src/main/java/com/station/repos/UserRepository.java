package com.station.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.station.bean.User;

public interface UserRepository extends JpaRepository<User, Long> {

	public List<User> findByEmailAndPassword(String email, String password);
	public List<User> findByEmail(String email);
}
