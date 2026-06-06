# DECUPAGEM VISUAL EXECUTÁVEL — NUBANK / ULTRAVIOLETA

> Blueprint técnico de motion design com câmera ativa 3D. Pronto para Remotion (React) / Three.js.
> **Formato:** 1080 × 1920 (9:16 vertical) · **FPS:** 30 · **Duração:** 600 frames (20.0 s)
> **Convenção 3D:** câmera em +Z olhando para −Z. Origem no centro do frame (0,0,0). Z+ = mais perto da câmera = mais parallax. Parallax factor = `1 + (zDepth / 1000)`.

---

## 1. FILOSOFIA VISUAL

Fintech premium brasileira. Roxo soberano sobre vazio profundo. O vídeo abre com a marca se construindo no espaço — não um logo parado, mas o monograma **nu** nascendo de duas curvas que se cruzam em 3D. Estética: *minimalismo rico* — pouca informação por frame, mas cada elemento com material, glow e profundidade reais. Ritmo respirado (movimentos de câmera ≥ 40 frames), nunca nervoso. A câmera é um diretor de fotografia: revela o produto orbitando, recua para mostrar escala, mergulha para intimar. Lifestyle entra como textura quente (peles, beige, luz natural) contrastando o roxo elétrico digital.

- **Estética:** glassmorphism + materiais metálicos roxos + tipografia geométrica pesada.
- **Tom:** confiante, humano, premium sem ser frio.
- **Ritmo:** arco de tensão — abertura magnética → respiro lifestyle → clímax produto → call serena.
- **Linguagem de câmera:** orbit revela, push-in intima, dolly-out impõe escala, parallax constante carrega profundidade.

---

## 2. PALETA TÉCNICA

| Função | HEX | Uso |
|---|---|---|
| Background Base | `#0E0118` | Vazio profundo, fundo de todas as cenas |
| Background Deep | `#1A0533` | Gradiente radial interno |
| Surface / Glass | `#2D0A4E` @ 40% | Cards, painéis translúcidos |
| Primary (Nu Purple) | `#820AD1` | Marca, monograma, preenchimentos-chave |
| Accent Bright | `#A84FE8` | Highlights, bordas vivas |
| Accent Magenta Glow | `#C77DFF` | Glow, partículas, rim light |
| Ultravioleta Metal Hi | `#9D4EDD` | Topo do gradiente do card metálico |
| Ultravioleta Metal Lo | `#5A189A` | Base do gradiente do card metálico |
| Text Primary | `#FFFFFF` | Tipografia principal |
| Text Secondary | `#E0CCF5` @ 80% | Subtítulos, legendas |
| Lifestyle Warm | `#E8C9A0` | Tom de pele/luz nas fotos lifestyle |
| Noise/Grain | `#FFFFFF` @ 3% | Camada de ruído sobre tudo |

---

## 3. DIREÇÃO SONORA

**Trilha base.** Electronic/cinematic híbrido. Instrumentação: sub-bass pulsante (sine), pluck sintético arpejado (saw filtrado), pad atmosférico evolutivo, kick suave 4/4 entrando no respiro lifestyle, percussão de foley digital (clicks, snaps). **BPM 90**, com dobra de feel para 120 na cena clímax. Mood: aspiracional, futurista, caloroso. Dinâmica em arco: começa minimal (só sub + pad), constrói até clímax do card (full mix), retrai para o CTA (pad + um pluck solo).

**Abordagem de SFX.** Design sonoro sincronizado em frame com cada evento visual — whooshes nos movimentos de câmera, *impacts* nos snaps de elementos, shimmer metálico no card, risers nas transições. Foley digital nos textos (typewriter sutil por palavra). **Sem nenhuma voz humana em nenhuma camada.**

**Mixagem prevista.** Sub-bass −6 dB, kick −8 dB, pads −12 dB, plucks −10 dB, SFX entre −14 e −9 dB nos picos. Sidechain leve do pad contra o kick. Master limiter a −1 dBTP. Estéreo amplo nos pads, mono no sub.

---

## 4. MAPA DE CENAS

