import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Stage, Cam, Layer} from '../lib/Stage';
import {Background} from '../components/Background';
import {Word} from '../components/Word';
import {kf, E, breathe, quadExit} from '../lib/anim';

// CENA 4 — BENEFÍCIO / CASHBACK · local 0–96
// Push-in Z 480->380
export const Scene4: React.FC = () => {
  const f = useCurrentFrame();

  const cam: Cam = {
    x: kf(f, [[0, -60], [56, -10, E.outCubic], [96, 0, E.inOutSine]]),
    y: 0,
    z: kf(f, [[0, 480], [56, 410, E.outCubic], [96, 380, E.inOutSine]]),
    rotX: 0,
    rotY: kf(f, [[0, 4], [56, 1, E.outCubic], [96, 0, E.inOutSine]]),
    rotZ: 0,
    fov: kf(f, [[0, 45], [56, 43, E.outCubic], [96, 42, E.inOutSine]]),
  };

  // contador 0 -> 5 (local 10–38)
  const count = kf(f, [[10, 0], [38, 5, E.outExpo]]);
  const numScale = kf(f, [[10, 1.3], [38, 1.0, E.outExpo]]);
  const numIn = kf(f, [[10, 0], [26, 1, E.outExpo]]);

  // chips orbitando
  const chipR = kf(f, [[16, 0], [46, 260, E.outBack]]);
  const chipIn = kf(f, [[16, 0], [46, 1, E.outBack]]);
  const orbit = (f * 14) / 30; // 14°/s

  const bScale = breathe(f, 72, 1.0, 1.015);
  const ex = quadExit(f, 90, 96, 'left', 560, 0.92, 16);

  const chips = ['Cartão', 'Conta', 'Mercado'];

  return (
    <AbsoluteFill>
      <Background glowOpacity={0.2} />
      <Stage cam={cam}>
        {/* chips orbitando (z entre -80 e +60) */}
        {chips.map((label, i) => {
          const a = ((orbit + i * 120) * Math.PI) / 180;
          const cz = [-80, 60, -20][i];
          return (
            <Layer
              key={i}
              z={cz}
              x={Math.cos(a) * chipR + ex.tx}
              y={Math.sin(a) * chipR * 0.5 + ex.ty}
              opacity={chipIn * ex.opacity}
              scale={chipIn * ex.scale}
            >
              <div
                style={{
                  padding: '14px 26px',
                  borderRadius: 20,
                  background: 'rgba(45,10,78,0.55)',
                  border: '1px solid rgba(168,79,232,0.7)',
                  color: '#E0CCF5',
                  fontSize: 30,
                  fontWeight: 600,
                  backdropFilter: 'blur(8px)',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                }}
              >
                {label}
              </div>
            </Layer>
          );
        })}

        {/* Número central (z +30) */}
        <Layer
          z={30}
          x={ex.tx}
          y={ex.ty}
          scale={numIn * numScale * bScale * ex.scale}
          blur={ex.blur}
          opacity={numIn * ex.opacity}
        >
          <div
            style={{
              fontSize: 220,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.04em',
              textShadow: '0 0 60px rgba(199,125,255,0.5)',
              lineHeight: 1,
            }}
          >
            +{count.toFixed(0)}%
          </div>
        </Layer>

        {/* Label palavra-por-palavra (z +20) */}
        <Layer z={20} x={ex.tx} y={170 + ex.ty} opacity={ex.opacity} scale={ex.scale}>
          <div style={{display: 'flex', gap: 16, whiteSpace: 'nowrap'}}>
            <Word delay={58} size={44} weight={500} color="#E0CCF5" ease={E.outSine}>
              de
            </Word>
            <Word delay={66} size={44} weight={800} color="#C77DFF" ease={E.outBack} glow="#C77DFF">
              cashback
            </Word>
          </div>
        </Layer>
      </Stage>
    </AbsoluteFill>
  );
};
