---
name: criar-carrossel
description: >-
  Cria um carrossel de Instagram (9 slides) a partir de um tema curto ou de um
  conteúdo próprio colado (texto, ideia, briefing, transcrição, notícia avulsa,
  rascunho). Use quando a pessoa pedir "/carrossel ...", "faz um carrossel
  sobre...", "quero falar sobre...", "transforma isso em carrossel" ou colar um
  texto pra virar carrossel — qualquer pedido pontual de carrossel fora da
  rotina automática de News Feed. Faz o trabalho pesado: pesquisa, enquadra,
  escreve a headline, monta a arquitetura narrativa, define direção visual e
  prepara o render (geração de imagem em 3:4 + upscale Magnific via MCP de
  imagem) ou entrega copy + plano visual quando não há ambiente configurado.
---

# Criar carrossel (tema ou conteúdo próprio)

Este modo existe pra quando a pessoa **não quer esperar o feed de notícias**.
Ela manda uma entrada simples — um tema, um texto colado, uma ideia — e o
sistema faz todo o trabalho de pesquisar, enquadrar, organizar e transformar a
ideia numa peça pronta.

> **Regra de ouro:** entrada simples **não** é briefing fraco. Entrada simples
> é o sinal de que o agente precisa fazer o trabalho pesado. Nunca exija que a
> pessoa saiba estruturar o carrossel.

---

## Quando ativar

Ative quando o pedido:

- trouxer um **tema simples** ("carrossel sobre bicicletas elétricas em SP");
- colar um **conteúdo próprio** (texto, briefing, transcrição, post longo, rascunho);
- pedir carrossel **sem mencionar** News Feed, R1, R2 ou notícia específica;
- usar gatilhos como "quero falar sobre", "faz um carrossel sobre", "transforma isso em carrossel";
- pedir uma **peça pontual** fora da rotina diária.

Se o pedido for **troca de notícia, re-render, slide específico ou rotina
automática**, isto **não** é o modo certo — siga o fluxo da Routine Local
(`--re-render`, `--news=N`, `--only-slide=N`).

---

## Regra principal

Com uma frase curta, o agente deve, **nesta ordem**:

1. entender o assunto;
2. pesquisar contexto atual;
3. separar dado de opinião;
4. encontrar a tensão humana ou cultural;
5. escolher o melhor ângulo;
6. criar a headline forte;
7. montar a arquitetura narrativa de 9 slides;
8. sugerir o visual por slide;
9. renderizar ou preparar pra render.

**Pergunte só se faltar algo que bloqueia a execução** (ex.: marca/projeto ativo
ou público obrigatório). **Não** pergunte "qual ângulo você quer?" — descubra.

---

## Pipeline interno (não aparece pro usuário)

| Papel | Função neste modo |
|---|---|
| **Scout** | Pesquisa tema, tendências, dados recentes, exemplos e contraexemplos. |
| **Creative Director** | Escolhe a tensão, a big idea e o enquadramento editorial. |
| **Scriptwriter** | Escreve headline, slides e legenda. |
| **Art Director** | Define direção visual, metáfora e imagem por slide. |
| **Producer** | Organiza o que precisa ser renderizado e salva o estado local. |
| **Social Manager** | Fecha caption, CTA, formato e status pra publicação. |

O usuário vê uma entrega simples. A complexidade fica nos bastidores.

---

## Fluxo A — tema curto

Exemplo: `/carrossel quero um carrossel sobre bicicletas elétricas em São Paulo`

1. **Clarifique silenciosamente o escopo provável.**
   Tema, recorte local, e possíveis tensões (custo, segurança, trânsito,
   legislação, entregadores, ciclovias, roubo, sustentabilidade…).

2. **Pesquise antes de escrever** (use `web_search` + `web_fetch`).
   - Fontes recentes e confiáveis; dados locais quando houver.
   - Sinais de comportamento real: reclamações, debates, tendências, dúvidas.
   - Sem dado recente suficiente → declare na lógica interna e use ângulo mais
     conceitual.

3. **Escolha um ângulo vencedor** — mais específico que o tema.
   - Ruim: *"Bicicletas elétricas estão crescendo em São Paulo."*
   - Melhor: *"A bicicleta elétrica virou uma resposta prática pra uma cidade
     que ficou cara, travada e impaciente."*

4. **Monte a estrutura de 9 slides** (ver abaixo).

5. **Gere a legenda** — contextualiza, não repete os slides.

6. **Crie a direção visual** — cada slide com função visual; nada de imagem
   genérica.

7. **Render:** se houver ambiente configurado, siga pro motor visual do projeto.
   Senão, entregue copy + plano visual e oriente o setup.

---

## Fluxo B — conteúdo colado

