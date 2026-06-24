package com.reviewpages.repository;

import com.reviewpages.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByReadingIdOrderByCreatedAtAsc(Long readingId);
    long countByReadingId(Long readingId);
    void deleteByReadingId(Long readingId);
}
