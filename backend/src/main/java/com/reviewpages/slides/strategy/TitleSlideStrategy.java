package com.reviewpages.slides.strategy;

import com.reviewpages.slides.SlideDTO;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Generates the opening title slide from the first heading of a chapter.
 */
@Component
public class TitleSlideStrategy implements SlideStrategy {

    @Override
    public boolean canHandle(String section, int index) {
        return index == 0 && section.startsWith("# ");
    }

    @Override
    public List<SlideDTO> generate(String section, int order) {
        // Extract title: first line starting with "# "
        String title = "";
        String content = "";

        String[] lines = section.split("\n", 2);
        if (lines.length > 0) {
            title = lines[0].replaceAll("^#+\\s*", "").trim();
        }
        if (lines.length > 1) {
            content = lines[1].replaceAll("^>\\s*", "").trim();
        }

        // Truncate content for the slide
        if (content.length() > 200) {
            content = content.substring(0, 200) + "...";
        }

        return List.of(SlideDTO.builder()
                .type("TITLE")
                .title(title)
                .content(content)
                .imageUrl("/images/chapter-title-bg.png")
                .order(order)
                .build());
    }
}
