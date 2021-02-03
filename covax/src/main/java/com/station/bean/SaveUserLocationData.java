package com.station.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class SaveUserLocationData {

	@Column
	Long userId;
	@Column
	Integer allowed;
	@Column
	Double latitude;
	@Column
	Double longitude;
	@Column
	String address;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getAllowed() {
		return allowed;
	}

	public void setAllowed(Integer allowed) {
		this.allowed = allowed;
	}

	@JsonIgnore
	@JsonProperty(value = "userId")
	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
