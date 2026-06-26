-- V11: Seed reading + chapter for "O Custo do Discipulado" by Jonas Madureira

INSERT INTO readings (title, type, author, cover_url, rating, review, tags, status, page_count, user_id)
SELECT 'O Custo do Discipulado', 'BOOK', 'Jonas Madureira', NULL, 5,
       'Uma resenha sobre a primeira parte do livro "O Custo do Discipulado" de Jonas Madureira, que explora a doutrina bíblica do custo de seguir Jesus a partir de Lucas 14.25-35. O autor distingue dois sentidos de discipulado — seguir Jesus e ajudar outros a segui-lo — e analisa as três demandas de Jesus: amor, sofrimento e desapego.',
       'Discipulado,Teologia,Imitação de Cristo,Vida Cristã', 'FINISHED', 120, id
FROM users WHERE email = 'admin@reviewpages.com'
ON CONFLICT DO NOTHING;

INSERT INTO chapters (reading_id, title, content, chapter_order, pdf_file)
SELECT r.id, 'Resenha — O Custo do Discipulado', $CONTENT$
Li este livro em 2025, e com certeza foi um dos que mais me fez refletir sobre o que o Senhor quer fazer na vida dos seus filhos nos dias de hoje. Peguei-o para preparar dois estudos para o grupo de conexão no fim do ano passado. Minha esposa o leu em duas horas — uma leitura rápida, mas não rasa em nada que se propõe. Neste texto, comentarei a primeira parte do livro, chamada pelo autor de "O Custo do Discipulado", que também dá nome à obra.

Antes de começar, uma correção importante: o autor, na verdade, centra o estudo no evangelho de **Lucas 14.25-35** . Segue o texto na tradução da NVI:

> **Lucas 14.25-35 (NVI)**
> 
> 25 Uma grande multidão ia com ele; e, voltando-se, disse-lhes: 26 "Se alguém vem a mim e ama o seu pai, sua mãe, sua mulher, seus filhos, seus irmãos e irmãs, e até a sua própria vida mais do que a mim, não pode ser meu discípulo. 27 E aquele que não carrega sua cruz e não me segue não pode ser meu discípulo.
> 
> 28 "Qual de vocês, se quiser construir uma torre, primeiro não se assenta e calcula o preço, para ver se tem dinheiro suficiente para completá-la? 29 Pois, se lançar o alicerce e não for capaz de terminá-la, todos os que a virem rirão dele, 30 dizendo: 'Este homem começou a construir e não foi capaz de terminar'.
> 
> 31 "Ou, qual é o rei que, pretendendo sair à guerra contra outro rei, primeiro não se assenta e pensa se com dez mil homens é capaz de enfrentar aquele que vem contra ele com vinte mil? 32 Se não for capaz, enviará uma delegação, enquanto o outro ainda está longe, e pedirá um acordo de paz.
> 
> 33 "Da mesma forma, qualquer de vocês que não renunciar a tudo o que possui não pode ser meu discípulo.
> 
> 34 "O sal é bom, mas, se ele perder o sabor, como restaurá-lo? 35 Não serve nem para o solo nem para adubo; é jogado fora. Quem tem ouvidos para ouvir, ouça."

## A definição de discipulado segundo Jonas Madureira

Logo no início do livro, Jonas Madureira estabelece uma distinção fundamental: a palavra "discipulado" é um caso de **homonímia** — assim como "manga" pode ser fruta ou parte da camisa, "discipulado" carrega dois significados distintos, porém relacionados. O autor apoia-se em Edward L. Smither, para quem o termo "discípulo" tornou-se, para os primeiros cristãos, **sinônimo de "cristão"**. Ser cristão, portanto, é ser discípulo de Cristo.

Madureira então apresenta os dois sentidos:

1. **Discipulado como o ato de seguir Jesus** (imitar Cristo)
2. **Discipulado como o ato de ajudar alguém a seguir Jesus** (ajudar outros na imitação de Cristo)

Para ilustrar essa distinção, ele cita dois livros homônimos: *Discipulado*, de **Dietrich Bonhoeffer** (sobre seguir Jesus), e *Discipulado*, de **Mark Dever** (sobre ajudar pessoas a seguir Jesus). O autor destaca que um pressupõe o outro: quem não segue Jesus não pode ajudar pessoas a seguirem Jesus.

> "O discipulado começa com a admiração por Cristo e se transforma na imitação diária de Cristo, a ponto de sermos admirados por outras pessoas, não, obviamente, por quem somos, mas por quem imitamos."

