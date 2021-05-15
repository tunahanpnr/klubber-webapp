package com.spaghettiCoders.klubber.application.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final CustomUserDetailsManager userDetailsManager;


	@Override
	public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
		return userDetailsManager.loadUserByUsername(username);
	}
}
