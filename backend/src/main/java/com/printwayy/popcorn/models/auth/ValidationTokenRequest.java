package com.printwayy.popcorn.models.auth;

public class ValidationTokenRequest {

	private String token;
	
	

	public ValidationTokenRequest() {
		super();
	}

	public ValidationTokenRequest(String token) {
		super();
		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
