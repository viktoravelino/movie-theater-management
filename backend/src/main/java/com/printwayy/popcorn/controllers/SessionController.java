package com.printwayy.popcorn.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printwayy.popcorn.models.Session;
import com.printwayy.popcorn.models.SessionRequestParser;

import com.printwayy.popcorn.services.SessionService;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

	@Autowired
	SessionService sessionSevice;

	@PostMapping
	public Session insertOrChangeSession(@RequestBody SessionRequestParser sessionJSON) { // It parses the JSON into a
																							// temporary obj
		return sessionSevice.save(sessionJSON);
	}

	@GetMapping
	public Iterable<Session> getAllSessions() {
		return sessionSevice.findAll();
	}

	@GetMapping("/{id}")
	public Optional<Session> getSessionById(@PathVariable Long id) {
		return sessionSevice.findById(id);
	}

	@DeleteMapping("/{id}")
	public void deleteSessionById(@PathVariable Long id) {
		sessionSevice.deleteById(id);
	}

}
