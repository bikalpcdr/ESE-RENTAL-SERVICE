package com.bikalp.eserentalservice.controller;

import com.bikalp.eserentalservice.controller.basecontroller.BaseController;
import com.bikalp.eserentalservice.dto.GlobalAPIResponse;
import com.bikalp.eserentalservice.dto.UserDto;
import com.bikalp.eserentalservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController extends BaseController {

    private final UserService userService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<GlobalAPIResponse> create(@Valid @RequestBody UserDto userDto) {
        return createdResponse("User created successfully", userService.createUser(userDto));
    }

    @PostMapping("/update")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<GlobalAPIResponse> update(@Valid @RequestBody UserDto userDto) {
        return successResponse("User updated successfully", userService.updateUser(userDto));
    }

    @PostMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<GlobalAPIResponse> getById(@PathVariable Long id) {
        return successResponse("User retrieved successfully", userService.getUserById(id));
    }

    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    @GetMapping
    public ResponseEntity<GlobalAPIResponse> getAllUsers() {
        return successResponse("Users retrieved successfully", userService.getAllUsers());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<GlobalAPIResponse> deleteById(@PathVariable Long id) {
        userService.deleteUser(id);
        return noContentResponse("User deleted successfully");
    }

    @PostMapping("/toggle-status/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<GlobalAPIResponse> toggleStatus(@PathVariable Long id) {
        return successResponse("User status toggled successfully", userService.toggleUserStatus(id));
    }
}
