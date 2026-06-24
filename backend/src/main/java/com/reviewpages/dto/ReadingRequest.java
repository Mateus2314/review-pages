package com.reviewpages.dto;

import com.reviewpages.entity.Reading;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReadingRequest {
    @NotBlank @Size(max = 300)
    private String title;

    @NotNull
    private Reading.ReadingType type;

    @Size(max = 200)
    private String author;

    @Size(max = 500)
    private String coverUrl;

    @Min(0) @Max(5)
    private Integer rating;

    private String review;

    private String tags;

    @NotNull
    private Reading.ReadingStatus status;

    private LocalDateTime startedAt;
    private LocalDateTime finishedAt;

    @Min(0)
    private Integer pageCount;

    @Min(0)
    private Integer currentPage;
}
