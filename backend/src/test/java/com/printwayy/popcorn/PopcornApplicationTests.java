package com.printwayy.popcorn;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;
// import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.server.ResponseStatusException;

import com.printwayy.popcorn.controllers.MovieController;
import com.printwayy.popcorn.controllers.SessionController;
import com.printwayy.popcorn.models.Movie;
import com.printwayy.popcorn.models.Session;
// import com.printwayy.popcorn.models.SessionRequestParser;
// import com.printwayy.popcorn.models.enums.AnimationType;
// import com.printwayy.popcorn.models.enums.AudioType;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class PopcornApplicationTests {

	@Autowired
	MovieController movieController;

	@Autowired
	SessionController sessionController;

	static Long movieId;
	static Long sessionId;

	@Test
	@Order(1)
	@DisplayName("Create and save a movie into the database. Should return the movie back.")
	public void insertNewMovie() {
		Movie movie = new Movie("testurl", "Test Title 1", "Description 1", 123);
		Movie insertedMovie = movieController.insertOrChangeMovie(movie);
		movieId = insertedMovie.getId();
		assertEquals(Movie.class, insertedMovie.getClass());
	}

	@Test
	@Order(2)
	@DisplayName("Change a movie's title and description")
	public void changeMovie() {
		Movie movie = new Movie("testurl", "Test Title 2", "Description 2", 123);
		Movie insertedMovie = movieController.insertOrChangeMovie(movie);
		movieId = insertedMovie.getId();
		assertAll("movie", () -> assertEquals(Movie.class, insertedMovie.getClass()),
				() -> assertEquals(movie.getTitle(), insertedMovie.getTitle()),
				() -> assertEquals(movie.getDescription(), insertedMovie.getDescription()));
	}

	@Test
	@Order(3)
	@DisplayName("Find a movie by its id. Should return the movie.")
	public void findMovieById() {
		Optional<Movie> movie = movieController.getMovieById(movieId);
		assertAll("movie", () -> assertEquals(Movie.class, movie.get().getClass()),
				() -> assertEquals(movieId, movie.get().getId()));

	}

	@Test
	@Order(4)
	@DisplayName("Retrieve all movies in database")
	public void findAllMovies() {
		Iterable<Movie> movies = movieController.getAllMovies();
		assertEquals(ArrayList.class, movies.getClass());
	}

	// @Test
	// @Order(5)
	// @DisplayName("Create a new session into the database.")
	// public void createSession() {
	// Session session = sessionController.insertOrChangeSession(new
	// SessionRequestParser(new Date(), 1400, 1500,
	// 15.45, AnimationType.IMERSIVE, AudioType.DUBBED, movieId, 1L));
	// sessionId = session.getId();
	// assertEquals(Session.class, session.getClass());
	// }

	@Test
	@Order(6)
	@DisplayName("Find a session by its id. Should return the session.")
	public void findSessionById() {
		Optional<Session> session = sessionController.getSessionById(sessionId);
		assertAll("sessio", () -> assertEquals(Session.class, session.get().getClass()),
				() -> assertEquals(sessionId, session.get().getId()));

	}

	@Test
	@Order(7)
	@DisplayName("Retrieve all session in database")
	public void findAllSessions() {
		Iterable<Session> sessions = sessionController.getAllSessions();
		assertEquals(ArrayList.class, sessions.getClass());
	}

	@Test
	@Order(8)
	@DisplayName("Do not let delete movie with session linked to it")
	void testDeleteMovieLinkedSessionById() {
		assertThrows(ResponseStatusException.class, () -> movieController.deleteMovieById(movieId));
	}

	@Test
	@Order(9)
	@DisplayName("Delete a session from the database by its is")
	public void deleteSession() {
		sessionController.deleteSessionById(sessionId);
	}

	@Test
	@Order(10)
	@DisplayName("Delete a movie from the database by its id.")
	void testDeleteMovieById() {
		movieController.deleteMovieById(movieId);
	}

}
