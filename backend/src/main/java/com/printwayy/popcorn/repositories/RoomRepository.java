package com.printwayy.popcorn.repositories;

import java.text.ParseException;
import java.util.Collection;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.printwayy.popcorn.models.Room;

@Repository
public interface RoomRepository {

	public Iterable<Room> findAll();
	
	public Optional<Room> findById(Long id);
	
	public Collection<Room> findAvailableRooms(String date, String startTime, String endTime) throws ParseException;
}
