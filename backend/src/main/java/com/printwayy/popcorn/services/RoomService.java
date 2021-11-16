package com.printwayy.popcorn.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.printwayy.popcorn.infra.StaticDataSource;
import com.printwayy.popcorn.models.Room;
import com.printwayy.popcorn.repositories.RoomRepository;
import com.printwayy.popcorn.repositories.SessionRepository;

@Service
public class RoomService implements RoomRepository {

	private Map<Long, Room> rooms;

	@Autowired
	private SessionRepository sessionRepository;

	public RoomService() {
		StaticDataSource dataSource = new StaticDataSource();
		this.rooms = dataSource.getRooms();
	}

	@Override
	public Iterable<Room> findAll() {
		return this.rooms.values();
	}

	@Override
	public Optional<Room> findById(Long id) {
		return Optional.ofNullable(this.rooms.get(id));
	}

	@Override
	public List<Room> findAvailableRooms(String date, String startTime, String endTime) throws ParseException {
		// Get the ids of rooms that are occupied
		List<Long> occupiedRooms = sessionRepository.findAllByDateAndStartTimeAndEndTime(
				new SimpleDateFormat("yyyy-MM-dd").parse(date), new SimpleDateFormat("HHmm").parse(startTime),
				new SimpleDateFormat("HHmm").parse(endTime));

		// Filter the rooms that are not occupied
		List<Room> availableRooms = this.rooms.entrySet().stream()
				.filter(room -> occupiedRooms.contains(room.getKey()) == false).map(roomObj -> roomObj.getValue())
				.collect(Collectors.toList());

		return availableRooms;
	}

}
