import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Stage, Cam, Layer} from '../lib/Stage';
import {Background} from '../components/Background';
import {NuLogo} from '../components/NuLogo';
import {Word} from '../components/Word';
import {kf, E, breathe, quadExit} from '../lib/anim';

// CENA 5 — ABRANGÊNCIA / ECOSSISTEMA · local 0–86
// Dolly lateral X -260 -> +220
export const Scene5: React.FC = () => {
  const f = useCurrentFrame();

  const cam: Cam = {
    x: kf(f, [[0, -260], [46, 40, E.inOutSine], [86, 220, E.inOutSine]]),
    y: 0,
    z: kf(f, [[0, 520], [46, 500, E.inOutSine], [86, 480, E.inOutSine]]),
    rotX: 0,
    rotY: kf(f, [[0, 10], [46, 0, E.inOutSine], [86, -8, E.inOutSine]]),
    rotZ: 0,
    fov: kf(f, [[0, 50], [46, 49, E.inOutSine], [86, 48, E.inOutSine]]),
  };

  const ex = quadExit(f, 80, 86, 'up', 460, 1.06, 16);

  // 4 cards com z-position e posição distintas
  const cards = [
    {label: 'Conta', z: -120, cx: -340, cy: -260, w: 300, h: 200, hero: false},
    {label: 'Cartão', z: 40, cx: 320, cy: -240, w: 300, h: 200, hero: false},
    {label: 'Ultravioleta', z: 90, cx: -300, cy: 230, w: 320, h: 210, hero: true},
    {label: 'Nu Empresas', z: -60, cx: 330, cy: 250, w: 300, h: 200, hero: false},
  ];

  return (
    <AbsoluteFill>
      <Background
        gradient="linear-gradient(200deg, #1A0533 0%, #0E0118 100%)"
        glowOpacity={0.18}
      />
      <Stage cam={cam}>
        {cards.map((c, i) => {
          const delay = i * 6;
          const cIn = kf(f, [[delay, 0], [delay + 22, 1, E.outQuint]]);
          const cy0 = kf(f, [[delay, 60], [delay + 22, 0, E.outQuint]]);
          const cScale = kf(f, [[delay, 0.9], [delay + 22, 1.0, E.outQuint]]);
          const float = breathe(f, 84, -6, 6);
          const heroBreath = c.hero ? breathe(f, 68, 1.0, 1.02) : 1;
          return (
            <Layer
              key={i}
              z={c.z}
              x={c.cx + ex.tx}
              y={c.cy + cy0 + float + ex.ty}
              scale={cIn * cScale * heroBreath * ex.scale}
              blur={ex.blur}
              opacity={cIn * ex.opacity}
            >
              <div
                style={{
                  width: c.w,
                  height: c.h,
                  borderRadius: 24,
                  border: '1px solid rgba(168,79,232,0.4)',
                  background: c.hero
                    ? 'linear-gradient(135deg, #9D4EDD, #5A189A)'
                    : 'rgba(45,10,78,0.5)',
                  boxShadow: c.hero
                    ? '0 30px 70px rgba(0,0,0,0.5), 0 0 40px rgba(130,10,209,0.4)'
                    : '0 30px 60px rgba(0,0,0,0.45)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 24,
                  position: 'relative',
                }}
              >
                <div style={{alignSelf: 'flex-start'}}>
                  <NuLogo size={52} color="#FFFFFF" rim="#FFFFFF" glow={0} />
                </div>
                <div
                  style={{
                    color: '#FFFFFF',
                    fontSize: c.hero ? 38 : 32,
                    fontWeight: c.hero ? 800 : 600,
                  }}
                >
                  {c.label}
                </div>
              </div>
            </Layer>
          );
        })}

        {/* Tipografia (z +50) */}
        <Layer z={50} x={ex.tx} y={ex.ty} opacity={ex.opacity} scale={ex.scale}>
          <div style={{display: 'flex', gap: 16, whiteSpace: 'nowrap'}}>
            <Word delay={22} size={58} weight={600}>
              Para
            </Word>
            <Word delay={32} size={58} weight={600}>
              todo
            </Word>
            <Word delay={42} size={58} weight={800} color="#C77DFF" ease={E.outBack} glow="#C77DFF">
              mundo.
            </Word>
          </div>
        </Layer>
      </Stage>
    </AbsoluteFill>
  );
};
