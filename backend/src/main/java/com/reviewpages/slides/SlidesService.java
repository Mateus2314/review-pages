package com.reviewpages.slides;

import com.reviewpages.slides.strategy.ContentSlideStrategy;
import com.reviewpages.slides.strategy.SlideStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Orchestrates slide generation using the Strategy pattern.
 * Takes markdown chapter content and delegates to registered strategies
 * to produce a cohesive slide deck.
 */
@Service
@RequiredArgsConstructor
public class SlidesService {

    private final List<SlideStrategy> strategies;

    /**
     * Generates a slide deck from markdown content.
     * The content is split into sections (paragraphs/blocks) and each
     * strategy determines which blocks it can handle.
     */
    public List<SlideDTO> generateSlides(String content) {
        List<SlideDTO> allSlides = new ArrayList<>();
        String[] sections = splitIntoSections(content);
        int order = 0;

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
     * Splits markdown content into logical sections separated by blank lines or thematic breaks.
     */
    private String[] splitIntoSections(String content) {
        // Split on blank lines (paragraph breaks) and thematic breaks (---)
        return content.split("(?m)\n\\s*\n|(?m)^---\\s*$");
    }
}
