package com.taskmanager.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthFilter(JwtUtil jwtUtil,
                         CustomUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                            HttpServletResponse response,
                            FilterChain filterChain)
    throws ServletException, IOException {

    String header = request.getHeader("Authorization");
    
    System.out.println("🔍 Request: " + request.getMethod() + " " + request.getRequestURI());
    System.out.println("🔍 Authorization Header: " + header);

    if (header != null && header.startsWith("Bearer ")) {
        String token = header.substring(7);
        System.out.println("🔍 Extracted Token: " + token.substring(0, 20) + "...");

        if (jwtUtil.validate(token)) {
            String username = jwtUtil.extractUsername(token);
            System.out.println("✅ JWT Valid - Username: " + username);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                var userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());

                auth.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(auth);
                System.out.println("✅ Authentication set for user: " + username);
            }
        } else {
            System.out.println("❌ JWT validation failed");
        }
    } else {
        System.out.println("⚠️ No Bearer token found");
    }

    filterChain.doFilter(request, response);
}
}
