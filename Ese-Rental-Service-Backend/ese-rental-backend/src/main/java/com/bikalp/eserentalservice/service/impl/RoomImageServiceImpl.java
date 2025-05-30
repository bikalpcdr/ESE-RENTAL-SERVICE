package com.bikalp.eserentalservice.service.impl;

import com.bikalp.eserentalservice.repository.RoomImageRepo;
import com.bikalp.eserentalservice.repository.RoomRepo;
import com.bikalp.eserentalservice.service.RoomImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RoomImageServiceImpl implements RoomImageService {

    private final RoomImageRepo roomImageRepo;
    private final RoomRepo roomRepo;
} 