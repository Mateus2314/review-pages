package com.reviewpages.service;

import com.reviewpages.entity.Like;
import com.reviewpages.exception.ResourceNotFoundException;
import com.reviewpages.repository.LikeRepository;
import com.reviewpages.repository.ReadingRepository;
import com.reviewpages.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final ReadingRepository readingRepository;
    private final UserRepository userRepository;

    @Transactional
    public Map<String, Object> toggleLike(Long readingId, Long userId) {
        var reading = readingRepository.findById(readingId)
                .orElseThrow(() -> new ResourceNotFoundException("Reading not found"));

        var existing = likeRepository.findByReadingIdAndUserId(readingId, userId);
        if (existing.isPresent()) {
            likeRepository.delete(existing.get());
            return Map.of("liked", false, "count", likeRepository.countByReadingId(readingId));
        }

        var user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        var like = Like.builder().reading(reading).user(user).build();
        likeRepository.save(like);
        return Map.of("liked", true, "count", likeRepository.countByReadingId(readingId));
    }
}
