package com.wheelo.security;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtUtil;

	private static final List<String> OPEN_ENDPOINTS = Arrays.asList(
			"/customers/signup", "/customers/login"
	);


	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String requestPath = request.getRequestURI();
		if (OPEN_ENDPOINTS.stream().anyMatch(requestPath::startsWith)) {
			filterChain.doFilter(request, response);
			return;
		}

		String authHeader = request.getHeader("Authorization");
		boolean validHeader = authHeader != null && authHeader.startsWith("Bearer");
		Authentication auth = null;

		if (validHeader) {
			String token = authHeader.replace("Bearer", "").trim();
			auth = jwtUtil.validateToken(token);
		}

		if (auth != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			SecurityContextHolder.getContext().setAuthentication(auth);
		}

		filterChain.doFilter(request, response);
	}
}
