package com.station.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.station.bean.Token;
import com.station.repos.TokenRepository;
import com.station.utility.Response;

@Service
public class TokenHandler {
	@Autowired
	private TokenRepository tokenRepo;
	@Autowired
	private EmailSender emailSender;
	public Response verifyToken(Token token) {
		List<Token> tokensFromRepo=tokenRepo.findByEmailAndTokenValue(token.getEmail(), token.getTokenValue());
		Response response=(tokensFromRepo.size()>0)?tokenverifed(token):tokenunverifed();
		return response;
	}
	public Response tokenverifed(Token token) {
		tokenRepo.delete(token);
		return Response.createSuccessResponse("Token verified",token);
	}
	public Response tokenunverifed() {
		return Response.createErrorResponse("Unable to verify");
	}
	public Response sendToken(String email) {
		int tokenValue=emailSender.sendEmail(email);
		Response response;
		//Error Case
		if(tokenValue==-1) {
			response= Response.createErrorResponse("Unable to create token");
		}
		else {
		Token token=new Token(email, tokenValue);
		token=tokenRepo.save(token);
		response=Response.createSuccessResponse("Token created successfully",token);
		}
		return response;
	}
}
