package com.reviewpages.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ChapterResponse {
    private Long id;
    private Long readingId;
    private String title;
    private String content;
    private Integer chapterOrder;
    private String pdfUrl;
    private LocalDateTime createdAt;
}
