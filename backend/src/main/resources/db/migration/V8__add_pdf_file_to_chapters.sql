-- Add pdf_file column to chapters table for linking PDF presentations
ALTER TABLE chapters ADD COLUMN IF NOT EXISTS pdf_file VARCHAR(255);

-- Link The_Case_for_Biblical_Reliability.pdf to chapter 7
UPDATE chapters
SET pdf_file = 'The_Case_for_Biblical_Reliability.pdf'
WHERE title = 'A Bíblia não deve ser interpretada literalmente'
  AND EXISTS (SELECT 1 FROM readings WHERE readings.id = chapters.reading_id AND readings.title = 'A Fé na era do ceticismo');
