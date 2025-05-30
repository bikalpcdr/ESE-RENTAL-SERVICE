package com.bikalp.eserentalservice.service;

import com.bikalp.eserentalservice.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

/**
 * Service interface for User-related operations.
 */
public interface UserService extends UserDetailsService {
    
    /**
     * Create a new user
     * @param userDto the user data
     * @return the created user DTO
     */
    UserDto createUser(UserDto userDto);

    /**
     * Get a user by their ID
     * @param id the user ID
     * @return the user DTO
     */
    UserDto getUserById(Long id);

    /**
     * Get a user by their username
     * @param username the username
     * @return the user DTO
     */
    UserDto getUserByUsername(String username);

    /**
     * Get a user by their email
     * @param email the email
     * @return the user DTO
     */
    UserDto getUserByEmail(String email);

    /**
     * Get all users
     * @return list of user DTOs
     */
    List<UserDto> getAllUsers();

    /**
     * Update a user
     * @param id the user ID
     * @param userDto the updated user data
     * @return the updated user DTO
     */
    UserDto updateUser(Long id, UserDto userDto);

    /**
     * Delete a user
     * @param id the user ID
     */
    void deleteUser(Long id);

    /**
     * Check if a username exists
     * @param username the username to check
     * @return true if the username exists, false otherwise
     */
    boolean existsByUsername(String username);

    /**
     * Check if an email exists
     * @param email the email to check
     * @return true if the email exists, false otherwise
     */
    boolean existsByEmail(String email);
} 