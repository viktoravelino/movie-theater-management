package com.printwayy.popcorn.models;

import java.util.HashMap;
import java.util.Map;

public class StaticDataSource {
//	private List<Room> rooms = new ArrayList<>();

	private Map<Long, Room> rooms = new HashMap<>();

	public StaticDataSource() {
//		this.rooms.add(new Room(1L,"Sala 1", 30));
//		this.rooms.add(new Room(2L,"Sala 2", 50));
//		this.rooms.add(new Room(3L,"Sala 3", 25));
//		this.rooms.add(new Room(4L,"Sala 4", 38));

		this.rooms.put(1L, new Room(1L, "Sala 1", 30));
		this.rooms.put(2L, new Room(2L, "Sala 2", 50));
		this.rooms.put(3L, new Room(3L, "Sala 3", 25));
		this.rooms.put(4L, new Room(4L, "Sala 4", 38));

	}

	public Map<Long, Room> getRooms() {
		return rooms;
	}

//	public void setRooms(List<Room> rooms) {
//		this.rooms = rooms;
//	}

}
