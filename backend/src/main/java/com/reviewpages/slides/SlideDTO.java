package com.reviewpages.slides;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SlideDTO {
    private String type;          // TITLE, CONTENT, QUOTE, KEY_POINTS, CLOSING
    private String title;         // Slide title (e.g. "Introdução")
    private String content;       // Main body text (markdown)
    private List<String> bullets; // Bullet points (for KEY_POINTS type)
    private String quote;         // Quote text (for QUOTE type)
    private String attribution;   // Quote author
    private String imageUrl;      // Background or illustration image URL
    private int order;            // Slide order in the deck
}
