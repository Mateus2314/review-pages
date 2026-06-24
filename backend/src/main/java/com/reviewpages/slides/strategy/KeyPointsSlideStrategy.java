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

        // Find relevant image based on title or bullet content
        String imageUrl = findImageForSection(title, bullets);

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
                    .imageUrl(imageUrl)
                    .order(order++)
                    .build());
            // Only show image on first slide
            imageUrl = null;
            idx = end;
        }

        return slides;
    }

    /**
     * Maps section keywords to relevant images.
     */
    private String findImageForSection(String title, List<String> bullets) {
        String combined = (title != null ? title.toLowerCase() : "") + " " +
                String.join(" ", bullets).toLowerCase();

        if (combined.contains("anne rice") || combined.contains("rice")) {
            return "/images/anne-rice.jpeg";
        }
        if (combined.contains("jesus") || combined.contains("histórico")) {
            return "/images/historical-jesus.jpeg";
        }
        if (combined.contains("c.s. lewis") || combined.contains("cs lewis") || combined.contains("trilema")) {
            return "/images/cs-lewis.jpg";
        }
        if (combined.contains("testemunha") || combined.contains("ocular") || combined.contains("bauckham")) {
            return "/images/eyewitness-papyrus.jpg";
        }
        if (combined.contains("gnóstico") || combined.contains("tomé")) {
            return "/images/gnostic-gospels.jpeg";
        }
        if (combined.contains("contraproducente") || combined.contains("crucificação")) {
            return "/images/counterproductive.jpeg";
        }
        if (combined.contains("literário") || combined.contains("literária") || combined.contains("gênero")) {
            return "/images/lewis-literary.jpg";
        }
        if (combined.contains("detalhe") || combined.contains("realista")) {
            return "/images/real-details.jpg";
        }
        if (combined.contains("stepford") || combined.contains("cultural")) {
            return "/images/god-of-stepford.jpg";
        }

        return null;
    }
}
