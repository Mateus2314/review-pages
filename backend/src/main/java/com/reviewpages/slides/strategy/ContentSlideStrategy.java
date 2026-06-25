package com.reviewpages.slides.strategy;

import com.reviewpages.slides.SlideDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Synthesizes paragraph content into key-point bullet slides.
 * <p>
 * Instead of truncating text with "..." and repeating the review verbatim,
 * this strategy extracts 3-6 meaningful topic sentences from each section
 * and presents them as self-contained, synthesized bullet points.
 * Each slide makes sense on its own without requiring the full text.
 */
@Component
public class ContentSlideStrategy implements SlideStrategy {

    private static final int MAX_BULLETS = 6;
    private static final int MIN_BULLET_LENGTH = 40;

    @Override
    public boolean canHandle(String section, int index) {
        if (index == 0) return false;
        String trimmed = section.trim();
        return !trimmed.isEmpty()
                && !trimmed.startsWith("---")
                && !trimmed.startsWith(">");
    }

    @Override
    public List<SlideDTO> generate(String section, int order) {
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

        // Find matching image for visual context
        String imageUrl = ImageMatcher.findImage(slideTitle + " " + text);

        // Check if the section's primary content is an image — if the first non-blank
        // line after the heading is an image ![alt](url) and the remaining text would
        // produce ≤1 bullet, treat as an image-only slide (no text).
        String firstContentLine = text.trim().split("\n")[0].trim();
        boolean startsWithImage = firstContentLine.startsWith("![");

        // Strip image markdown tags (they are embedded for the resenha but clutter slides)
        text = text.replaceAll("!\\[[^\\]]*\\]\\([^)]*\\)", "").trim();

        // If section starts with an image, extract its URL and check if the
        // remaining text is substantial enough for bullets
        if (startsWithImage) {
            // Extract the actual image URL from the section
            String extractedImageUrl = imageUrl;
            java.util.regex.Matcher imgMatcher = java.util.regex.Pattern.compile(
                    "!\\[[^\\]]*\\]\\(([^)]+)\\)"
            ).matcher(firstContentLine);
            if (imgMatcher.find()) {
                extractedImageUrl = imgMatcher.group(1);
            }
            if (extractedImageUrl != null) {
                imageUrl = extractedImageUrl;
            }

            // Remove caption (italic line right after the image) before extracting bullets
            String textNoCaption = text.replaceFirst("^\\*[^*]*\\*\\s*", "").trim();

            // Try extracting key points from the text stripped of images and caption
            List<String> bullets = extractKeyPoints(textNoCaption);
            // If the image is the main content (≤1 bullet), show image-only
            if (bullets.size() <= 1) {
                return List.of(SlideDTO.builder()
                        .type("KEY_POINTS")
                        .title(slideTitle)
                        .imageUrl(imageUrl)
                        .order(order)
                        .build());
            }
            // Otherwise show bullets normally
            return List.of(SlideDTO.builder()
                    .type("KEY_POINTS")
                    .title(slideTitle)
                    .bullets(bullets)
                    .imageUrl(imageUrl)
                    .order(order)
                    .build());
        }

        if (text.isEmpty()) {
            return List.of(SlideDTO.builder()
                    .type("KEY_POINTS")
                    .title(slideTitle)
                    .imageUrl(imageUrl)
                    .order(order)
                    .build());
        }

        // Extract key points by analyzing paragraph structure
        List<String> bullets = extractKeyPoints(text);

        if (bullets.isEmpty()) {
            return List.of(SlideDTO.builder()
                    .type("KEY_POINTS")
                    .title(slideTitle)
                    .imageUrl(imageUrl)
                    .order(order)
                    .build());
        }

        return List.of(SlideDTO.builder()
                .type("KEY_POINTS")
                .title(slideTitle)
                .bullets(bullets)
                .imageUrl(imageUrl)
                .order(order)
                .build());
    }

    // ------------------------------------------------------------------
    //  Key-point extraction
    // ------------------------------------------------------------------

    /**
     * Extracts 3–6 salient key points from the section text using a
     * multi-strategy approach:
     * <ol>
     *   <li>Existing markdown list items ({@code -}, {@code *}, {@code 1.})</li>
     *   <li>Lines that begin with bold text ({@code **termo** — explicação})</li>
     *   <li>First 1–2 sentences of regular paragraphs (topic sentences)</li>
     * </ol>
     */
    private List<String> extractKeyPoints(String text) {
        List<String> points = new ArrayList<>();

        // Split into blocks separated by one or more blank lines
        String[] blocks = text.split("\n\\s*\n");

        for (String block : blocks) {
            block = block.trim();
            if (block.isEmpty()) continue;

            // Strip images so we don't produce points from captions alone
            String blockNoImage = block.replaceAll("!\\[[^\\]]*\\]\\([^)]*\\)", "").trim();
            if (blockNoImage.isEmpty()) continue;

            // --- Priority 1: existing list items ---------------------------------
            List<String> listItems = extractListItems(block);
            if (!listItems.isEmpty()) {
                for (String item : listItems) {
                    String cleaned = cleanMarkdown(item);
                    if (cleaned.length() >= MIN_BULLET_LENGTH && !isRedundant(cleaned, points)) {
                        points.add(cleaned);
                    }
                    if (points.size() >= MAX_BULLETS) break;
                }
                if (points.size() >= MAX_BULLETS) break;
                continue;
            }

            // --- Priority 2: bold-prefaced lines (key terms / definitions) -------
            List<String> boldLines = extractBoldKeyPoints(block);
            if (!boldLines.isEmpty()) {
                for (String bl : boldLines) {
                    String cleaned = cleanMarkdown(bl);
                    if (cleaned.length() >= MIN_BULLET_LENGTH && !isRedundant(cleaned, points)) {
                        points.add(cleaned);
                    }
                    if (points.size() >= MAX_BULLETS) break;
                }
                if (points.size() >= MAX_BULLETS) break;
                continue;
            }

            // --- Priority 3: first sentence of a regular paragraph ---------------
            String sentence = extractFirstSentence(blockNoImage);
            sentence = cleanMarkdown(sentence);

            if (sentence.length() >= MIN_BULLET_LENGTH && !isRedundant(sentence, points)) {
                points.add(sentence);
            }

            if (points.size() >= MAX_BULLETS) break;
        }

        return points;
    }

