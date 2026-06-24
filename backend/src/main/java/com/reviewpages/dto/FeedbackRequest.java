package com.reviewpages.dto;

import com.reviewpages.entity.Feedback;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FeedbackRequest {
    @NotBlank
    private String message;

    @NotNull
    private Feedback.FeedbackType type;
}
