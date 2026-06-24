package com.reviewpages.repository;

import com.reviewpages.entity.Reading;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ReadingRepository extends JpaRepository<Reading, Long> {
    Page<Reading> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    @Query("SELECT r FROM Reading r WHERE " +
           "(:type IS NULL OR r.type = :type) AND " +
           "(:status IS NULL OR r.status = :status) AND " +
           "(:tag IS NULL OR r.tags LIKE %:tag%)")
    Page<Reading> findByFilters(@Param("type") Reading.ReadingType type,
                                @Param("status") Reading.ReadingStatus status,
                                @Param("tag") String tag,
                                Pageable pageable);

    long countByUserId(Long userId);
    long countByUserIdAndStatus(Long userId, Reading.ReadingStatus status);

    @Query("SELECT COALESCE(AVG(r.rating), 0) FROM Reading r WHERE r.user.id = :userId AND r.status = 'FINISHED'")
    double averageRatingByUserId(@Param("userId") Long userId);

    @Query("SELECT r.tags FROM Reading r WHERE r.user.id = :userId AND r.tags IS NOT NULL")
    List<String> findAllTagsByUserId(@Param("userId") Long userId);
}
