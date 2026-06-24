package com.reviewpages.controller;

import com.reviewpages.dto.*;
import com.reviewpages.entity.Feedback;
import com.reviewpages.exception.ResourceNotFoundException;
import com.reviewpages.repository.FeedbackRepository;
import com.reviewpages.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/feedback")
@RequiredArgsConstructor
public class FeedbackController {
    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Map<String, String>> submit(@Valid @RequestBody FeedbackRequest request,
                                                       Authentication auth) {
        var feedback = Feedback.builder()
                .message(request.getMessage())
                .type(request.getType() != null ? request.getType() : Feedback.FeedbackType.OTHER)
                .build();
        if (auth != null) {
            var user = userRepository.findById((Long) auth.getPrincipal())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            feedback.setUser(user);
        }
        feedbackRepository.save(feedback);
        return ResponseEntity.ok(Map.of("message", "Feedback submitted"));
    }
}
