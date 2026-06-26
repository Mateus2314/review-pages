-- V12: Fix page_count for "O Custo do Discipulado" (actual: 104 pages)
UPDATE readings SET page_count = 104
WHERE title = 'O Custo do Discipulado' AND author = 'Jonas Madureira';
