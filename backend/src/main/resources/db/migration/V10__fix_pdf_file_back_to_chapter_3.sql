-- Move pdf_file back to chapter 3 ("A Bíblia não deve ser interpretada literalmente"),
-- which is the 7th chapter in order (the user's "capítulo 7").
-- Remove from chapter 7 ("Não são todas as religiões iguais?") which was incorrectly set by V9.

UPDATE chapters SET pdf_file = NULL WHERE id = 7 AND pdf_file = 'The_Case_for_Biblical_Reliability.pdf';
UPDATE chapters SET pdf_file = 'The_Case_for_Biblical_Reliability.pdf' WHERE id = 3 AND pdf_file IS NULL;
