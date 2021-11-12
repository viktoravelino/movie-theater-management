package com.printwayy.popcorn.models;

import java.util.Date;

public class SessionRequestParser {
	private Long id;

	private Date date;

	private Integer timeStart;

	private Integer timeEnd;

	private Double ticketCost;

	private AnimationType animationType;

	private AudioType audioType;

	private Long movieId;

	private Long roomId;

	public SessionRequestParser() {
		// TODO Auto-generated constructor stub
	}

	public SessionRequestParser(Date date, Integer timeStart, Integer timeEnd, Double ticketCost,
			AnimationType animationType, AudioType audioType, Long movieId, Long roomId) {
		super();
		this.date = date;
		this.timeStart = timeStart;
		this.timeEnd = timeEnd;
		this.ticketCost = ticketCost;
		this.animationType = animationType;
		this.audioType = audioType;
		this.movieId = movieId;
		this.roomId = roomId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Integer getTimeStart() {
		return timeStart;
	}

	public void setTimeStart(Integer timeStart) {
		this.timeStart = timeStart;
	}

	public Integer getTimeEnd() {
		return timeEnd;
	}

	public void setTimeEnd(Integer timeEnd) {
		this.timeEnd = timeEnd;
	}

	public Double getTicketCost() {
		return ticketCost;
	}

	public void setTicketCost(Double ticketCost) {
		this.ticketCost = ticketCost;
	}

	public AnimationType getAnimationType() {
		return animationType;
	}

	public void setAnimationType(AnimationType animationType) {
		this.animationType = animationType;
	}

	public AudioType getAudioType() {
		return audioType;
	}

	public void setAudioType(AudioType audioType) {
		this.audioType = audioType;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public Long getRoomId() {
		return roomId;
	}

	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}

}
