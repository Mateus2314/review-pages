package com.reviewpages.service;

import com.reviewpages.dto.CommentRequest;
import com.reviewpages.dto.CommentResponse;
import com.reviewpages.entity.Comment;
import com.reviewpages.exception.ResourceNotFoundException;
import com.reviewpages.repository.CommentRepository;
import com.reviewpages.repository.ReadingRepository;
import com.reviewpages.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final ReadingRepository readingRepository;
    private final UserRepository userRepository;

    public List<CommentResponse> getComments(Long readingId) {
        return commentRepository.findByReadingIdOrderByCreatedAtAsc(readingId).stream()
                .map(this::toResponse)
                .toList();
    }

    public CommentResponse addComment(Long readingId, CommentRequest request, Long userId) {
        var reading = readingRepository.findById(readingId)
                .orElseThrow(() -> new ResourceNotFoundException("Reading not found"));
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        var comment = Comment.builder()
                .text(request.getText())
                .reading(reading)
                .user(user)
                .build();
        comment = commentRepository.save(comment);
        return toResponse(comment);
    }

    public void deleteComment(Long id, Long userId) {
        var comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
        if (!comment.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("Not your comment");
        }
        commentRepository.delete(comment);
    }

    private CommentResponse toResponse(Comment c) {
        return CommentResponse.builder()
                .id(c.getId())
                .text(c.getText())
                .userId(c.getUser().getId())
                .userName(c.getUser().getName())
                .userAvatar(c.getUser().getAvatar())
                .createdAt(c.getCreatedAt())
                .build();
    }
}
