package com.reviewpages.slides;

import com.reviewpages.slides.strategy.*;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Orchestrates slide generation using the Strategy pattern.
 * Takes markdown chapter content and delegates to registered strategies
 * to produce a cohesive slide deck.
 */
@Service
public class SlidesService {

    private final List<SlideStrategy> strategies;

    public SlidesService(List<SlideStrategy> strategyList) {
        // Sort strategies: Quote (most specific) -> KeyPoints -> Content -> Title
        Map<Class<?>, Integer> order = Map.of(
                QuoteSlideStrategy.class, 1,
                KeyPointsSlideStrategy.class, 2,
                ContentSlideStrategy.class, 3,
                TitleSlideStrategy.class, 4
        );
        strategyList.sort(Comparator.comparingInt(s -> order.getOrDefault(s.getClass(), 99)));
        this.strategies = strategyList;
    }

    /**
     * Generates a slide deck from markdown content.
     * The content is split into sections (paragraphs/blocks) and each
     * strategy determines which blocks it can handle.
     */
    public List<SlideDTO> generateSlides(String content) {
        return generateSlides(content, null);
    }

    /**
     * Generates a slide deck with a chapter title for the opening slide.
     */
    public List<SlideDTO> generateSlides(String content, String chapterTitle) {
        List<SlideDTO> allSlides = new ArrayList<>();

        // Special handling: title slide from chapter title (content starts with ## not #)
        if (chapterTitle != null && !chapterTitle.isBlank()) {
            allSlides.add(SlideDTO.builder()
                    .type("TITLE")
                    .title(chapterTitle)
                    .content("Uma reflexão sobre a confiabilidade das Escrituras")
                    .imageUrl("/images/chapter-title-bg.jpeg")
                    .order(0)
                    .build());
        }

        String[] sections = splitIntoSections(content);
        int order = allSlides.size();

        for (int i = 0; i < sections.length; i++) {
            String section = sections[i].trim();
            if (section.isEmpty()) continue;

            boolean handled = false;
            for (SlideStrategy strategy : strategies) {
                if (strategy.canHandle(section, i)) {
                    List<SlideDTO> generated = strategy.generate(section, order);
                    allSlides.addAll(generated);
                    order += generated.size();
                    handled = true;
                    break;
                }
            }

            // Fallback: treat unhandled sections as content
            if (!handled && !section.isEmpty()) {
                ContentSlideStrategy fallback = new ContentSlideStrategy();
                if (fallback.canHandle(section, i)) {
                    List<SlideDTO> generated = fallback.generate(section, order);
                    allSlides.addAll(generated);
                    order += generated.size();
                }
            }
        }

        // Ensure ordering
        allSlides.sort(Comparator.comparingInt(SlideDTO::getOrder));
        return allSlides;
    }

    /**
     * Splits markdown content into logical sections by headings (##), blank lines, and thematic breaks.
     * This produces larger, more meaningful slides compared to paragraph-by-paragraph splitting.
     */
    private String[] splitIntoSections(String content) {
        // First, try to split on major section headings (## not followed by more #)
        // This groups content under each heading into a cohesive section
        // Fall back to blank-line splitting for sections without headings
        String[] sections = content.split("(?m)^##\\s+");

        // If we got only one section, try thematic breaks or paragraph breaks
        if (sections.length <= 1) {
            sections = content.split("(?m)\n\\s*\n|(?m)^---\\s*$");
        } else {
            // Re-add the ## prefix to each section (except the first, which is the intro)
            for (int i = 1; i < sections.length; i++) {
                sections[i] = "## " + sections[i];
            }
        }

        return sections;
    }
}
