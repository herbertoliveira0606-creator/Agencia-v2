# Nubank / Ultravioleta — Motion Design (Remotion)

Implementação em Remotion (React) da decupagem `decupagens/nubank-ultravioleta-decupagem.md`.

- **Formato:** 1080 × 1920 (9:16) · 30 fps · 600 frames (20 s)
- **6 cenas** com câmera virtual 3D (push-in, dolly, orbit), parallax por z-depth (`1 + z/1000`), tipografia palavra-por-palavra e Quadruple Exit em direções alternadas.

## Rodar

```bash
npm install
npm run studio    # editor interativo
npm run render    # gera out/nubank-ultravioleta.mp4
npm run still -- --frame=270   # um frame
```

## Estrutura

- `src/lib/Stage.tsx` — câmera virtual + Layer com parallax/escala por FOV
- `src/lib/anim.ts` — easings, keyframes, breathing, Quadruple Exit
- `src/components/` — Background (4 camadas), Noise, NuLogo (SVG draw-in), Word
- `src/scenes/Scene1..6.tsx` — uma cena por arquivo, timings locais
- `src/NubankAd.tsx` — costura as cenas em Sequences com overlap

## Áudio

O vídeo é renderizado **sem áudio**. A direção sonora (trilha + SFX, sem voz)
está especificada na decupagem e deve ser produzida/mixada à parte e anexada
via `staticFile` + `<Audio>` quando os assets existirem.
