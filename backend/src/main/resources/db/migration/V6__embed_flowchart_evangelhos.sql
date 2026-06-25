-- Embed flowchart image into chapter 3 content "Datas de composição dos Evangelhos"
-- Shows the timeline of when each Gospel author wrote their account
-- Image was created in Pencil and exported to backend static resources

UPDATE chapters SET content = REPLACE(
    content,
    E'Os Evangelhos canônicos foram escritos entre 40 e 60 anos após a morte de Jesus. As cartas de Paulo, escritas entre 15 e 25 anos após a morte de Jesus, já fornecem um esboço de todos os acontecimentos da vida de Cristo — seus milagres, suas afirmações, crucificação e ressurreição.\n\n',
    E'Os Evangelhos canônicos foram escritos entre 40 e 60 anos após a morte de Jesus. As cartas de Paulo, escritas entre 15 e 25 anos após a morte de Jesus, já fornecem um esboço de todos os acontecimentos da vida de Cristo — seus milagres, suas afirmações, crucificação e ressurreição.\n\n![FLUXOGRAMA EVANGELHOS](/images/flowchart-evangelhos.png)\n\n'
)
WHERE title = 'A Bíblia não deve ser interpretada literalmente'
  AND EXISTS (SELECT 1 FROM readings WHERE title = 'A Fé na era do ceticismo')
  AND content NOT LIKE '%flowchart-evangelhos%';
