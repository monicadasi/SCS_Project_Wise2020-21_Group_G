package com.station.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Token {

	@Id
	String email;
	@Column
	int tokenValue;
	
	public Token() {
		super();
	}
	public Token(String email, int token) {
		super();
		this.email = email;
		this.tokenValue = token;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getTokenValue() {
		return tokenValue;
	}
	public void setTokenValue(int token) {
		this.tokenValue = token;
	}
	
}
