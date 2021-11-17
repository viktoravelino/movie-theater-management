package com.printwayy.popcorn.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		Map<String, User> userDataSource = new HashMap<>();
		userDataSource.put("foo", new User("foo", "12345", new ArrayList<>()));
		return userDataSource.get(userName);
	}

}