| # | Frames | Duração | Tipo Visual | Câmera | Transição IN → OUT |
|---|---|---|---|---|---|
| 1 | 0–110 | 3.67 s | Logo reveal 3D (monograma nu nascendo) | Orbit horizontal + push-in | Cold open → exit ↑ (cima) |
| 2 | 104–210 | 3.53 s | Promessa + lifestyle parallax | Dolly-out lento | Overlap 7f → exit ↓ (baixo) |
| 3 | 204–340 | 4.53 s | Ultravioleta — card metálico herói | Orbit 360° parcial + push-in | Overlap 7f → exit → (direita) |
| 4 | 334–430 | 3.20 s | Benefício / cashback (números) | Push-in suave | Overlap 7f → exit ← (esquerda) |
| 5 | 424–510 | 2.87 s | Abrangência (Nu Empresas / ecossistema) | Dolly lateral | Overlap 7f → exit ↑ (cima) |
| 6 | 504–600 | 3.20 s | CTA — logo + "Abra sua conta" | Recuo final estático respirando | Overlap 7f → fade-to-logo |

Overlap padrão **7 frames** entre cenas consecutivas. Zero frames vazios. Direções de saída alternadas: ↑ ↓ → ← ↑ (nunca duas iguais seguidas).

---

## 5. DETALHAMENTO POR CENA

### CENA 1 — LOGO REVEAL 3D · frames 0–110

**Narrativa.** A marca se constrói. Duas curvas roxas entram do escuro em lados opostos, cruzam-se e formam o monograma **nu**. A câmera orbita levemente enquanto mergulha, dando volume tridimensional ao símbolo. Abertura magnética: a promessa do vídeo é "isto é Nubank".

**Movimento de Câmera — Setup Inicial**

| Param | Valor |
|---|---|
| Position | X: −180, Y: 40, Z: 620 |
| Rotation | X: −4°, Y: 14°, Z: 0° |
| FOV | 52° |
| Target | (0, 0, 0) |

**Movimento de Câmera — Animação**

| Frame | Position (X,Y,Z) | Rotation (X,Y,Z) | FOV | Easing |
|---|---|---|---|---|
| 0 | (−180, 40, 620) | (−4, 14, 0) | 52° | — |
| 55 | (−60, 20, 480) | (−2, 6, 0) | 48° | easeInOutCubic |
| 110 | (0, 0, 400) | (0, 0, 0) | 45° | easeOutQuint |

> Orbit horizontal Y 14°→0° combinado a push-in Z 620→400. Propósito emocional: revelar e centrar a marca, do enigma à afirmação.

**Design — Background (4 camadas)**

| Z | Camada | Spec |
|---|---|---|
| −900 | Base | Sólido `#0E0118`, fullscreen |
| −700 | Gradiente | Radial centro→borda `#1A0533`→`#0E0118`, raio 1400px, opacity 100% |
| −500 | Glow vivo | Elipse 900×900, `#820AD1` @ 22%, blur 180px, pulsa scale 1.0↔1.08 em 80f (loop) |
| +50 | Noise | Grain `#FFFFFF` @ 3%, blend overlay, animado 8fps |

**Elemento Principal — Monograma `nu` (anatomia Z-depth)**

| Prop | Valor |
|---|---|
| Construção | 2 paths SVG (curva esquerda "n" + curva direita "u"), stroke→fill |
| Dimensão | 520 × 300 px no plano Z=0 |
| Cor | Fill `#820AD1`, rim light `#C77DFF` @ 60% na borda direita |
| z-position | 0 (referência de parallax) |
| Sombra | Drop 0/30/60, `#000000` @ 50% |
| Glow | Outer 40px `#A84FE8` @ 35% |
| Bevel | Falso 3D: clone do path deslocado Z −12, `#5A189A`, simulando espessura |

**Tipografia — palavra-por-palavra** (entra após o monograma assentar)

| Palavra | Frame | Pos (X,Y,Z) | Tamanho | Cor | Easing |
|---|---|---|---|---|---|
| "Nubank" | 78 | (0, 210, +30) | 88px Bold | `#FFFFFF` | easeOutBack |

**Animações — Entrada**

| Elemento | Frame | Propriedade | De → Para | Easing |
|---|---|---|---|---|
| Curva "n" | 0→34 | x + draw | −500→−10 px, stroke 0%→100% | easeOutQuint |
| Curva "u" | 6→40 | x + draw | +500→+10 px, stroke 0%→100% | easeOutQuint |
| nu fill | 40→52 | fill opacity | 0%→100% | easeInOutSine |
| Glow outer | 44→60 | opacity | 0%→35% | easeOutSine |
| "Nubank" | 78→96 | y + scale + opacity | 240→210, 0.8→1.0, 0→1 | easeOutBack |

**Micro-animação / Breathing 3D** (loop frames 52–104)