O foco que ele traz é que somos chamados para ser **discípulos**. Não é possível ser cristão e não agir como discípulo de Cristo. E uma vida de discipulado traz duas ações: a ação de **Seguir a Cristo** e a ação de **Ajudar outro a seguir a Cristo**.

---

## As três demandas de Jesus em Lucas 14.25-35

Com base na passagem citada acima, Jonas Madureira indica que Jesus nos pede três coisas: **um certo tipo de amor, um certo tipo de sofrimento e um certo tipo de desapego**. Vamos a cada uma delas.

### Os três círculos de seguidores

Antes de mergulhar nas três demandas, o autor faz uma pausa importante para explicar **quem eram os ouvintes de Jesus naquele momento**. Ele recorre ao teólogo católico **John P. Meier** (autor de *Um judeu marginal*), que classificou os seguidores de Jesus em **três círculos concêntricos**:

1. **Círculo externo** — as **multidões**, que seguiam Jesus apenas no sentido físico, por curiosidade ou interesse, mas sem compromisso real. Uma "massa cinzenta", sem rosto, sem nome, isenta de responsabilidades.
2. **Círculo intermediário** — os **discípulos**, chamados por Jesus para segui-lo tanto no sentido físico quanto espiritual.
3. **Círculo interno** — os **Doze**, um grupo especial de 12 homens que não apenas eram discípulos, mas formavam um círculo íntimo em torno de Jesus.

Madureira observa que a exortação de Jesus em Lucas 14.25-35 foi direcionada **não aos Doze, mas à grande multidão**. Isso porque a multidão é o exemplo mais escandaloso de que é possível seguir Jesus **sem compromisso**, sem levar em conta o custo. Jesus não estava interessado em números como um *youtuber* hoje estaria interessado em seguidores — sua busca era por **comprometimento**.

O autor deixa claro que **Jesus não tem interesse em multidões**. Porque se alguém vai a ele e não apresenta o amor, o sofrimento e o desapego, não pode ser discípulo do Senhor. 

---

## 1. O custo do amor

Madureira começa esta seção citando **Agostinho de Hipona** em suas *Confissões* (Livro X):

> "Senhor, minha consciência não duvida, antes tem a certeza de que te amo. Feriste-me o coração com Tua Palavra, desde então te amei. **Mas o que amo quando te amo?** "

A pergunta de Agostinho é crucial porque **podemos amar de maneira equivocada**. O autor usa o exemplo do náufrago que encontra uma bola de vôlei, chama-a de "Wilson" e passa a amá-la como se fosse uma pessoa. Da mesma forma, as pessoas podem amar a Deus como se ele fosse de barro ou de metal, ou como mais uma pessoa importante que disputa espaço na agenda.

O ponto central é que **o discipulado exige que amemos a Jesus como Deus, e não apenas como uma pessoa qualquer**. Jesus, por ser Deus, deve ser amado **acima de qualquer outra coisa**: acima da família, acima do cônjuge, dos filhos, dos irmãos, e até acima da própria vida. Madureira cita **Tomás de Kempis** (*Imitação de Cristo*, II,7):

> "Jesus quer ser amado acima de tudo [...] ele não admite rival."

O autor faz questão de esclarecer que Jesus **não estava exigindo que odiássemos nossas famílias**. Pelo contrário. O problema é quando amamos nossa família **no lugar de Deus** — ela se torna um ídolo que controla nossa vida. Jesus deve ser o centro, e isso terá um custo, principalmente se nossa família, nossos bens ou nós mesmos ocuparmos a centralidade do nosso coração. Madureira ilustra isso com a história real de **Mehdi**, um marroquino que se converteu do Islã e foi banido da família, perdeu o passaporte, amigos, emprego, casa — mas disse: "ganhei muito mais. Ganhei Jesus Cristo como Salvador da minha vida."

---

## 2. O custo do sofrimento

A segunda demanda é o sofrimento que decorre do fato de seguir Jesus. Madureira conecta isso a **Lucas 9.22-25 (NVI)**, onde Jesus fala sobre sua própria rejeição e chama seus seguidores ao mesmo caminho:

