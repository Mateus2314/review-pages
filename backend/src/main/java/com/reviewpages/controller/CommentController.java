package com.reviewpages.controller;

import com.reviewpages.dto.*;
import com.reviewpages.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/readings/{readingId}/comments")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable Long readingId) {
        return ResponseEntity.ok(commentService.getComments(readingId));
    }

    @PostMapping("/readings/{readingId}/comments")
    public ResponseEntity<CommentResponse> addComment(@PathVariable Long readingId,
                                                       @Valid @RequestBody CommentRequest request,
                                                       Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(commentService.addComment(readingId, request, userId));
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id, Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        commentService.deleteComment(id, userId);
        return ResponseEntity.noContent().build();
    }
}
