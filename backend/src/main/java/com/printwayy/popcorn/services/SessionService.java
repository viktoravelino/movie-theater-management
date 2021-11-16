package com.printwayy.popcorn.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

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

	public Session save(SessionRequestParser sessionJSON) throws ParseException {
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

		Integer movieDuration = session.getMovie().getDuration() * 60 * 1000;
		Long endTimeMilli = session.getTimeStart().getTime() + movieDuration;
		Date endTime = new Date(endTimeMilli);
		session.setTimeEnd(endTime);

		List<Long> occupiedRooms = sessionRepository.findAllByDateAndStartTimeAndEndTime(
				new SimpleDateFormat("yyyy-MM-dd").parse(sessionJSON.getDate()),
				new SimpleDateFormat("HHmm").parse(sessionJSON.getTimeStart()),
				new SimpleDateFormat("HH:mm").parse(endTime.toString().split(" ")[3]));

		if (occupiedRooms.contains(session.getRoom())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room is occupied during the time slot.");
		}

		return sessionRepository.save(session);
	}

	public Iterable<Session> findAll() {
		return sessionRepository.findAll();
	}

	public Optional<Session> findById(Long id) {
		return sessionRepository.findById(id);
	}

	public void deleteById(Long id) {
		try {
			Optional<Session> sessionOptional = sessionRepository.findById(id);
			if (sessionOptional.isEmpty()) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Session not found.");
			}
			Session session = sessionOptional.get();
			Date today = new SimpleDateFormat("yyyy-MM-dd").parse(LocalDate.now().toString());
			Long diffInMillies = Math.abs(today.getTime() - session.getDate().getTime());
			Long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
			if (diff < 10) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Session has less then 10 days.");
			}
			sessionRepository.deleteById(id);
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}

}
