-- Fix pdf_file assignment: move from chapter 3 (wrong) to chapter 7 (correct)
-- Chapter 7 = "Não são todas as religiões iguais?" (reading "A Fé na era do ceticismo")

-- First, remove pdf_file from chapter 3 if it was incorrectly assigned
UPDATE chapters
SET pdf_file = NULL
WHERE id = 3
  AND pdf_file = 'The_Case_for_Biblical_Reliability.pdf';

-- Then assign pdf_file to chapter 7
UPDATE chapters
SET pdf_file = 'The_Case_for_Biblical_Reliability.pdf'
WHERE id = 7
  AND pdf_file IS NULL;