Quando a pessoa colar um texto, **não resuma mecanicamente**. Primeiro encontre:

- tese central;
- tensão mais interessante;
- partes repetidas;
- pontos que viram slide;
- dados que precisam ser verificados;
- frases fortes que podem virar headline;
- lacunas que precisam de pesquisa complementar.

Depois transforme em: headline → arquitetura de 9 slides → legenda → direção
visual → checklist de render.

---

## Arquitetura de 9 slides

- **Slide 1:** headline com tensão.
- **Slides 2-3:** problema ou mudança cultural.
- **Slides 4-6:** explicação, evidência, mecanismo.
- **Slides 7-8:** consequência prática ou novo comportamento.
- **Slide 9:** assinatura de marca — logo/nome em destaque + CTA curto.

---

## Saída mínima (sem render)

Quando ainda **não** existe setup de marca/Notion/Drive/Magnific, entregue
exatamente neste formato — e **não bloqueie** a criação por falta de automação:

```text
Headline:

Slides:
1. ...
2. ...
...
9. ...

Legenda:

Direção visual:
- Slide 1:
- Slide 2:
...

Checklist para render:
- formato 3:4 via MCP de imagem (images_generate aspectRatio "3:4"),
  seguido de upscale Magnific (images_upscale 2x/4x);
- mantendo o PNG da geração sem normalizar/cortar manualmente;
- 9 slides;
- paleta;
- tipografia;
- imagens/metáforas por slide;
- capa como referência mestre + refs visuais em todos os slides internos;
- sem número de slide visível;
- CTA final.
```

---

## Render (quando há ambiente configurado) — MCP de imagem + Magnific

O render usa o **MCP de imagem**: `images_generate` para gerar e `images_upscale`
(Magnific) para dar upscale/enhance. Nada de Higgsfield CLI.

1. **Capa primeiro (referência mestre).**
   `images_generate` com `aspectRatio: "3:4"`, `prompt` = brief visual da capa.
   Modelo: deixe `mode: "auto"` ou escolha um slug de `images_models_list`
   (cheque os recomendados). A capa define paleta, tipografia, mood e composição
   do carrossel inteiro.

2. **Guarde o identifier da capa.**
   Anote o `creation identifier` retornado **antes** de disparar os slides 2-9.
   É ele que garante coerência — não confie em estado solto entre etapas.

3. **Slides internos 2-9 com a capa como referência.**
   Para cada slide, `images_generate` com `aspectRatio: "3:4"` e
   `references: [{ type: "style", identifier: <id-da-capa> }]` (e refs visuais da
   marca via `library_*` quando existirem). Use a capa/refs **só pra estilo** —
   conteúdo diferente por slide. **Nunca** copie o layout da capa nem renderize
   número/contador de página.

4. **Upscale com Magnific.**
   `images_upscale` em cada slide aprovado (`scale: "2x"` ou `"4x"`),
   usando o `creationIdentifier` da geração. Para pixels exatos use
   `images_resize`; para ajuste de proporção, `images_crop` — mas **não**
   normalize/corte manualmente sem necessidade.

5. **Logo (composição local).**
   Compositada via Pillow sobre área reservada (capa pequena, slide 9 grande,
   slides do meio sem logo) — **não** desenhada pela IA.

6. **Preview.**
   Em cliente com UI, chame `creations_show` com todos os identifiers pra
   exibir os slides inline; nunca pare só nos links.

---

## Critérios de qualidade

Um carrossel por input próprio só está bom se:

- não parece resumo escolar;
- tem ângulo específico;
- tem tensão ou descoberta;
- cada slide avança a ideia;
- a headline promete algo que os slides entregam;
- a legenda complementa (não repete);
- o visual ajuda a entender, não só decora;
- o CTA fecha com ação clara e o slide 9 preserva a marca como protagonista;
- qualquer dado factual importante foi verificado.

---

## Notas de ambiente (herdadas do sistema)

- **Pesquisa:** use sempre `web_search` + `web_fetch` nativos. Em sandbox Remote,
  HTTP direto (curl/requests/APIs externas) retorna 403 — não tente.
- **Imagens reais:** download/extração de imagem de notícia funciona **Local**
  (rede aberta), não no Remote. Se não houver foto real aproveitável, gere a
  imagem a partir de uma **dica visual** rica.
- **Integração com a Routine Local:** quando a R2 estiver configurada, ela
  aceita uma primeira mensagem em linguagem natural (ex.: `quero um carrossel
  sobre X`, `transforma este texto em carrossel: [...]`, `--tema="..."`).
  Nesse caso, cria uma pauta manual do dia e pula a dependência do News Feed;
  o resto do pipeline (pesquisa → headline → arquitetura → visual → render →
  Drive → Notion) continua igual.