| Elemento | Propriedade | Range | Período |
|---|---|---|---|
| nu | rotationY | −1.5° ↔ +1.5° | 64f |
| nu | scale | 1.0 ↔ 1.012 | 80f |
| Glow | opacity | 30% ↔ 38% | 56f |

**Saída — Quadruple Exit** (direção ↑ cima) · frames 96–110

| Elemento | Position | Blur | Opacity | Scale | Easing |
|---|---|---|---|---|---|
| nu + "Nubank" | Y 0→−420 | 0→14px | 100→0% | 1.0→1.12 | easeInQuart |

**Áudio.** Trilha: sub-bass entra f0 fade-in; pad atmosférico cresce f30. SFX: `whoosh_in` f0 e f6 (curvas), `impact_soft` f40 (fill cruza), `shimmer` f44 (glow), `type_tick` f78 ("Nubank"), `riser_short` f96→110 (saída).

**Conexão → Cena 2.** Overlap 104–110 (7f). `cameraBlend`: lerp da câmera C1(0,0,400) → C2 setup, fator `t = (f−104)/6`, `pos = lerp(C1,C2,easeInOutCubic(t))`. Saída ↑ da C1 cruza com entrada ↓ da C2.

---

### CENA 2 — PROMESSA + LIFESTYLE PARALLAX · frames 104–210

**Narrativa.** Respiro humano. Foto lifestyle (pessoas reais, luz quente) entra ao fundo em card flutuante; o copy da promessa aparece palavra a palavra sobre ela. Câmera recua (dolly-out) revelando que o card vive num espaço 3D com profundidade.

**Movimento de Câmera — Setup Inicial**

| Param | Valor |
|---|---|
| Position | X: 0, Y: 0, Z: 360 |
| Rotation | X: 0°, Y: 0°, Z: 0° |
| FOV | 44° |
| Target | (0, 20, 0) |

**Movimento de Câmera — Animação**

| Frame | Position (X,Y,Z) | Rotation | FOV | Easing |
|---|---|---|---|---|
| 104 | (0, 0, 360) | (0,0,0) | 44° | — |
| 160 | (0, −10, 520) | (1,0,0) | 47° | easeOutCubic |
| 210 | (20, −10, 600) | (1,−3,0) | 48° | easeInOutSine |

> Dolly-out Z 360→600. Propósito: abrir o mundo, dar ar à promessa, fazer o espectador respirar.

**Design — Background (4 camadas)**

| Z | Camada | Spec |
|---|---|---|
| −900 | Base | `#0E0118` |
| −650 | Gradiente | Linear 160° `#1A0533`→`#0E0118`, opacity 100% |
| −400 | Elemento vivo | Partículas roxas (40un) `#C77DFF` @ 30%, 2–5px, drift Y +6px/s, parallax z −400 |
| +40 | Noise | Grain 3% overlay |

**Elemento Principal — Card Lifestyle (anatomia Z-depth)**

| Prop | Valor |
|---|---|
| Dimensão | 760 × 1040 px, raio 48px |
| Conteúdo | Foto lifestyle (pessoas, luz quente `#E8C9A0`), object-fit cover |
| z-position | −60 |
| Borda | 1.5px `#A84FE8` @ 50% |
| Sombra | 0/40/90 `#000000` @ 55% |
| Overlay | Gradiente bottom `#0E0118` @ 0→70% (legibilidade do texto) |
| Glow | Rim `#820AD1` @ 25%, blur 60px |

**Tipografia — palavra-por-palavra** (Z +30, parallax à frente do card)

| Palavra | Frame | Pos (X,Y) | Tamanho | Cor | Easing |
|---|---|---|---|---|---|
| "Dinheiro" | 118 | (0, 360) | 76px Bold | `#FFFFFF` | easeOutExpo |
| "que" | 130 | (0, 360) | 76px Bold | `#E0CCF5` | easeOutExpo |
| "rende" | 140 | (0, 360) | 76px Bold | `#C77DFF` | easeOutBack |
| "todo" | 168 | (0, 460) | 60px Med | `#FFFFFF` | easeOutExpo |
| "dia." | 178 | (0, 460) | 60px Med | `#FFFFFF` | easeOutExpo |

**Animações — Entrada**

| Elemento | Frame | Propriedade | De → Para | Easing |
|---|---|---|---|---|
| Card | 104→124 | scale + opacity + y | 1.08→1.0, 0→1, +40→0 | easeOutQuint |
| Partículas | 104→140 | opacity | 0→30% | linear |
| Cada palavra | ver tabela | y(+24→0) + blur(8→0) + opacity(0→1) | — | conforme acima |

