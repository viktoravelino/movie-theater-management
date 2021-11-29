package com.printwayy.popcorn.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printwayy.popcorn.models.auth.AuthenticationRequest;
import com.printwayy.popcorn.models.auth.AuthenticationResponse;
import com.printwayy.popcorn.models.auth.ValidationTokenRequest;
import com.printwayy.popcorn.security.JwtUtil;

@RestController
@RequestMapping("${api.url}/auth")
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private JwtUtil jwtTokenUtil;

	// Log a user in. Receives:
	/*
	 * { username:"foo", password:"12345" }
	 */
	@PostMapping("/authenticate")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
		try {
			Authentication test = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
			System.out.println(test);
		} catch (AuthenticationException e) {
			System.out.println("oi");
			throw new Exception("Incorret username or password", e);
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		final String jwt = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new AuthenticationResponse(jwt));
	}

//	@GetMapping("/authenticate")
//	public String createAuthenticationToken() {
//		return "ok";
//	}

	@PostMapping("/validatetoken")
	public Boolean validateToken(@RequestBody ValidationTokenRequest validationTokenRequest) throws Exception {
		String token = validationTokenRequest.getToken();
		String username = jwtTokenUtil.extractUsername(token);
		final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
		try {
			jwtTokenUtil.validateToken(token, userDetails);
			return true;
		} catch (Exception e) {

			return false;
		}
	}
}
