package com.printwayy.popcorn.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.printwayy.popcorn.models.Movie;
import com.printwayy.popcorn.models.Room;
import com.printwayy.popcorn.models.Session;
import com.printwayy.popcorn.models.SessionRequestParser;
import com.printwayy.popcorn.repositories.SessionRepository;

@Service
public class SessionService {

	@Autowired
	private SessionRepository sessionRepository;

	@Autowired
	MovieService movieService;

	RoomService roomService = new RoomService();

	public Session save(SessionRequestParser sessionJSON) {
		// Check if the movieId sent exists in the database
		// If there is no movie with the id sent, it throws an error stating
		Optional<Movie> movie = movieService.findById(sessionJSON.getMovieId());
		if (movie.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Movie selected does not exist.");
		}

		// Check if the roomId sent exists in the database
		// If there is no room with the id sent, it throws an error stating
		Optional<Room> room = roomService.findById(sessionJSON.getRoomId());
		if (room.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room selected does not exist.");
		}

		// If the movie and room exists, create a new session to save
		Session session = new Session(sessionJSON, movie.get(), room.get().getId());

		return sessionRepository.save(session);
	}
	
	public Iterable<Session> findAll() {
		return sessionRepository.findAll();
	}
	
	public Optional<Session> findById(Long id) {
		return sessionRepository.findById(id);
	}
	
	public void deleteById(Long id) {
		sessionRepository.deleteById(id);
	}

}