**Micro-animação / Breathing 3D** (loop)

| Elemento | Propriedade | Range | Período |
|---|---|---|---|
| Card | rotationY | −1° ↔ +1° | 72f |
| Card | scale | 1.0 ↔ 1.008 | 88f |
| Palavra "rende" | glow opacity | 20% ↔ 45% | 48f |

**Saída — Quadruple Exit** (direção ↓ baixo) · frames 200–210

| Elemento | Position | Blur | Opacity | Scale | Easing |
|---|---|---|---|---|---|
| Card + textos | Y 0→+480 | 0→16px | 100→0% | 1.0→0.9 | easeInQuart |

**Áudio.** Trilha: kick 4/4 entra f104; pluck arpejado f118. SFX: `whoosh_soft` f104 (card), `type_tick` ×5 nos frames das palavras (118/130/140/168/178), `sparkle` f140 ("rende"), `whoosh_down` f200→210 (saída).

**Conexão → Cena 3.** Overlap 204–210 (7f). `cameraBlend`: lerp C2(20,−10,600) → C3 setup com `easeInOutCubic`. Saída ↓ da C2 cruza entrada → da C3 (card Ultravioleta deslizando).

---

### CENA 3 — ULTRAVIOLETA · CARD METÁLICO HERÓI · frames 204–340

**Narrativa.** Clímax. O cartão **Nubank Ultravioleta** entra no espaço como objeto físico premium: metal roxo escovado, refletindo luz. A câmera executa um orbit parcial de 360° revelando suas faces enquanto faz push-in. É o herói do filme.

**Movimento de Câmera — Setup Inicial**

| Param | Valor |
|---|---|
| Position | X: 420, Y: 30, Z: 560 |
| Rotation | X: −6°, Y: −32°, Z: 0° |
| FOV | 46° |
| Target | (0, 0, 0) |

**Movimento de Câmera — Animação**

| Frame | Position (X,Y,Z) | Rotation (X,Y,Z) | FOV | Easing |
|---|---|---|---|---|
| 204 | (420, 30, 560) | (−6, −32, 0) | 46° | — |
| 260 | (120, 10, 440) | (−2, −10, 0) | 43° | easeInOutCubic |
| 310 | (−40, 0, 360) | (1, 8, 0) | 41° | easeInOutCubic |
| 340 | (0, 0, 330) | (0, 2, 0) | 40° | easeOutQuint |

> Orbit parcial Y −32°→+8° (≈40° de arco) + push-in Z 560→330. Propósito: apresentação reverente do produto, mostrar materialidade e desejo.

**Design — Background (4 camadas)**

| Z | Camada | Spec |
|---|---|---|
| −900 | Base | `#0E0118` |
| −650 | Gradiente | Radial atrás do card `#2D0A4E`→`#0E0118`, raio 1100px, pulsa com a trilha |
| −450 | Elemento vivo | Raios de luz volumétricos (god rays) `#A84FE8` @ 18%, rotação lenta +2°/s |
| +60 | Noise | Grain 3% |

**Elemento Principal — Card Ultravioleta (anatomia Z-depth)**

| Prop | Valor |
|---|---|
| Dimensão | 620 × 392 px (proporção cartão), raio 28px |
| z-position | +20 |
| Material | Gradiente linear 135° `#9D4EDD`→`#5A189A`, textura metal escovado (anisotropic highlight) |
| Highlight especular | Faixa branca `#FFFFFF` @ 70%, 60px, varre a face conforme rotationY da câmera (varredura f240–300) |
| Borda | 1px `#C77DFF` @ 60% |
| Sombra | 0/50/120 `#000000` @ 60% + contact shadow no "chão" virtual Y+200 |
| Elementos do card | Logo nu (canto inf-dir, `#FFFFFF`), chip dourado-fosco `#C9A86A`, numeração em relevo sutil |
| Espessura 3D | Lateral extrudada 8px, `#3C0A6B` |
| Glow | Outer 50px `#820AD1` @ 30% |

**Tipografia — palavra-por-palavra** (entra no fim do orbit, Z +40)

