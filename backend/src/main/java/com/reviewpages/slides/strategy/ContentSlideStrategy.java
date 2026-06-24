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
        String imageUrl = findImageForContent(text);

        // Split into chunks if too long
        while (text.length() > MAX_CHARS_PER_SLIDE) {
            int splitAt = text.lastIndexOf(". ", MAX_CHARS_PER_SLIDE);
            if (splitAt < 0) splitAt = MAX_CHARS_PER_SLIDE;
            else splitAt += 1; // include the period

            String chunk = text.substring(0, splitAt).trim();
            slides.add(SlideDTO.builder()
                    .type("CONTENT")
                    .content(chunk)
                    .imageUrl(imageUrl)
                    .order(order++)
                    .build());
            // Only show image on first slide of the chunk
            imageUrl = null;
            text = text.substring(splitAt).trim();
        }

        if (!text.isEmpty()) {
            slides.add(SlideDTO.builder()
                    .type("CONTENT")
                    .content(text)
                    .imageUrl(imageUrl)
                    .order(order)
                    .build());
        }

        return slides;
    }

    /**
     * Maps content keywords to relevant images from static resources.
     */
    private String findImageForContent(String text) {
        String lower = text.toLowerCase();

        if (lower.contains("anne rice") || lower.contains("rice,")) {
            return "/images/anne-rice.jpeg";
        }
        if (lower.contains("jesus hist") || lower.contains("jesus da história") || lower.contains("jesus real")) {
            return "/images/historical-jesus.jpeg";
        }
        if (lower.contains("c.s. lewis") || lower.contains("cs lewis") || lower.contains("trilema")) {
            return "/images/cs-lewis.jpg";
        }
        if (lower.contains("testemunha ocular") || lower.contains("bauckham") || lower.contains("testemunhas")) {
            return "/images/eyewitness-papyrus.jpg";
        }
        if (lower.contains("gnóstico") || lower.contains("tomé") || lower.contains("gnostic")) {
            return "/images/gnostic-gospels.jpeg";
        }
        if (lower.contains("contraproducente") || lower.contains("crucificação") || lower.contains("vergonhosa")) {
            return "/images/counterproductive.jpeg";
        }
        if (lower.contains("literária") || lower.contains("literary") || lower.contains("gênero literário")) {
            return "/images/lewis-literary.jpg";
        }
        if (lower.contains("detalhe") || lower.contains("almofada") || lower.contains("côvado") || lower.contains("escrevia no chão")) {
            return "/images/real-details.jpg";
        }
        if (lower.contains("stepford") || lower.contains("deus que sempre concorda")) {
            return "/images/god-of-stepford.jpg";
        }

        return null;
    }
}
