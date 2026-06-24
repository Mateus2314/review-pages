package com.reviewpages.slides;

import com.reviewpages.service.ChapterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SlidesController {

    private final SlidesService slidesService;
    private final ChapterService chapterService;

    /**
     * Generate a slide deck from a chapter's content.
     * GET /api/v1/chapters/{chapterId}/slides
     */
    @GetMapping("/chapters/{chapterId}/slides")
    public ResponseEntity<List<SlideDTO>> generateSlides(@PathVariable Long chapterId) {
        var chapter = chapterService.getChapter(chapterId);
        if (chapter.getContent() == null || chapter.getContent().isBlank()) {
            return ResponseEntity.noContent().build();
        }
        List<SlideDTO> slides = slidesService.generateSlides(chapter.getContent());
        return ResponseEntity.ok(slides);
    }
}
