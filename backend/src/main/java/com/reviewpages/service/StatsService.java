package com.reviewpages.service;

import com.reviewpages.dto.StatsResponse;
import com.reviewpages.entity.Reading;
import com.reviewpages.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatsService {
    private final ReadingRepository readingRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;

    public StatsResponse getStats(Long userId) {
        var response = new StatsResponse();
        response.setTotalReadings(readingRepository.countByUserId(userId));
        response.setFinishedReadings(
                readingRepository.countByUserIdAndStatus(userId, Reading.ReadingStatus.FINISHED));
        response.setReadingNow(
                readingRepository.countByUserIdAndStatus(userId, Reading.ReadingStatus.READING));
        response.setWantToRead(
                readingRepository.countByUserIdAndStatus(userId, Reading.ReadingStatus.WANT_TO_READ));
        response.setAverageRating(readingRepository.averageRatingByUserId(userId));

        var readings = readingRepository.findByUserIdOrderByCreatedAtDesc(userId, org.springframework.data.domain.PageRequest.of(0, 1000));
        long totalComments = readings.stream()
                .mapToLong(r -> commentRepository.countByReadingId(r.getId()))
                .sum();
        long totalLikes = readings.stream()
                .mapToLong(r -> likeRepository.countByReadingId(r.getId()))
                .sum();
        response.setTotalComments(totalComments);
        response.setTotalLikes(totalLikes);
        return response;
    }
}