| Palavra | Frame | Pos (X,Y) | Tamanho | Cor | Easing |
|---|---|---|---|---|---|
| "Ultravioleta" | 300 | (0, 540) | 82px Bold | `#FFFFFF` | easeOutExpo |
| "é" | 316 | (−170, 650) | 52px Med | `#E0CCF5` | easeOutSine |
| "outro" | 324 | (−40, 650) | 52px Med | `#E0CCF5` | easeOutSine |
| "nível." | 332 | (140, 650) | 52px Bold | `#C77DFF` | easeOutBack |

**Animações — Entrada**

| Elemento | Frame | Propriedade | De → Para | Easing |
|---|---|---|---|---|
| Card | 204→230 | x + rotationY + opacity | +700→0, −40°→aligns câmera, 0→1 | easeOutQuint |
| God rays | 210→250 | opacity | 0→18% | easeOutSine |
| Especular sweep | 240→300 | x da faixa | −320→+320 px | easeInOutSine |
| Palavras | ver tabela | y(+30→0)+blur(10→0)+opacity | — | conforme |

**Micro-animação / Breathing 3D** (loop, contínuo ao orbit)

| Elemento | Propriedade | Range | Período |
|---|---|---|---|
| Card | rotationZ | −0.8° ↔ +0.8° | 80f |
| Card | float Y | −8 ↔ +8 px | 96f |
| Glow outer | opacity | 26% ↔ 36% | 52f |
| God rays | rotação | contínua +2°/s | — |

**Saída — Quadruple Exit** (direção → direita) · frames 330–340

| Elemento | Position | Blur | Opacity | Scale | Easing |
|---|---|---|---|---|---|
| Card + textos | X 0→+560 | 0→18px | 100→0% | 1.0→0.94 | easeInQuart |

**Áudio.** Trilha: full mix, feel dobra p/ 120; sub + kick + pluck + pad. SFX: `whoosh_metal` f204 (card entra), `shimmer_metal` f240→300 (especular), `impact_deep` f230 (card assenta), `type_tick` ×4 (300/316/324/332), `sparkle_hi` f332 ("nível."), `whoosh_right` f330→340 (saída).

**Conexão → Cena 4.** Overlap 334–340 (7f). `cameraBlend`: lerp C3(0,0,330) → C4 setup, `easeInOutCubic`. Saída → da C3 cruza entrada ← da C4 (números deslizando da esquerda).

---

### CENA 4 — BENEFÍCIO / CASHBACK · frames 334–430

**Narrativa.** Prova de valor. Um número grande (cashback) materializa-se com contador animado, cercado de ícones de benefício orbitando. Câmera faz push-in suave focando o número como argumento central.

**Movimento de Câmera — Setup Inicial**

| Param | Valor |
|---|---|
| Position | X: −60, Y: 0, Z: 480 |
| Rotation | X: 0°, Y: 4°, Z: 0° |
| FOV | 45° |
| Target | (0, 0, 0) |

**Movimento de Câmera — Animação**

| Frame | Position (X,Y,Z) | Rotation | FOV | Easing |
|---|---|---|---|---|
| 334 | (−60, 0, 480) | (0, 4, 0) | 45° | — |
| 390 | (−10, 0, 410) | (0, 1, 0) | 43° | easeOutCubic |
| 430 | (0, 0, 380) | (0, 0, 0) | 42° | easeInOutSine |

> Push-in Z 480→380. Propósito: focar, concentrar a atenção no benefício numérico.

**Design — Background (4 camadas)**

| Z | Camada | Spec |
|---|---|---|
| −900 | Base | `#0E0118` |
| −650 | Gradiente | Radial `#1A0533`→`#0E0118` |
| −420 | Elemento vivo | Grade isométrica de pontos `#A84FE8` @ 14%, parallax z −420, drift suave |
| +50 | Noise | Grain 3% |

**Elemento Principal — Bloco numérico (anatomia Z-depth)**

| Prop | Valor |
|---|---|
| Número | "+5%" (contador 0→5 animado), 220px Black, `#FFFFFF`, z +30 |
| Label | "de cashback" 44px Med, `#E0CCF5`, z +20 |
| Ícones orbitando | 3 chips glass (`#2D0A4E` @ 40%, raio 20px, borda `#A84FE8`), z entre −80 e +60, orbitam o número |
| Glow do número | 60px `#C77DFF` @ 40% |
| Sombra | 0/30/70 `#000000` @ 50% |

**Tipografia — palavra-por-palavra**

