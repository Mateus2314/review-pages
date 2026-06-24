INSERT INTO users (name, email, password, bio)
VALUES ('Admin', 'admin@reviewpages.com', '$2a$10$dummy_hash_placeholder_for_dev_only', 'Conta administrativa')
ON CONFLICT (email) DO NOTHING;

INSERT INTO readings (title, type, author, rating, review, tags, status, page_count, user_id)
SELECT 'A Fé na era do ceticismo', 'BOOK', 'Timothy Keller', 5,
       'Timothy Keller examina as objeções mais comuns à fé cristã na cultura contemporânea. Com uma abordagem que combina teologia, filosofia e apologética, Keller oferece respostas profundas e acessíveis para questionamentos sobre a Bíblia, Deus e o sentido da vida.',
       'Religião,Filosofia,Apologética,Fé', 'FINISHED', 320, id
FROM users WHERE email = 'admin@reviewpages.com'
ON CONFLICT DO NOTHING;

INSERT INTO chapters (reading_id, title, content, chapter_order)
SELECT r.id, c.title, '', c.chapter_order
FROM readings r
CROSS JOIN (VALUES
    (1, 'A fé não pode ser testada — será?'),
    (2, 'O que a fé tem a ver com a razão?'),
    (3, 'Como pode um Deus bom permitir o sofrimento?'),
    (4, 'A ciência não torna a fé obsoleta?'),
    (5, 'Não são todas as religiões iguais?'),
    (6, 'A Igreja não causou danos demais?'),
    (7, 'A Bíblia não deve ser interpretada literalmente')
) AS c(chapter_order, title)
WHERE r.title = 'A Fé na era do ceticismo'
AND NOT EXISTS (
    SELECT 1 FROM chapters ch WHERE ch.reading_id = r.id AND ch.chapter_order = c.chapter_order
);
