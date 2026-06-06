import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Stage, Cam, Layer} from '../lib/Stage';
import {Background} from '../components/Background';
import {NuLogo} from '../components/NuLogo';
import {Word} from '../components/Word';
import {kf, E, breathe, quadExit} from '../lib/anim';

// CENA 3 — ULTRAVIOLETA · CARD METÁLICO HERÓI · local 0–136
// Orbit parcial Y -32->+8 + push-in Z 560->330
export const Scene3: React.FC = () => {
  const f = useCurrentFrame();

  const cam: Cam = {
    x: kf(f, [[0, 420], [56, 120, E.inOutCubic], [106, -40, E.inOutCubic], [136, 0, E.outQuint]]),
    y: kf(f, [[0, 30], [56, 10, E.inOutCubic], [106, 0, E.inOutCubic], [136, 0, E.outQuint]]),
    z: kf(f, [[0, 560], [56, 440, E.inOutCubic], [106, 360, E.inOutCubic], [136, 330, E.outQuint]]),
    rotX: kf(f, [[0, -6], [56, -2, E.inOutCubic], [106, 1, E.inOutCubic], [136, 0, E.outQuint]]),
    rotY: kf(f, [[0, -32], [56, -10, E.inOutCubic], [106, 8, E.inOutCubic], [136, 2, E.outQuint]]),
    rotZ: 0,
    fov: kf(f, [[0, 46], [56, 43, E.inOutCubic], [106, 41, E.inOutCubic], [136, 40, E.outQuint]]),
  };

  // entrada do card: x +700->0, opacity 0->1
  const cardX = kf(f, [[0, 700], [26, 0, E.outQuint]]);
  const cardIn = kf(f, [[0, 0], [26, 1, E.outQuint]]);
  // card alinha rotação à câmera (revelando faces durante o orbit)
  const cardSpin = -cam.rotY;
  // varredura especular x -320 -> +320 (local 36–96)
  const sweep = kf(f, [[36, -320], [96, 320, E.inOutSine]]);

  const bRotZ = breathe(f, 80, -0.8, 0.8);
  const bFloat = breathe(f, 96, -8, 8);
  const ex = quadExit(f, 126, 136, 'right', 560, 0.94, 18);

  return (
    <AbsoluteFill>
      <Background
        gradient="radial-gradient(circle at 50% 45%, #2D0A4E 0%, #0E0118 68%)"
        glow="#A84FE8"
        glowOpacity={0.2}
      />
      <Stage cam={cam}>
        {/* Card Ultravioleta (z +20) */}
        <Layer
          z={20}
          x={cardX + ex.tx}
          y={bFloat + ex.ty}
          spin={cardSpin + bRotZ}
          scale={cardIn * ex.scale}
          blur={ex.blur}
          opacity={cardIn * ex.opacity}
        >
          <div
            style={{
              width: 620,
              height: 392,
              borderRadius: 28,
              position: 'relative',
              overflow: 'hidden',
              background:
                'linear-gradient(135deg, #9D4EDD 0%, #6A1FB0 50%, #5A189A 100%)',
              border: '1px solid rgba(199,125,255,0.6)',
              boxShadow:
                '0 50px 120px rgba(0,0,0,0.6), 0 0 50px rgba(130,10,209,0.35)',
            }}
          >
            {/* textura metal escovado */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0) 2px, rgba(0,0,0,0.05) 4px)',
              }}
            />
            {/* highlight especular que varre */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: sweep,
                width: 120,
                height: '100%',
                background:
                  'linear-gradient(105deg, transparent, rgba(255,255,255,0.55), transparent)',
                filter: 'blur(6px)',
              }}
            />
            {/* chip */}
            <div
              style={{
                position: 'absolute',
                top: 150,
                left: 56,
                width: 84,
                height: 62,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #D9C089, #A8895A)',
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.4)',
              }}
            />
            {/* numeração em relevo */}
            <div
              style={{
                position: 'absolute',
                bottom: 96,
                left: 56,
                fontSize: 28,
                letterSpacing: 6,
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 600,
                textShadow: '0 1px 0 rgba(0,0,0,0.3)',
              }}
            >
              5412 •••• •••• 2026
            </div>
            {/* logo nu branco no canto */}
            <div style={{position: 'absolute', bottom: 28, right: 36}}>
              <NuLogo size={96} color="#FFFFFF" rim="#FFFFFF" glow={0} />
            </div>
          </div>
        </Layer>

        {/* Tipografia (z +40) */}
        <Layer z={40} x={ex.tx} y={250 + ex.ty} opacity={ex.opacity} scale={ex.scale} blur={ex.blur}>
          <Word delay={96} size={82} weight={800} glow="#A84FE8">
            Ultravioleta
          </Word>
        </Layer>
        <Layer z={40} x={ex.tx} y={360 + ex.ty} opacity={ex.opacity} scale={ex.scale} blur={ex.blur}>
          <div style={{display: 'flex', gap: 16, whiteSpace: 'nowrap'}}>
            <Word delay={112} size={52} weight={500} color="#E0CCF5" ease={E.outSine}>
              é
            </Word>
            <Word delay={120} size={52} weight={500} color="#E0CCF5" ease={E.outSine}>
              outro
            </Word>
            <Word delay={128} size={52} weight={800} color="#C77DFF" ease={E.outBack} glow="#C77DFF">
              nível.
            </Word>
          </div>
        </Layer>
      </Stage>
    </AbsoluteFill>
  );
};