| Palavra | Frame | Pos (X,Y) | Tamanho | Cor | Easing |
|---|---|---|---|---|---|
| "+5%" (contador) | 344 | (0, 0) | 220px Black | `#FFFFFF` | easeOutExpo + count |
| "de" | 392 | (−90, 200) | 44px Med | `#E0CCF5` | easeOutSine |
| "cashback" | 400 | (40, 200) | 44px Bold | `#C77DFF` | easeOutBack |

**Animações — Entrada**

| Elemento | Frame | Propriedade | De → Para | Easing |
|---|---|---|---|---|
| Número | 344→372 | scale + opacity + count | 1.3→1.0, 0→1, valor 0→5 | easeOutExpo |
| Chips | 350→380 | scale + opacity + orbit | 0→1, raio 0→260px | easeOutBack |
| Label | ver tabela | y(+20→0)+opacity | — | conforme |

**Micro-animação / Breathing 3D** (loop)

| Elemento | Propriedade | Range | Período |
|---|---|---|---|
| Número | scale | 1.0 ↔ 1.015 | 72f |
| Chips | orbit | rotação contínua +14°/s | — |
| Glow | opacity | 34% ↔ 46% | 44f |

**Saída — Quadruple Exit** (direção ← esquerda) · frames 424–430

| Elemento | Position | Blur | Opacity | Scale | Easing |
|---|---|---|---|---|---|
| Bloco completo | X 0→−560 | 0→16px | 100→0% | 1.0→0.92 | easeInQuart |

**Áudio.** Trilha: pluck arpejado em destaque, pad sustentado. SFX: `counter_ticks` f344→372 (clicks acompanhando contador), `pop` ×3 nos chips (350/360/370), `type_tick` ×2 (392/400), `whoosh_left` f424→430 (saída).

**Conexão → Cena 5.** Overlap 424–430 (7f). `cameraBlend`: lerp C4(0,0,380) → C5 setup, `easeInOutCubic`. Saída ← cruza entrada → (dolly lateral da C5).

---

### CENA 5 — ABRANGÊNCIA / ECOSSISTEMA · frames 424–510

**Narrativa.** Escala. Vários cards de produto (conta, cartão, Ultravioleta, Nu Empresas) compõem um mosaico em profundidade; a câmera faz dolly lateral mostrando que o ecossistema é amplo. "Para todo mundo. Para todo negócio."

**Movimento de Câmera — Setup Inicial**

| Param | Valor |
|---|---|
| Position | X: −260, Y: 0, Z: 520 |
| Rotation | X: 0°, Y: 10°, Z: 0° |
| FOV | 50° |
| Target | (60, 0, −100) |

**Movimento de Câmera — Animação**

| Frame | Position (X,Y,Z) | Rotation | FOV | Easing |
|---|---|---|---|---|
| 424 | (−260, 0, 520) | (0, 10, 0) | 50° | — |
| 470 | (40, 0, 500) | (0, 0, 0) | 49° | easeInOutSine |
| 510 | (220, 0, 480) | (0, −8, 0) | 48° | easeInOutSine |

> Dolly lateral X −260→+220. Propósito: revelar amplitude, sensação de "tem para tudo".

**Design — Background (4 camadas)**

| Z | Camada | Spec |
|---|---|---|
| −900 | Base | `#0E0118` |
| −650 | Gradiente | Linear 200° `#1A0533`→`#0E0118` |
| −500 | Elemento vivo | Linhas de conexão (rede) `#820AD1` @ 20% ligando cards, pulsam |
| +60 | Noise | Grain 3% |

**Elemento Principal — Mosaico de cards (anatomia Z-depth)**

| Card | Dimensão | z-position | Conteúdo | Cor surface |
|---|---|---|---|---|
| Conta | 300×200, r24 | −120 | ícone + "Conta" | `#2D0A4E` @ 45% |
| Cartão | 300×200, r24 | +40 | mini-cartão roxo | `#3C0A6B` @ 50% |
| Ultravioleta | 320×210, r24 | +90 | card metálico (destaque) | gradiente metal |
| Nu Empresas | 300×200, r24 | −60 | ícone PJ + "Empresas" | `#2D0A4E` @ 45% |

Todos: borda 1px `#A84FE8` @ 40%, sombra 0/30/60 `#000` @ 45%, glow `#820AD1` @ 18%. Parallax por z aplicado ao dolly.

**Tipografia — palavra-por-palavra** (Z +50)

