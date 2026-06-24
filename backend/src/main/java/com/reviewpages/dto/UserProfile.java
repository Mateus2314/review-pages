package com.reviewpages.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class UserProfile {
    private Long id;
    private String name;
    private String email;
    private String avatar;
    private String bio;
    private LocalDateTime createdAt;
    private long totalReadings;
    private long finishedReadings;
    private double averageRating;
}
