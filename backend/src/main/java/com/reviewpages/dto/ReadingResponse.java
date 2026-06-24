package com.reviewpages.dto;

import com.reviewpages.entity.Reading;
import lombok.*;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ReadingResponse {
    private Long id;
    private String title;
    private Reading.ReadingType type;
    private String author;
    private String coverUrl;
    private Integer rating;
    private String review;
    private String tags;
    private Reading.ReadingStatus status;
    private LocalDateTime startedAt;
    private LocalDateTime finishedAt;
    private Integer pageCount;
    private Integer currentPage;
    private Long userId;
    private String userName;
    private long commentCount;
    private long likeCount;
    private boolean likedByMe;
    private LocalDateTime createdAt;
}
