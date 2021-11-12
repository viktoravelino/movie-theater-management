package com.printwayy.popcorn.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printwayy.popcorn.models.Room;
import com.printwayy.popcorn.services.RoomService;

@RestController
@RequestMapping("${api.url}/rooms")
public class RoomController {

	@Autowired
	private RoomService roomService;

	@GetMapping
	public Iterable<Room> getAllRooms() {
		return roomService.findAll();
	}

}
