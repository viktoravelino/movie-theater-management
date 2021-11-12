package com.printwayy.popcorn.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.printwayy.popcorn.models.Movie;
import com.printwayy.popcorn.models.Session;

@Repository
public interface SessionRepository extends CrudRepository<Session, Long> {

	public Boolean existsByMovie(Movie movie);
}
