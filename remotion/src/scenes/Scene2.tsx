import React from 'react';
import {AbsoluteFill, useCurrentFrame, staticFile} from 'remotion';
import {Stage, Cam, Layer} from '../lib/Stage';
import {Background, Particles} from '../components/Background';
import {Word} from '../components/Word';
import {kf, E, breathe, quadExit} from '../lib/anim';

// CENA 2 — PROMESSA + LIFESTYLE PARALLAX · local 0–106
// Dolly-out Z 360->600
export const Scene2: React.FC = () => {
  const f = useCurrentFrame();

  const cam: Cam = {
    x: kf(f, [[0, 0], [56, 0, E.outCubic], [106, 20, E.inOutSine]]),
    y: kf(f, [[0, 0], [56, -10, E.outCubic], [106, -10, E.inOutSine]]),
    z: kf(f, [[0, 360], [56, 520, E.outCubic], [106, 600, E.inOutSine]]),
    rotX: kf(f, [[0, 0], [56, 1, E.outCubic], [106, 1, E.inOutSine]]),
    rotY: kf(f, [[0, 0], [56, 0, E.outCubic], [106, -3, E.inOutSine]]),
    rotZ: 0,
    fov: kf(f, [[0, 44], [56, 47, E.outCubic], [106, 48, E.inOutSine]]),
  };

  const cardIn = kf(f, [[0, 0], [20, 1, E.outQuint]]);
  const cardY = kf(f, [[0, 40], [20, 0, E.outQuint]]);
  const cardScaleIn = kf(f, [[0, 1.08], [20, 1.0, E.outQuint]]);

  const bRotY = breathe(f, 72, -1, 1);
  const bScale = breathe(f, 88, 1.0, 1.008);
  const ex = quadExit(f, 96, 106, 'down', 480, 0.9, 16);

  return (
    <AbsoluteFill>
      <Background
        gradient="linear-gradient(160deg, #1A0533 0%, #0E0118 100%)"
        glowOpacity={0.18}
      />
      <Particles count={40} />
      <Stage cam={cam}>
        {/* Card lifestyle (z -60) */}
        <Layer
          z={-60}
          x={ex.tx}
          y={ex.ty + cardY}
          spin={bRotY}
          scale={bScale * cardScaleIn * ex.scale}
          blur={ex.blur}
          opacity={cardIn * ex.opacity}
        >
          <div
            style={{
              width: 760,
              height: 1040,
              borderRadius: 48,
              overflow: 'hidden',
              border: '1.5px solid rgba(168,79,232,0.5)',
              boxShadow:
                '0 40px 90px rgba(0,0,0,0.55), 0 0 60px rgba(130,10,209,0.25)',
              position: 'relative',
            }}
          >
            <img
              src={staticFile('couch.png')}
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
            {/* overlay para legibilidade */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(14,1,24,0) 35%, rgba(14,1,24,0.78) 100%)',
              }}
            />
            {/* tint roxo Nubank */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(130,10,209,0.12)',
                mixBlendMode: 'screen',
              }}
            />
          </div>
        </Layer>

        {/* Tipografia palavra-por-palavra (z +30) */}
        <Layer z={30} x={ex.tx} y={140 + ex.ty} opacity={ex.opacity}>
          <div style={{display: 'flex', gap: 18, whiteSpace: 'nowrap'}}>
            <Word delay={14} size={76} weight={800}>
              Dinheiro
            </Word>
            <Word delay={26} size={76} weight={800} color="#E0CCF5">
              que
            </Word>
            <Word delay={36} size={76} weight={800} color="#C77DFF" ease={E.outBack} glow="#C77DFF">
              rende
            </Word>
          </div>
        </Layer>
        <Layer z={30} x={ex.tx} y={240 + ex.ty} opacity={ex.opacity}>
          <div style={{display: 'flex', gap: 16, whiteSpace: 'nowrap'}}>
            <Word delay={64} size={60} weight={500}>
              todo
            </Word>
            <Word delay={74} size={60} weight={500}>
              dia.
            </Word>
          </div>
        </Layer>
      </Stage>
    </AbsoluteFill>
  );
};
