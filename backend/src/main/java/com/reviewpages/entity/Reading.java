package com.reviewpages.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "readings")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Reading {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 300)
    private String title;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private ReadingType type;

    @Column(length = 200)
    private String author;

    @Column(length = 500)
    private String coverUrl;

    @Column(nullable = false)
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String review;

    @Column(length = 500)
    private String tags;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private ReadingStatus status;

    private LocalDateTime startedAt;

    private LocalDateTime finishedAt;

    private Integer pageCount;

    private Integer currentPage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum ReadingType { BOOK, ARTICLE }
    public enum ReadingStatus { WANT_TO_READ, READING, FINISHED, DNF }
}
