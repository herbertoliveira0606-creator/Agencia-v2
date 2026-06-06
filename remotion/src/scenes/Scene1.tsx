import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Stage, Cam, Layer} from '../lib/Stage';
import {Background} from '../components/Background';
import {NuLogo} from '../components/NuLogo';
import {Word} from '../components/Word';
import {kf, E, breathe, quadExit} from '../lib/anim';

// CENA 1 — LOGO REVEAL 3D · local 0–110
// Orbit horizontal Y 14->0 + push-in Z 620->400
export const Scene1: React.FC = () => {
  const f = useCurrentFrame();

  const cam: Cam = {
    x: kf(f, [[0, -180], [55, -60, E.inOutCubic], [110, 0, E.outQuint]]),
    y: kf(f, [[0, 40], [55, 20, E.inOutCubic], [110, 0, E.outQuint]]),
    z: kf(f, [[0, 620], [55, 480, E.inOutCubic], [110, 400, E.outQuint]]),
    rotX: kf(f, [[0, -4], [55, -2, E.inOutCubic], [110, 0, E.outQuint]]),
    rotY: kf(f, [[0, 14], [55, 6, E.inOutCubic], [110, 0, E.outQuint]]),
    rotZ: 0,
    fov: kf(f, [[0, 52], [55, 48, E.inOutCubic], [110, 45, E.outQuint]]),
  };

  // draw-in das curvas
  const drawN = kf(f, [[0, 0], [34, 1, E.outQuint]]);
  const drawU = kf(f, [[6, 0], [40, 1, E.outQuint]]);
  const fill = kf(f, [[40, 0], [52, 1, E.inOutSine]]);

  // breathing + saída ↑
  const bRotY = breathe(f, 64, -1.5, 1.5);
  const bScale = breathe(f, 80, 1.0, 1.012);
  const ex = quadExit(f, 96, 110, 'up', 420, 1.12, 14);

  return (
    <AbsoluteFill>
      <Background glowOpacity={0.22} />
      <Stage cam={cam}>
        <Layer
          z={0}
          x={ex.tx}
          y={ex.ty}
          spin={bRotY}
          scale={bScale * ex.scale}
          blur={ex.blur}
          opacity={ex.opacity}
        >
          <NuLogo size={520} drawN={drawN} drawU={drawU} fillOpacity={fill} glow={40} />
        </Layer>
        <Layer
          z={30}
          x={ex.tx}
          y={210 + ex.ty}
          scale={ex.scale}
          blur={ex.blur}
          opacity={ex.opacity}
        >
          <Word delay={78} size={88} weight={800} ease={E.outBack} glow="#A84FE8">
            Nubank
          </Word>
        </Layer>
      </Stage>
    </AbsoluteFill>
  );
};
