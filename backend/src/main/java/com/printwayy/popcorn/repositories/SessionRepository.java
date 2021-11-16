package com.printwayy.popcorn.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.printwayy.popcorn.models.Movie;
import com.printwayy.popcorn.models.Session;

@Repository
public interface SessionRepository extends CrudRepository<Session, Long> {

	public Boolean existsByMovie(Movie movie);

	public List<Session> findAllByDate(Date date);

	@Query(value = "SELECT ROOM_ID FROM SESSIONS WHERE DATE = :date AND ((TIME_START <= :startTime AND TIME_END >= :startTime) OR (TIME_START <= :endTime AND TIME_END >= :endTime))", nativeQuery = true)
	public List<Long> findAllByDateAndStartTimeAndEndTime(@Param("date") Date date, @Param("startTime") Date startTime,
			@Param("endTime") Date endTime);
}