| Palavra | Frame | Pos (X,Y) | Tamanho | Cor | Easing |
|---|---|---|---|---|---|
| "Para" | 446 | (0, 700) | 58px Med | `#FFFFFF` | easeOutExpo |
| "todo" | 456 | (0, 700) | 58px Med | `#FFFFFF` | easeOutExpo |
| "mundo." | 466 | (0, 700) | 58px Bold | `#C77DFF` | easeOutBack |

**Animações — Entrada**

| Elemento | Frame | Propriedade | De → Para | Easing |
|---|---|---|---|---|
| Cards (stagger 6f) | 424→470 | y + opacity + scale | +60→0, 0→1, 0.9→1.0 | easeOutQuint |
| Linhas rede | 440→480 | draw + opacity | 0→100%, 0→20% | easeOutSine |
| Palavras | ver tabela | y(+22→0)+opacity | — | conforme |

**Micro-animação / Breathing 3D** (loop)

| Elemento | Propriedade | Range | Período |
|---|---|---|---|
| Cards | float Y (defasado por z) | −6 ↔ +6 px | 84f |
| Card Ultravioleta | scale | 1.0 ↔ 1.02 | 68f |
| Linhas rede | opacity | 14% ↔ 26% | 50f |

**Saída — Quadruple Exit** (direção ↑ cima) · frames 504–510

| Elemento | Position | Blur | Opacity | Scale | Easing |
|---|---|---|---|---|---|
| Mosaico + texto | Y 0→−460 | 0→16px | 100→0% | 1.0→1.06 | easeInQuart |

**Áudio.** Trilha: build, percussão digital adiciona camadas. SFX: `card_snap` ×4 stagger (424/436/448/460), `network_hum` f440→480 (linhas), `type_tick` ×3 (446/456/466), `riser` f504→510 (saída, prepara CTA).

**Conexão → Cena 6.** Overlap 504–510 (7f). `cameraBlend`: lerp C5(220,0,480) → C6 setup, `easeInOutCubic`. Saída ↑ cruza entrada do CTA (monograma reaparece centralizando).

---

### CENA 6 — CTA · LOGO + "ABRA SUA CONTA" · frames 504–600

**Narrativa.** Fechamento sereno. O monograma **nu** volta ao centro, agora estável e iluminado; o CTA aparece palavra a palavra. A câmera recua minimamente e respira, deixando a marca como última imagem. Resolução calma após o clímax.

**Movimento de Câmera — Setup Inicial**

| Param | Valor |
|---|---|
| Position | X: 0, Y: 0, Z: 380 |
| Rotation | X: 0°, Y: 0°, Z: 0° |
| FOV | 44° |
| Target | (0, 0, 0) |

**Movimento de Câmera — Animação**

| Frame | Position (X,Y,Z) | Rotation | FOV | Easing |
|---|---|---|---|---|
| 504 | (0, 0, 380) | (0,0,0) | 44° | — |
| 560 | (0, 0, 430) | (0,0,0) | 45° | easeOutSine |
| 600 | (0, 0, 440) | (0,0,0) | 45° | easeInOutSine |

> Recuo mínimo Z 380→440 com breathing. Propósito: assentar, encerrar com a marca soberana e respirando.

**Design — Background (4 camadas)**

| Z | Camada | Spec |
|---|---|---|
| −900 | Base | `#0E0118` |
| −700 | Gradiente | Radial `#1A0533`→`#0E0118`, glow central crescendo |
| −500 | Elemento vivo | Partículas ascendentes `#C77DFF` @ 25%, drift Y −5px/s |
| +50 | Noise | Grain 3% |

**Elemento Principal — Monograma nu final (anatomia Z-depth)**

| Prop | Valor |
|---|---|
| Dimensão | 360 × 208 px, z 0 |
| Cor | Fill `#820AD1`, rim `#C77DFF` @ 70% |
| Glow | Outer 60px `#A84FE8` @ 45%, pulsa |
| Sombra | 0/30/70 `#000` @ 50% |

**Tipografia — palavra-por-palavra**

| Palavra | Frame | Pos (X,Y) | Tamanho | Cor | Easing |
|---|---|---|---|---|---|
| "Abra" | 530 | (0, 320) | 70px Bold | `#FFFFFF` | easeOutExpo |
| "sua" | 540 | (0, 320) | 70px Bold | `#FFFFFF` | easeOutExpo |
| "conta." | 550 | (0, 320) | 70px Bold | `#C77DFF` | easeOutBack |
| "nubank.com.br" | 568 | (0, 430) | 38px Med | `#E0CCF5` | easeOutSine |

**Animações — Entrada**