> 22 E disse: "É necessário que o Filho do homem sofra muitas coisas e seja rejeitado pelos líderes religiosos, pelos chefes dos sacerdotes e pelos mestres da lei, seja morto e ressuscite no terceiro dia".
> 
> 23 Jesus dizia a todos: "Se alguém quiser acompanhar-me, negue-se a si mesmo, tome diariamente a sua cruz e siga-me.
> 
> 24 Pois quem quiser salvar a sua vida a perderá; mas quem perder a vida por minha causa, este a salvará.
> 
> 25 Pois que adianta ao homem ganhar o mundo inteiro, e perder-se ou destruir a si mesmo?"

O que significava "carregar a cruz" para os primeiros discípulos, que ainda não haviam visto Jesus crucificado? A cruz era **símbolo de rejeição e humilhação**. Quem carregava uma cruz era um banido da sociedade, considerado uma ameaça. Carregar a cruz revela que o discipulado implica **conviver em um mundo hostil ao evangelho**.

Madureira então cita **Martinho Lutero** (*Os sete salmos de penitência*):

> "Eis o caminho da cruz: tu não o podes achar; eu tenho que guiar-te como a um cego. Por isso, nem tu, nem ser humano, nem criatura, mas eu, eu em pessoa, te ensinarei, através do meu Espírito e Palavra, o caminho que deves trilhar. Não a obra que tu escolhes, não o sofrimento que tu imaginas, mas sim o caminho e o sofrimento que te é preparado contra a tua escolha, contra teu pensamento e desejo... A esse segue, a esse te chamo, nele sê discípulo; é tempo oportuno, teu mestre chegou."

A partir dessa citação, o autor faz uma aplicação prática que me marcou profundamente: **temos o hábito de criar custos aceitáveis para nós mesmos**. Forjamos uma cruz do nosso jeito, com medidas que julgamos suportáveis. Medidas que não nos custam nada e, de preferência, não ofendem ninguém. Mas uma cruz assim, que carregamos segundo nossos termos, **não nos humilha o suficiente** para nos salvar do amor-próprio.

Não é Cristo que deve se envolver em nossos projetos pessoais. Nós é que devemos sofrer ao sacrificar nossas agendas em favor da agenda divina. Como diz Tomás de Kempis: **"Anda por onde quiseres: não acharás descanso senão na humilde sujeição e obediência"**.

---

## 3. O custo do desapego

A terceira demanda é o **golpe fatal** em nossa dependência de todas as coisas que criam vínculos de pertencimento ao mundo. Os vínculos com o que possuímos são potencialmente a razão pela qual muitos são incapazes de seguir Jesus. O objetivo do discipulado é nos libertar da crença de que **somos o que possuímos** e de que temos domínio sobre nossa família, nossas coisas e sobre nós mesmos.

Madureira recorre a **Colossenses 1.13-18** para mostrar que fomos "resgatados do domínio das trevas e transportados para o Reino do Filho amado" — e que Jesus tem a supremacia em tudo. Por isso, o discipulado começa com **rendição e submissão**. Os discípulos são como plantas arrancadas de sua cultura egocêntrica e transplantadas para a cultura cristocêntrica do reino de Deus.

O que mais me marcou nessa seção foi justamente o desapego à nossa **própria vontade**, às vontades da nossa carne. É difícil renunciar a algo que acreditamos possuir — mas no final, tudo é dádiva. Nada nos pertence de fato.

### Sinceridade vs. Autenticidade

Na segunda parte do livro (que ele chama de "A doutrina da imitação de Cristo"), Madureira aprofunda a diferença entre dois paradigmas, apoiando-se em **Lionel Trilling** (*Sinceridade e Autenticidade*) e **Charles Taylor** (*A ética da autenticidade*):

- **Paradigma da sinceridade** — fundado na revelação do que realmente somos diante de Deus. Nossa identidade é **modelada por Deus**. É a abordagem **mimética** e **cristocêntrica** do discipulado: ajudar pessoas a se tornarem **como Jesus**.
- **Paradigma da autenticidade** — fundado na busca do "eu verdadeiro" dentro de si mesmo. Acredita que é possível sermos **literalmente autênticos**, sem modelo externo. É a abordagem **humanista** e **egocentrada** do discipulado: ajudar pessoas a se tornarem **o que elas querem ser**.

O autor demonstra que o paradigma da autenticidade é um equívoco, pois **somos seres miméticos por natureza** — sempre imitamos alguém. A questão não é *se* imitamos, mas *quem* imitamos. Citando **C. S. Lewis** (*Cristianismo puro e simples*):

