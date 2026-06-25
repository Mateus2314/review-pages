-- Embed images into chapter 3 content of "A Fé na era do ceticismo"
-- Images are served from /images/ path on the backend

UPDATE chapters SET content = REPLACE(
    REPLACE(
        REPLACE(
            REPLACE(
                REPLACE(
                    REPLACE(
                        REPLACE(
                            REPLACE(
                                content,
                                E'## 1. Quem foi o Jesus histórico?\n\nA primeira grande questão que Keller aborda',
                                E'## 1. Quem foi o Jesus histórico?\n\nA primeira grande questão que Keller aborda\n\n![JESUS HISTÓRICO](/images/historical-jesus.jpeg)\n\n'
                            ),
                            E'Sua trajetória — do ateísmo militante à fé devota — é um testemunho poderoso de como o estudo honesto das evidências históricas pode levar à convicção.',
                            E'Sua trajetória — do ateísmo militante à fé devota — é um testemunho poderoso de como o estudo honesto das evidências históricas pode levar à convicção.\n\n![ANNE RICE](/images/anne-rice.jpeg)\n\n'
                        ),
                        E'Mas não me venha com essa conversa mole de ele ter sido um grande mestre de moral, pois ele não nos deu essa alternativa e nem tinha essa pretensão."',
                        E'Mas não me venha com essa conversa mole de ele ter sido um grande mestre de moral, pois ele não nos deu essa alternativa e nem tinha essa pretensão."\n\n![C.S. LEWIS](/images/cs-lewis.jpg)\n\n'
                    ),
                    E'## 3. Datas de composição dos Evangelhos\n\nA primeira linha de evidência é cronológica.',
                    E'## 3. Datas de composição dos Evangelhos\n\nA primeira linha de evidência é cronológica.\n\n![TESTEMUNHAS OCULARES](/images/eyewitness-papyrus.jpg)\n\n'
                ),
                E'Os evangelhos gnósticos (como o de Tomé) são muito posteriores.',
                E'Os evangelhos gnósticos (como o de Tomé) são muito posteriores.\n\n![EVANGELHOS GNÓSTICOS](/images/gnostic-gospels.jpeg)\n\n'
            ),
            E'## 4. O conteúdo é tão contraproducente que os Evangelhos não poderiam ser lendas\n\nA segunda linha de evidência examina o conteúdo dos Evangelhos.',
            E'## 4. O conteúdo é tão contraproducente que os Evangelhos não poderiam ser lendas\n\nA segunda linha de evidência examina o conteúdo dos Evangelhos.\n\n![CONTRAPRODUCENTE](/images/counterproductive.jpeg)\n\n'
        ),
        E'ou se trata de uma reportagem, ou algum escritor [antigo] desconhecido [...] sem antecessores nem sucessores conhecidos, de repente antecipou toda a técnica da moderna narrativa novelesca, realista."',
        E'ou se trata de uma reportagem, ou algum escritor [antigo] desconhecido [...] sem antecessores nem sucessores conhecidos, de repente antecipou toda a técnica da moderna narrativa novelesca, realista."\n\n![DETALHES REAIS](/images/real-details.jpg)\n\n'
    ),
    E'## 7. Uma Bíblia confiável ou um Deus de Stepford?\n\nKeller encerra o capítulo com um argumento poderoso.',
    E'## 7. Uma Bíblia confiável ou um Deus de Stepford?\n\nKeller encerra o capítulo com um argumento poderoso.\n\n![DEUS DE STEPFORD](/images/god-of-stepford.jpg)\n\n'
)
WHERE title = 'A Bíblia não deve ser interpretada literalmente'
  AND EXISTS (SELECT 1 FROM readings WHERE title = 'A Fé na era do ceticismo');
