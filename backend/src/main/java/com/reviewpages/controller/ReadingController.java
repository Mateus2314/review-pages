package com.reviewpages.controller;

import com.reviewpages.dto.*;
import com.reviewpages.entity.Reading;
import com.reviewpages.service.ReadingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/readings")
@RequiredArgsConstructor
public class ReadingController {
    private final ReadingService readingService;

    @GetMapping
    public ResponseEntity<Page<ReadingResponse>> listReadings(
            @RequestParam(required = false) Reading.ReadingType type,
            @RequestParam(required = false) Reading.ReadingStatus status,
            @RequestParam(required = false) String tag,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Authentication auth) {
        Long userId = auth != null ? (Long) auth.getPrincipal() : null;
        return ResponseEntity.ok(readingService.listReadings(type, status, tag, page, size, userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReadingResponse> getReading(@PathVariable Long id, Authentication auth) {
        Long userId = auth != null ? (Long) auth.getPrincipal() : null;
        return ResponseEntity.ok(readingService.getReading(id, userId));
    }

    @PostMapping
    public ResponseEntity<ReadingResponse> createReading(@Valid @RequestBody ReadingRequest request,
                                                          Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(readingService.createReading(request, userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReadingResponse> updateReading(@PathVariable Long id,
                                                          @Valid @RequestBody ReadingRequest request,
                                                          Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(readingService.updateReading(id, request, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReading(@PathVariable Long id, Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        readingService.deleteReading(id, userId);
        return ResponseEntity.noContent().build();
    }
}
