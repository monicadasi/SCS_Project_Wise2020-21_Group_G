package com.station.bean;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class SaveUserLocationData {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	@Column
	Long userId;
	//@OneToOne(cascade = CascadeType.ALL)
	@ManyToOne
    @JoinColumn(name = "node_id", referencedColumnName = "id")
	CityNodes node;


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public CityNodes getNode() {
		return node;
	}
	public void setNode(CityNodes node) {
		this.node = node;
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
