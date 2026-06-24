package com.reviewpages.service;

import com.reviewpages.dto.ChapterResponse;
import com.reviewpages.entity.Chapter;
import com.reviewpages.repository.ChapterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChapterService {
    private final ChapterRepository chapterRepository;

    public List<ChapterResponse> listByReading(Long readingId) {
        return chapterRepository.findByReadingIdOrderByChapterOrder(readingId)
                .stream().map(this::toResponse).toList();
    }

    public ChapterResponse getChapter(Long id) {
        var chapter = chapterRepository.findById(id)
                .orElseThrow(() -> new com.reviewpages.exception.ResourceNotFoundException("Chapter not found"));
        return toResponse(chapter);
    }

    private ChapterResponse toResponse(Chapter c) {
        return ChapterResponse.builder()
                .id(c.getId())
                .readingId(c.getReading().getId())
                .title(c.getTitle())
                .content(c.getContent())
                .chapterOrder(c.getChapterOrder())
                .createdAt(c.getCreatedAt())
                .build();
    }
}