> "O primeiríssimo passo é tentar esquecer-se inteiramente do seu 'eu'. O seu autêntico novo 'eu' (que é de Cristo e também seu, e seu unicamente por ser dele) não aparecerá enquanto você o buscar; surgirá apenas quando você estiver à busca de Cristo."

E conclui com **Tomás de Kempis**: "Procura a Jesus em todas as coisas, e Jesus acharás. Se te buscas a ti mesmo, também te acharás, mas para a tua ruína."

---

## Conclusão: O discipulado como mimese de Cristo

De tudo o que o autor apresenta, fica claro que o discipulado é uma **cadeia de imitações** que, desde o tempo dos apóstolos, tem mantido a igreja viva. Madureira usa a bela imagem da **rosa e sua cor**: assim como não podemos separar a rosa de sua cor, não podemos separar o ato de seguir Jesus do ato de ajudar outros a segui-lo. São "distintos, mas inseparáveis" (*distinctio sed non separatio*), como diria João Calvino sobre as duas naturezas de Cristo.

O autor recorre a **Gregório Magno** (*Regra Pastoral*) para falar sobre o "desaparecimento amoroso" — a ideia de que o discipulado requer a **arte do desaparecimento**, para que Cristo apareça em nosso lugar: **"Convém que ele cresça e que eu diminua"** (Jo 3.30).

A verdadeira mimese que devemos fazer não é imitar líderes ou métodos humanos, mas **imitar a Cristo** — e, ao sermos admirados por outros, que não seja por quem somos, mas por **quem imitamos**. Quando a igreja entende isso, ela deixa de ser uma multidão anônima e se torna uma assembleia de discípulos que seguem Jesus **como Jesus quer ser seguido**, não como cada um acha melhor.

> "Se sua escolha for pelo discipulado, é porque algo mais encantador que o espelho cativou sua alma."

Madureira encerra ecoando Paulo: **"Sede meus imitadores, como também eu sou de Cristo"** (1Co 11.1). Esse é o chamado — custoso, mas glorioso — para todos nós que desejamos não apenas seguir Jesus, mas ajudar outros a também segui-lo.

---

## Referências

### Livro resenhado
- MADUREIRA, Jonas. *O custo do discipulado: a doutrina da imitação de Cristo*. São José dos Campos, SP: Fiel, 2019.

### Bíblia
- *Bíblia Sagrada* — Nova Versão Internacional (NVI). Usada nas citações de: Lucas 14.25-35, Lucas 9.22-25, Colossenses 1.13-18, João 3.30, 1 Coríntios 11.1.

### Obras citadas por Jonas Madureira (conforme notas do livro)

| Autor | Obra |
|-------|------|
| AGOSTINHO DE HIPONA | *Confissões*. São Paulo: Abril Cultural, 1973 [X,6,8]. |
| BONHOEFFER, Dietrich | *Discipulado*. |
| CALVINO, João | *Institutas* / fórmula *distinctio sed non separatio*. |
| DEVER, Mark | *Discipulado*. |
| GREGÓRIO MAGNO | *Regra Pastoral* (séc. VI). |
| KEMPIS, Tomás de | *Imitação de Cristo* (II,7; I,9). |
| LEWIS, C. S. | *Cristianismo puro e simples* / *Mero cristianismo*. São Paulo: ABU / Quadrante. |
| LUTERO, Martinho | "Os sete salmos de penitência". In: *Obras selecionadas*. São Leopoldo, RS: Sinodal, 2003, v. 8, p. 507. |
| MEIER, John P. | *Um judeu marginal: repensando o Jesus histórico*. |
| SMITHER, Edward L. | *Agostinho como mentor: um modelo para preparação de líderes*. São Paulo: Shedd. |
| TAYLOR, Charles | *A ética da autenticidade*. São Paulo: É Realizações, 2011. |
| TRILLING, Lionel | *Sinceridade e autenticidade*. São Paulo: É Realizações, 2014. |

### Demais referências mencionadas
- **Mehdi** (marroquino convertido) — história real citada por Madureira no livro como testemunho do custo do discipulado.
- **Pascal, Blaise** — *Pensamentos* (Aposta de Pascal).
- **Girard, René** — *Mentira romântica e verdade romanesca*. São Paulo: É Realizações, 2009.
$CONTENT$, 1, 'The_Cost_of_Imitation.pdf'
FROM readings r
WHERE r.title = 'O Custo do Discipulado'
  AND NOT EXISTS (
    SELECT 1 FROM chapters ch WHERE ch.reading_id = r.id AND ch.chapter_order = 1
  );
