package com.printwayy.popcorn.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printwayy.popcorn.models.Room;
import com.printwayy.popcorn.services.RoomService;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

	private RoomService roomService = new RoomService();

	@GetMapping
	public Iterable<Room> test() {
		return roomService.findAll();
	}

}
