package com.station.repos;

import org.springframework.data.repository.CrudRepository;

import com.station.bean.User;

public interface UserRepository extends CrudRepository<User, Long> {

}
