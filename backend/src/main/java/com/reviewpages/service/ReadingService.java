package com.reviewpages.service;

import com.reviewpages.dto.*;
import com.reviewpages.entity.Reading;
import com.reviewpages.entity.User;
import com.reviewpages.exception.ResourceNotFoundException;
import com.reviewpages.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReadingService {
    private final ReadingRepository readingRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;

    public Page<ReadingResponse> listReadings(Reading.ReadingType type,
                                               Reading.ReadingStatus status,
                                               String tag, int page, int size, Long currentUserId) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return readingRepository.findByFilters(type, status, tag, pageable)
                .map(r -> toResponse(r, currentUserId));
    }

    public ReadingResponse getReading(Long id, Long currentUserId) {
        var reading = readingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reading not found"));
        return toResponse(reading, currentUserId);
    }

    public ReadingResponse createReading(ReadingRequest request, Long userId) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        var reading = Reading.builder()
                .title(request.getTitle())
                .type(request.getType())
                .author(request.getAuthor())
                .coverUrl(request.getCoverUrl())
                .rating(request.getRating() != null ? request.getRating() : 0)
                .review(request.getReview())
                .tags(request.getTags())
                .status(request.getStatus())
                .startedAt(request.getStartedAt())
                .finishedAt(request.getFinishedAt())
                .pageCount(request.getPageCount())
                .currentPage(request.getCurrentPage())
                .user(user)
                .build();
        reading = readingRepository.save(reading);
        return toResponse(reading, userId);
    }

    public ReadingResponse updateReading(Long id, ReadingRequest request, Long userId) {
        var reading = readingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reading not found"));

        if (!reading.getUser().getId().equals(userId)) {
            throw new org.springframework.security.access.AccessDeniedException("Not your reading");
        }

        reading.setTitle(request.getTitle());
        reading.setType(request.getType());
        reading.setAuthor(request.getAuthor());
        reading.setCoverUrl(request.getCoverUrl());
        reading.setRating(request.getRating() != null ? request.getRating() : 0);
        reading.setReview(request.getReview());
        reading.setTags(request.getTags());
        reading.setStatus(request.getStatus());
        reading.setStartedAt(request.getStartedAt());
        reading.setFinishedAt(request.getFinishedAt());
        reading.setPageCount(request.getPageCount());
        reading.setCurrentPage(request.getCurrentPage());

        reading = readingRepository.save(reading);
        return toResponse(reading, userId);
    }

    @Transactional
    public void deleteReading(Long id, Long userId) {
        var reading = readingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reading not found"));
        if (!reading.getUser().getId().equals(userId)) {
            throw new org.springframework.security.access.AccessDeniedException("Not your reading");
        }
        commentRepository.deleteByReadingId(id);
        likeRepository.deleteByReadingId(id);
        readingRepository.delete(reading);
    }

    private ReadingResponse toResponse(Reading r, Long currentUserId) {
        boolean liked = currentUserId != null &&
                likeRepository.existsByReadingIdAndUserId(r.getId(), currentUserId);
        return ReadingResponse.builder()
                .id(r.getId())
                .title(r.getTitle())
                .type(r.getType())
                .author(r.getAuthor())
                .coverUrl(r.getCoverUrl())
                .rating(r.getRating())
                .review(r.getReview())
                .tags(r.getTags())
                .status(r.getStatus())
                .startedAt(r.getStartedAt())
                .finishedAt(r.getFinishedAt())
                .pageCount(r.getPageCount())
                .currentPage(r.getCurrentPage())
                .userId(r.getUser().getId())
                .userName(r.getUser().getName())
                .commentCount(commentRepository.countByReadingId(r.getId()))
                .likeCount(likeRepository.countByReadingId(r.getId()))
                .likedByMe(liked)
                .createdAt(r.getCreatedAt())
                .build();
    }
}
