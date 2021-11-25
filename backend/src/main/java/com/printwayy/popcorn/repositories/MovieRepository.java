package com.printwayy.popcorn.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.printwayy.popcorn.models.Movie;

@Repository
public interface MovieRepository extends CrudRepository<Movie, Long> {
	public Boolean existsByTitle(String title);

	public Movie findByTitle(String title);

	public Boolean existsByTitleAndIdNotLike(String title, Long Id);
}
