package com.reviewpages.controller;

import com.reviewpages.dto.ChapterResponse;
import com.reviewpages.service.ChapterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ChapterController {
    private final ChapterService chapterService;

    @GetMapping("/readings/{readingId}/chapters")
    public ResponseEntity<List<ChapterResponse>> listChapters(@PathVariable Long readingId) {
        return ResponseEntity.ok(chapterService.listByReading(readingId));
    }

    @GetMapping("/chapters/{id}")
    public ResponseEntity<ChapterResponse> getChapter(@PathVariable Long id) {
        return ResponseEntity.ok(chapterService.getChapter(id));
    }
}
