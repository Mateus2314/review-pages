package com.reviewpages.dto;

import lombok.Data;

@Data
public class StatsResponse {
    private long totalReadings;
    private long finishedReadings;
    private long readingNow;
    private long wantToRead;
    private double averageRating;
    private long totalComments;
    private long totalLikes;
}
