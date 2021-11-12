package com.printwayy.popcorn.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.printwayy.popcorn.models.Movie;

import com.printwayy.popcorn.services.MovieService;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

	@Autowired
	private MovieService movieServices;

	// Save a new movie into the database or change a existing movie
	@RequestMapping(method = { RequestMethod.POST, RequestMethod.PUT })
	public Movie insertOrChangeMovie(@RequestBody Movie movie) {
		return movieServices.save(movie);

	}

	// Get all movies in database
	@GetMapping
	public Iterable<Movie> getAllMovies() {
		return movieServices.findAll();
	}

	// Get a movie by the id
	@GetMapping("/{id}")
	public Optional<Movie> getMovieById(@PathVariable Long id) {
		return movieServices.findById(id);
	}

	// Delete a movie by its id
	@DeleteMapping("/{id}")
	public void deleteMovieById(@PathVariable Long id) {
		movieServices.deleteById(id);
	}

}
