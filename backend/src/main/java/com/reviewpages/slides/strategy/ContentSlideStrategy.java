package com.reviewpages.slides.strategy;

import com.reviewpages.slides.SlideDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Generates content slides from regular paragraphs.
 * Splits long sections into multiple slides with ~300 chars each.
 */
@Component
public class ContentSlideStrategy implements SlideStrategy {

    private static final int MAX_CHARS_PER_SLIDE = 400;

    @Override
    public boolean canHandle(String section, int index) {
        if (index == 0) return false; // Title handled by TitleSlideStrategy
        String trimmed = section.trim();
        return !trimmed.isEmpty()
                && !trimmed.startsWith("---")
                && !trimmed.startsWith(">")
                && !trimmed.startsWith("## ")
                && !trimmed.startsWith("### ");
    }

    @Override
    public List<SlideDTO> generate(String section, int order) {
        List<SlideDTO> slides = new ArrayList<>();
        String text = section.trim();

        // Split into chunks if too long
        while (text.length() > MAX_CHARS_PER_SLIDE) {
            int splitAt = text.lastIndexOf(". ", MAX_CHARS_PER_SLIDE);
            if (splitAt < 0) splitAt = MAX_CHARS_PER_SLIDE;
            else splitAt += 1; // include the period

            String chunk = text.substring(0, splitAt).trim();
            slides.add(SlideDTO.builder()
                    .type("CONTENT")
                    .content(chunk)
                    .order(order++)
                    .build());
            text = text.substring(splitAt).trim();
        }

        if (!text.isEmpty()) {
            slides.add(SlideDTO.builder()
                    .type("CONTENT")
                    .content(text)
                    .order(order)
                    .build());
        }

        return slides;
    }
}
