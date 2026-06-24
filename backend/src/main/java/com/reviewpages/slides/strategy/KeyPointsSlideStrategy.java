package com.reviewpages.slides.strategy;

import com.reviewpages.slides.SlideDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Extracts bullet lists and numbered lists as key-point slides.
 */
@Component
public class KeyPointsSlideStrategy implements SlideStrategy {

    @Override
    public boolean canHandle(String section, int index) {
        return section.matches("(?ms).*^[\\-\\*\\d+\\.]\\s+.*");
    }

    @Override
    public List<SlideDTO> generate(String section, int order) {
        List<String> bullets = new ArrayList<>();
        String title = "";

        // Try to find a title before the list
        Pattern titlePattern = Pattern.compile("(?m)^(##?\\s+)(.+)$");
        Matcher titleMatcher = titlePattern.matcher(section);
        if (titleMatcher.find()) {
            title = titleMatcher.group(2).trim();
        }

        // Extract bullet items
        Pattern bulletPattern = Pattern.compile("(?m)^[\\-\\*\\d+\\.]\\s+(.+)$");
        Matcher matcher = bulletPattern.matcher(section);
        while (matcher.find()) {
            bullets.add(matcher.group(1).trim());
        }

        if (bullets.isEmpty()) return List.of();

        // If too many bullets, split into multiple slides
        List<SlideDTO> slides = new ArrayList<>();
        int idx = 0;
        while (idx < bullets.size()) {
            int end = Math.min(idx + 4, bullets.size());
            List<String> chunk = bullets.subList(idx, end);
            slides.add(SlideDTO.builder()
                    .type("KEY_POINTS")
                    .title(title.isEmpty() ? null : title + (idx > 0 ? " (cont.)" : ""))
                    .bullets(chunk)
                    .order(order++)
                    .build());
            idx = end;
        }

        return slides;
    }
}
