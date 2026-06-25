package com.reviewpages.slides.strategy;

import com.reviewpages.slides.SlideDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Generates content slides from regular paragraphs.
 * Keeps only the first ~300 chars as a concise summary slide.
 */
@Component
public class ContentSlideStrategy implements SlideStrategy {

    @Override
    public boolean canHandle(String section, int index) {
        if (index == 0) return false; // Title handled by TitleSlideStrategy
        String trimmed = section.trim();
        return !trimmed.isEmpty()
                && !trimmed.startsWith("---")
                && !trimmed.startsWith(">");
    }

    @Override
    public List<SlideDTO> generate(String section, int order) {
        List<SlideDTO> slides = new ArrayList<>();
        String text = section.trim();

        // Extract heading (## or ###)
        String[] lines = text.split("\n", 2);
        String slideTitle = "";
        if (lines.length > 0) {
            String firstLine = lines[0].trim();
            if (firstLine.startsWith("## ") || firstLine.startsWith("### ")) {
                slideTitle = firstLine.substring(firstLine.indexOf(' ') + 1).trim();
                text = lines.length > 1 ? lines[1].trim() : "";
            }
        }

        // Find matching image
        String imageUrl = ImageMatcher.findImage(slideTitle + " " + text);

        // Strip image markdown tags from content (they're embeded for resenha but clutter slides)
        text = text.replaceAll("!\\[[^\\]]*\\]\\([^)]*\\)", "").trim();

        if (text.isEmpty()) {
            slides.add(SlideDTO.builder()
                    .type("CONTENT")
                    .title(slideTitle)
                    .imageUrl(imageUrl)
                    .order(order)
                    .build());
            return slides;
        }

        // CONCISE APPROACH: Keep only first ~300 chars (key paragraph)
        // No chunking into multiple slides
        final int MAX_CONCISE = 300;
        String content = text;
        if (content.length() > MAX_CONCISE) {
            int splitAt = content.lastIndexOf(". ", MAX_CONCISE);
            if (splitAt < MAX_CONCISE / 2) splitAt = MAX_CONCISE; // If no good sentence break
            else splitAt += 1; // include period
            content = content.substring(0, Math.min(splitAt, content.length())).trim();
            content += "\n\n*... continued in the full text*";
        }

        slides.add(SlideDTO.builder()
                .type("CONTENT")
                .title(slideTitle)
                .content(content)
                .imageUrl(imageUrl)
                .order(order)
                .build());

        return slides;
    }
}
