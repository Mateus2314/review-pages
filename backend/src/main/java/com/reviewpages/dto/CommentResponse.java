package com.reviewpages.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class CommentResponse {
    private Long id;
    private String text;
    private Long userId;
    private String userName;
    private String userAvatar;
    private LocalDateTime createdAt;
}
