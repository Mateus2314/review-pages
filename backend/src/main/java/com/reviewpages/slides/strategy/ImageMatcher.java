package com.reviewpages.slides.strategy;

import org.springframework.stereotype.Component;

/**
 * Utility that maps keywords in text to relevant slide images.
 * Merges keyword logic from ContentSlideStrategy and KeyPointsSlideStrategy.
 * Most specific keywords first to avoid false matches.
 */
@Component
public class ImageMatcher {

    /**
     * Scans the given text for known keywords and returns a matching
     * image resource path, or {@code null} if no match is found.
     *
     * @param text the text to scan (e.g. title + content combined)
     * @return image path (e.g. /images/god-of-stepford.jpg) or null
     */
    public static String findImage(String text) {
        if (text == null) return null;
        String lower = text.toLowerCase();

        // 1
        if (lower.contains("stepford") || lower.contains("deus que sempre concorda")) {
            return "/images/god-of-stepford.jpg";
        }
        // 2
        if (lower.contains("bauckham")) {
            return "/images/eyewitness-papyrus.jpg";
        }
        // 3
        if (lower.contains("contraproducente") || lower.contains("crucificação")) {
            return "/images/counterproductive.jpeg";
        }
        // 4
        if (lower.contains("anne rice")) {
            return "/images/anne-rice.jpeg";
        }
        // 5
        if (lower.contains("c.s. lewis") || lower.contains("cs lewis") || lower.contains("trilema")) {
            return "/images/cs-lewis.jpg";
        }
        // 6
        if (lower.contains("testemunha ocular") || lower.contains("primeiras testemunhas")) {
            return "/images/eyewitness-papyrus.jpg";
        }
        // 7
        if (lower.contains("gnóstico") || lower.contains("evangelhos gnósticos") || lower.contains("gnostic")) {
            return "/images/gnostic-gospels.jpeg";
        }
        // 8
        if (lower.contains("gênero literário") || lower.contains("genero literario")) {
            return "/images/lewis-literary.jpg";
        }
        // 9 — content-specific: concrete physical details
        if (lower.contains("almofada") || lower.contains("côvado") || lower.contains("covado") || lower.contains("escrevia no chão")) {
            return "/images/real-details.jpg";
        }
        // 10 — specific historical-Jesus phrases
        if (lower.contains("jesus histórico") || lower.contains("jesus hist") || lower.contains("jesus real")) {
            return "/images/historical-jesus.jpeg";
        }
        // 11 — key-points-specific: realistic / detail
        if (lower.contains("realista") || lower.contains("detalhe")) {
            return "/images/real-details.jpg";
        }
        // 12 — broader historical-Jesus / Jesus mentions
        if (lower.contains("jesus") || lower.contains("histórico") || lower.contains("historico")) {
            return "/images/historical-jesus.jpeg";
        }

        return null;
    }
}
