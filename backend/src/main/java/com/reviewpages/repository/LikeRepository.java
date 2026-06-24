package com.reviewpages.repository;

import com.reviewpages.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByReadingIdAndUserId(Long readingId, Long userId);
    boolean existsByReadingIdAndUserId(Long readingId, Long userId);
    long countByReadingId(Long readingId);
    void deleteByReadingId(Long readingId);
}
