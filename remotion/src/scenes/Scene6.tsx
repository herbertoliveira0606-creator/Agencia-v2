import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Stage, Cam, Layer} from '../lib/Stage';
import {Background, Particles} from '../components/Background';
import {NuLogo} from '../components/NuLogo';
import {Word} from '../components/Word';
import {kf, E, breathe} from '../lib/anim';

// CENA 6 — CTA · LOGO + "ABRA SUA CONTA" · local 0–96
// Recuo mínimo Z 380->440 com breathing (fade-to-logo no fim)
export const Scene6: React.FC = () => {
  const f = useCurrentFrame();

  const cam: Cam = {
    x: 0,
    y: 0,
    z: kf(f, [[0, 380], [56, 430, E.outSine], [96, 440, E.inOutSine]]),
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    fov: kf(f, [[0, 44], [56, 45, E.outSine], [96, 45, E.inOutSine]]),
  };

  const nuIn = kf(f, [[0, 0.85], [26, 1.0, E.outQuint]]);
  const nuOp = kf(f, [[0, 0], [26, 1, E.outQuint]]);
  const bScale = breathe(f, 80, 1.0, 1.015);

  // encerramento: textos saem leve, logo permanece (fade-to-logo local 86–96)
  const txtOut = kf(f, [[86, 1], [96, 0, E.inOutSine]]);
  const txtY = kf(f, [[86, 0], [96, -20, E.inOutSine]]);

  return (
    <AbsoluteFill>
      <Background glow="#A84FE8" glowOpacity={0.24} />
      <Particles count={36} speed={5} />
      <Stage cam={cam}>
        {/* Monograma nu central */}
        <Layer z={0} x={0} y={-60} scale={nuIn * bScale} opacity={nuOp}>
          <NuLogo size={360} glow={60} rim="#C77DFF" />
        </Layer>

        {/* CTA palavra-por-palavra */}
        <Layer z={20} x={0} y={150 + txtY} opacity={txtOut}>
          <div style={{display: 'flex', gap: 18, whiteSpace: 'nowrap'}}>
            <Word delay={26} size={70} weight={800}>
              Abra
            </Word>
            <Word delay={36} size={70} weight={800}>
              sua
            </Word>
            <Word delay={46} size={70} weight={800} color="#C77DFF" ease={E.outBack} glow="#C77DFF">
              conta.
            </Word>
          </div>
        </Layer>
        <Layer z={20} x={0} y={250 + txtY} opacity={txtOut}>
          <Word delay={64} size={38} weight={500} color="#E0CCF5" ease={E.outSine}>
            nubank.com.br
          </Word>
        </Layer>
      </Stage>
    </AbsoluteFill>
  );
};