    /**
     * Extracts existing markdown list items ({@code - item}, {@code * item},
     * {@code 1. item}, etc.).
     */
    private List<String> extractListItems(String text) {
        List<String> items = new ArrayList<>();
        Matcher matcher = Pattern.compile("(?m)^[\\-\\*\\d]+\\.?\\s+(.+)$").matcher(text);
        while (matcher.find()) {
            String item = matcher.group(1).trim();
            if (!item.isEmpty()) {
                items.add(item);
            }
        }
        return items;
    }

    /**
     * Extracts key points from lines that start with bold text, which
     * usually indicate a key term or concept definition.
     * <p>
     * Matches patterns like:
     * <ul>
     *   <li>{@code **Termo**: explicação}</li>
     *   <li>{@code **Termo** — explicação}</li>
     *   <li>{@code **Termo** – explicação}</li>
     * </ul>
     */
    private List<String> extractBoldKeyPoints(String text) {
        List<String> points = new ArrayList<>();
        Matcher matcher = Pattern.compile("(?m)^\\s*\\*\\*([^*]+)\\*\\*\\s*[—:\\-–]?\\s*(.*)$").matcher(text);
        while (matcher.find()) {
            String term = matcher.group(1).trim();
            String explanation = matcher.group(2).trim();
            if (!explanation.isEmpty()) {
                points.add(term + ": " + explanation);
            } else {
                points.add(term);
            }
        }
        return points;
    }

    /**
     * Extracts the first 1–2 natural sentences from a block of text,
     * respecting Portuguese sentence boundaries.
     * <p>
     * A sentence boundary is defined as {@code .}, {@code !}, or {@code ?}
     * followed by whitespace and a Unicode uppercase letter, or end of string.
     */
    private String extractFirstSentence(String text) {
        // Try one sentence first
        Matcher oneSentence = Pattern.compile(
                "^.*?[.!?](?=\\s+\\p{Lu}|\\s*$)"
        ).matcher(text);
        if (oneSentence.find()) {
            String sentence = oneSentence.group().trim();
            // If it is already a meaningful length, use it
            if (sentence.length() >= 30) {
                return sentence;
            }
            // Otherwise try to grab two sentences
            Matcher twoSentences = Pattern.compile(
                    "^.*?[.!?]\\s+.*?[.!?](?=\\s+\\p{Lu}|\\s*$)"
            ).matcher(text);
            if (twoSentences.find()) {
                sentence = twoSentences.group().trim();
                if (sentence.length() >= 30) {
                    return sentence;
                }
            }
            return sentence;
        }

        // Fallback: return first ~200 chars at a word boundary
        if (text.length() > 200) {
            int breakAt = text.lastIndexOf(' ', 200);
            if (breakAt > 100) {
                return text.substring(0, breakAt).trim() + ".";
            }
            return text.substring(0, 200).trim() + ".";
        }
        return text.trim();
    }

    /**
     * Strips markdown formatting from text so bullet points are clean and readable.
     * Preserves markdown links ({@code [text](url)}) so they remain clickable
     * in the frontend rendering.
     * <ul>
     *   <li>{@code **bold**} → bold</li>
     *   <li>{@code *italic*} → italic</li>
     *   <li>{@code [text](url)} → [text](url) (preserved)</li>
     *   <li>Multiple whitespace collapsed to single space</li>
     * </ul>
     */
    private String cleanMarkdown(String text) {
        if (text == null) return "";
        // Bold **text**
        text = text.replaceAll("\\*\\*(.*?)\\*\\*", "$1");
        // Italic *text* (not bold which was already removed)
        text = text.replaceAll("(?<!\\*)\\*(?!\\*)(.{1,200}?)(?<!\\*)\\*(?!\\*)", "$1");
        // Any remaining image references
        text = text.replaceAll("!\\[[^\\]]*\\]\\([^)]*\\)", "");
        // Collapse whitespace
        text = text.replaceAll("\\s+", " ").trim();
        // Strip leading/trailing punctuation (except letters and numbers)
        text = text.replaceAll("^[\\s,;:]+", "").replaceAll("[\\s,;:]+$", "");
        return text;
    }

    /**
     * Checks whether a candidate point is too similar to an already-extracted
     * point by comparing the first 40 characters (case-insensitive).
     */
    private boolean isRedundant(String newPoint, List<String> existing) {
        if (existing.isEmpty()) return false;
        String norm = newPoint.length() > 40
                ? newPoint.substring(0, 40).toLowerCase()
                : newPoint.toLowerCase();
        for (String ep : existing) {
            String eNorm = ep.length() > 40
                    ? ep.substring(0, 40).toLowerCase()
                    : ep.toLowerCase();
            if (norm.equals(eNorm)) return true;
            if (norm.contains(eNorm) || eNorm.contains(norm)) return true;
        }
        return false;
    }
}
