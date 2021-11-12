package com.printwayy.popcorn.repositories;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.printwayy.popcorn.models.Room;

@Repository
public interface RoomRepository {

	public Iterable<Room> findAll();
	
	public Optional<Room> findById(Long id);
}
