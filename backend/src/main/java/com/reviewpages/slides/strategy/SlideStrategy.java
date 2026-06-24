package com.reviewpages.slides.strategy;

import com.reviewpages.slides.SlideDTO;

import java.util.List;

/**
 * Strategy pattern: each strategy knows how to extract specific slide types
 * from a markdown chapter content.
 */
public interface SlideStrategy {
    /**
     * Returns true if this strategy can handle the given section/markdown block.
     */
    boolean canHandle(String section, int index);

    /**
     * Generates one or more slides from the section content.
     */
    List<SlideDTO> generate(String section, int order);
}
