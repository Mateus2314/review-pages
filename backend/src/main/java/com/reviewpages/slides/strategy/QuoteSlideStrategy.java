package com.reviewpages.slides.strategy;

import com.reviewpages.slides.SlideDTO;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Extracts blockquotes (lines starting with >) as quote slides.
 */
@Component
public class QuoteSlideStrategy implements SlideStrategy {

    @Override
    public boolean canHandle(String section, int index) {
        String trimmed = section.trim();
        return trimmed.startsWith(">") && !trimmed.contains("```");
    }

    @Override
    public List<SlideDTO> generate(String section, int order) {
        StringBuilder quote = new StringBuilder();
        String attribution = "";

        for (String line : section.split("\n")) {
            String clean = line.replaceAll("^>\\s*", "").trim();
            if (clean.startsWith("—") || clean.startsWith("-") || clean.startsWith("--")) {
                attribution = clean.replaceAll("^[—\\-–]+\\s*", "").trim();
            } else if (clean.startsWith("**") || clean.toLowerCase().contains("escreveu")) {
                attribution = clean.replaceAll("^\\*+\\s*", "").trim();
            } else if (!clean.isEmpty()) {
                if (quote.length() > 0) quote.append(" ");
                quote.append(clean);
            }
        }

        if (quote.isEmpty()) return List.of();

        // Determine author portrait based on attribution
        String imageUrl = findPortrait(attribution);

        return List.of(SlideDTO.builder()
                .type("QUOTE")
                .quote(quote.toString().trim())
                .attribution(attribution.isEmpty() ? null : attribution)
                .imageUrl(imageUrl)
                .order(order)
                .build());
    }

    /**
     * Maps author names to portrait images.
     */
    private String findPortrait(String attribution) {
        String lower = (attribution != null) ? attribution.toLowerCase() : "";
        if (lower.contains("anne rice") || lower.contains("rice")) {
            return "/images/anne-rice.jpeg";
        }
        if (lower.contains("c.s. lewis") || lower.contains("cs lewis") || lower.contains("lewis")) {
            return "/images/cs-lewis.jpg";
        }
        return null;
    }
}
