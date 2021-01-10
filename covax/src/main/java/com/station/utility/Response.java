package com.station.utility;


public class Response {

	public static enum responseStatus{
		success,
		failure
	}
	responseStatus status; 
	String message;
	Object data;
	public Response(responseStatus status, String message, Object data) {
		this.status = status;
		this.message = message;
		this.data = data;
	}
	public static Response createErrorResponse(String error) {
		return new Response(responseStatus.failure,error,null);
	}
	public static Response createSuccessResponse(String message,Object data) {
		return new Response(responseStatus.success,message,data);
	}
	public responseStatus getStatus() {
		return status;
	}
	public void setStatus(responseStatus status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	
}