| Elemento | Frame | Propriedade | De → Para | Easing |
|---|---|---|---|---|
| nu | 504→530 | scale + opacity + glow | 0.85→1.0, 0→1, 0→45% | easeOutQuint |
| Palavras | ver tabela | y(+22→0)+blur(8→0)+opacity | — | conforme |
| URL | 568→584 | opacity + y | 0→1, +14→0 | easeOutSine |

**Micro-animação / Breathing 3D** (loop até o fim)

| Elemento | Propriedade | Range | Período |
|---|---|---|---|
| nu | scale | 1.0 ↔ 1.015 | 80f |
| Glow | opacity | 38% ↔ 50% | 56f |
| Partículas | drift | contínuo Y −5px/s | — |

**Saída — Fade-to-logo** (encerramento) · frames 590–600

| Elemento | Position | Blur | Opacity | Scale | Easing |
|---|---|---|---|---|---|
| Textos CTA | Y 0→−20 | 0→6px | 100→0% | 1.0→0.98 | easeInOutSine |
| nu (permanece) | hold | 0 | 100% | breathing | — |

> Exceção autorizada: encerramento institucional segura o logo no frame final (não é saída de cena intermediária — é o card de marca). Última imagem = nu + glow respirando sobre `#0E0118`.

**Áudio.** Trilha: retração para pad + 1 pluck solo; sub-bass resolve em nota longa, reverb cauda até f600. SFX: `shimmer_soft` f504 (nu reaparece), `type_tick` ×3 (530/540/550), `chime_resolve` f550 ("conta."), `tail_reverb` f580→600. Silêncio relativo no último beat — a marca respira.

---

## 6. TABELA GERAL DE TRANSIÇÕES

| De → Para | Overlap (frames) | Saída (dir / Quadruple) | Entrada | cameraBlend |
|---|---|---|---|---|
| C1 → C2 | 104–110 | ↑ Y+−420, blur14, op0, sc1.12 | Card ↓ scale1.08→1.0 | lerp easeInOutCubic |
| C2 → C3 | 204–210 | ↓ Y+480, blur16, op0, sc0.9 | Card → X+700→0 | lerp easeInOutCubic |
| C3 → C4 | 334–340 | → X+560, blur18, op0, sc0.94 | Número ← scale1.3→1.0 | lerp easeInOutCubic |
| C4 → C5 | 424–430 | ← X−560, blur16, op0, sc0.92 | Cards → stagger | lerp easeInOutCubic |
| C5 → C6 | 504–510 | ↑ Y−460, blur16, op0, sc1.06 | nu centro scale0.85→1.0 | lerp easeInOutCubic |
| C6 → fim | 590–600 | fade-to-logo (hold marca) | — | — |

Direções de saída: ↑ ↓ → ← ↑ — nenhuma consecutiva repetida. ✔

---

## 7. CHECKLIST DE VALIDAÇÃO

**Mandamentos**
- [x] Abertura rica (logo 3D + câmera viva, não background+texto)
- [x] Toda spec em número, zero prosa vaga
- [x] Câmera carrega narrativa em todas as 6 cenas

**Design**
- [x] Todo elemento com anatomia em camadas (dim, HEX, opacity, sombra, glow, Z)
- [x] Background ≥ 4 camadas em todas as cenas (Base, Gradiente, Vivo, Noise)
- [x] Tipografia palavra-por-palavra (nenhuma "frase" animada em bloco)
- [x] Elemento principal com z-position e parallax declarados

**Câmera & Parallax**
- [x] R1: toda cena com tabela Setup Inicial + Movimento (XYZ + easing)
- [x] R2: z-position em todo elemento com profundidade; fator `1+(z/1000)`
- [x] R3: cameraBlend (lerp) em todos os overlaps
- [x] Nenhum movimento < 30 frames (mín. usado: 40f)

**Timing**
- [x] Overlap 7f entre todas as cenas consecutivas, zero frames vazios
- [x] Saídas em direções alternadas (↑↓→←↑)
- [x] Quadruple Exit (pos+blur+opacity+scale) em todas as saídas intermediárias

**Áudio**
- [x] Trilha especificada (gênero, instrumentação, BPM, mood, dinâmica em arco)
- [x] SFX sincronizados em frame por evento visual
- [x] **Zero voz humana** em qualquer camada ✔

---

*Blueprint pronto para codificação em Remotion (React) / Three.js. Cada frame, camada e trajetória cravados em número.*
