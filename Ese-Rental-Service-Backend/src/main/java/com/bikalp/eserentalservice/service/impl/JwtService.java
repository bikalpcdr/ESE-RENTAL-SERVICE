package com.bikalp.eserentalservice.service.impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Slf4j
@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    private SecretKey getSigningKey() {
        try {
            log.debug("Generating signing key from secret");
            if (secretKey == null || secretKey.trim().isEmpty()) {
                throw new IllegalStateException("JWT secret key is not configured");
            }
            byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
            return Keys.hmacShaKeyFor(keyBytes);
        } catch (Exception e) {
            log.error("Error generating signing key: {}", e.getMessage(), e);
            throw new RuntimeException("Error generating signing key", e);
        }
    }

    public String extractUsername(String token) {
        try {
            log.debug("Extracting username from token");
            return extractClaim(token, Claims::getSubject);
        } catch (Exception e) {
            log.error("Error extracting username from token: {}", e.getMessage(), e);
            throw new RuntimeException("Error extracting username from token", e);
        }
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        try {
            log.debug("Extracting claim from token");
            final Claims claims = extractAllClaims(token);
            return claimsResolver.apply(claims);
        } catch (Exception e) {
            log.error("Error extracting claim from token: {}", e.getMessage(), e);
            throw new RuntimeException("Error extracting claim from token", e);
        }
    }

    public String generateToken(UserDetails userDetails) {
        try {
            log.debug("Generating token for user: {}", userDetails.getUsername());
            Map<String, Object> claims = new HashMap<>();
            claims.put("authorities", userDetails.getAuthorities());
            return generateToken(claims, userDetails);
        } catch (Exception e) {
            log.error("Error generating token: {}", e.getMessage(), e);
            throw new RuntimeException("Error generating token", e);
        }
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        try {
            log.debug("Generating token with extra claims for user: {}", userDetails.getUsername());
            if (userDetails == null || userDetails.getUsername() == null) {
                throw new IllegalArgumentException("UserDetails or username cannot be null");
            }
            
            Date now = new Date();
            Date expiryDate = new Date(now.getTime() + jwtExpiration * 1000);
            
            log.debug("Token expiration set to: {}", expiryDate);
            
            return Jwts.builder()
                    .setClaims(extraClaims)
                    .setSubject(userDetails.getUsername())
                    .setIssuedAt(now)
                    .setExpiration(expiryDate)
                    .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                    .compact();
        } catch (Exception e) {
            log.error("Error generating token with extra claims: {}", e.getMessage(), e);
            throw new RuntimeException("Error generating token with extra claims", e);
        }
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            log.debug("Validating token for user: {}", userDetails.getUsername());
            final String username = extractUsername(token);
            boolean isValid = (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
            log.debug("Token validation result: {}", isValid);
            return isValid;
        } catch (Exception e) {
            log.error("Error validating token: {}", e.getMessage(), e);
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        try {
            log.debug("Checking if token is expired");
            return extractExpiration(token).before(new Date());
        } catch (Exception e) {
            log.error("Error checking token expiration: {}", e.getMessage(), e);
            return true;
        }
    }

    private Date extractExpiration(String token) {
        try {
            log.debug("Extracting expiration from token");
            return extractClaim(token, Claims::getExpiration);
        } catch (Exception e) {
            log.error("Error extracting expiration from token: {}", e.getMessage(), e);
            throw new RuntimeException("Error extracting expiration from token", e);
        }
    }

    private Claims extractAllClaims(String token) {
        try {
            log.debug("Extracting all claims from token");
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            log.error("Error extracting claims from token: {}", e.getMessage(), e);
            throw new RuntimeException("Error extracting claims from token", e);
        }
    }
} 