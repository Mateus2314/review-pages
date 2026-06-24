package com.reviewpages.controller;

import com.reviewpages.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/readings/{readingId}/like")
    public ResponseEntity<Map<String, Object>> toggleLike(@PathVariable Long readingId,
                                                           Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(likeService.toggleLike(readingId, userId));
    }
}
