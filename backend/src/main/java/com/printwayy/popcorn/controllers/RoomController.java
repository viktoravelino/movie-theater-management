package com.printwayy.popcorn.controllers;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	@GetMapping(params = { "date" })
	public List<Room> getRoomsAvailableByTime(@PathParam(value = "date") String date,
			@PathParam(value = "startTime") String startTime, @PathParam(value = "endTime") String endTime)
			throws ParseException {
		return roomService.findAvailableRooms(date, startTime, endTime);
	}

	@GetMapping("/{id}")
	public Optional<Room> getRoomById(@PathVariable Long id) {
		return roomService.findById(id);
	}

	@GetMapping("/test")
	public String test() {
		return "ok";
	}

}
