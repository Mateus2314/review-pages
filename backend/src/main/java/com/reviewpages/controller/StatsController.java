package com.reviewpages.controller;

import com.reviewpages.dto.StatsResponse;
import com.reviewpages.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/stats")
@RequiredArgsConstructor
public class StatsController {
    private final StatsService statsService;

    @GetMapping
    public ResponseEntity<StatsResponse> getStats(Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(statsService.getStats(userId));
    }
}
