package com.bikalp.eserentalservice.service.impl;

import com.bikalp.eserentalservice.repository.RoomImageRepo;
import com.bikalp.eserentalservice.repository.RoomRepo;
import com.bikalp.eserentalservice.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepo roomRepo;
    private final RoomImageRepo roomImageRepository;
} 