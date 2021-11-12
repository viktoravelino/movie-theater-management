package com.printwayy.popcorn.services;

import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.printwayy.popcorn.models.Room;
import com.printwayy.popcorn.models.StaticDataSource;
import com.printwayy.popcorn.repositories.RoomRepository;

@Service
public class RoomService implements RoomRepository {

	private Map<Long, Room> rooms;

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

}
