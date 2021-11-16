package com.printwayy.popcorn.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.printwayy.popcorn.models.enums.AnimationType;
import com.printwayy.popcorn.models.enums.AudioType;

@Entity
@Table(name = "sessions")
public class Session {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	private Date date;

	@Column(nullable = false)
	@Temporal(TemporalType.TIME)
	private Date timeStart;

	@Column(nullable = false)
	@Temporal(TemporalType.TIME)
	private Date timeEnd;

	@Column(nullable = false, scale = 2)
	private Double ticketCost;

	@Column(nullable = false)
	private AnimationType animationType;

	@Column(nullable = false)
	private AudioType audioType;

	@ManyToOne
	private Movie movie;

//	@ManyToOne
	@Column(name = "room_id", nullable = false)
	private Long room;

	public Session() {

	}

	public Session(Date date, Date timeStart, Date timeEnd, Double ticketCost, AnimationType animationType,
			AudioType audioType, Movie movie, Long room) {
		this.date = date;
		this.timeStart = timeStart;
		this.timeEnd = timeEnd;
		this.ticketCost = ticketCost;
		this.animationType = animationType;
		this.audioType = audioType;
		this.movie = movie;
		this.room = room;
	}

	public Session(SessionRequestParser sessionInfo, Movie movie, Long room) throws ParseException {
		this.date = new SimpleDateFormat("yyy-MM-dd").parse(sessionInfo.getDate());
		this.timeStart = new SimpleDateFormat("HHmm").parse(sessionInfo.getTimeStart());
//		this.timeEnd = new SimpleDateFormat("HHmm").parse(sessionInfo.getTimeEnd());
		this.ticketCost = sessionInfo.getTicketCost();
		this.animationType = sessionInfo.getAnimationType();
		this.audioType = sessionInfo.getAudioType();
		this.movie = movie;
		this.room = room;
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

	public Date getTimeStart() {
		return timeStart;
	}

	public void setTimeStart(Date timeStart) {
		this.timeStart = timeStart;
	}

	public Date getTimeEnd() {
		return timeEnd;
	}

	public void setTimeEnd(Date timeEnd) {
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

	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	public Long getRoom() {
		return room;
	}

	public void setRoom(Long room) {
		this.room = room;
	}

}
