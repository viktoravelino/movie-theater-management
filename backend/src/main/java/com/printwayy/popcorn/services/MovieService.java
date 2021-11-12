package com.printwayy.popcorn.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.printwayy.popcorn.models.Movie;
import com.printwayy.popcorn.repositories.MovieRepository;
import com.printwayy.popcorn.repositories.SessionRepository;

@Service
public class MovieService {

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private SessionRepository sessionRepository;

	public Movie save(Movie movie) {
		if (movieRepository.existsByTitle(movie.getTitle())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "The movie title already exists.");
		}
		movieRepository.save(movie);
		return movie;
	}

	public Iterable<Movie> findAll() {
		return movieRepository.findAll();
	}

	public Optional<Movie> findById(Long id) {
		return movieRepository.findById(id);
	}

	public void deleteById(Long id) {
		Optional<Movie> movie = movieRepository.findById(id);
		if (movie.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Movie not found.");
		}
		if (sessionRepository.existsByMovie(movie.get())) {
			throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "There is a session linked to this movie.");
		}
		movieRepository.deleteById(id);
	}

}
