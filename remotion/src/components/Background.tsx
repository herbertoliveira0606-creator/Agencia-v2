import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {breathe} from '../lib/anim';
import {Noise} from './Noise';

// Background obrigatório em 4 camadas: Base, Gradiente, Elemento Vivo (glow), Noise
export const Background: React.FC<{
  gradient?: string;
  glow?: string;
  glowOpacity?: number;
}> = ({
  gradient = 'radial-gradient(circle at 50% 45%, #1A0533 0%, #0E0118 70%)',
  glow = '#820AD1',
  glowOpacity = 0.22,
}) => {
  const frame = useCurrentFrame();
  const pulse = breathe(frame, 80, 1.0, 1.08);
  const gop = breathe(frame, 56, glowOpacity, glowOpacity + 0.08);

  return (
    <AbsoluteFill style={{backgroundColor: '#0E0118'}}>
      {/* Camada 2 — Gradiente */}
      <AbsoluteFill style={{background: gradient}} />
      {/* Camada 3 — Elemento vivo (glow pulsante) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '45%',
          width: 1000,
          height: 1000,
          transform: `translate(-50%, -50%) scale(${pulse})`,
          background: `radial-gradient(circle, ${glow} 0%, transparent 62%)`,
          opacity: gop,
          filter: 'blur(50px)',
        }}
      />
      {/* Camada 4 — Noise */}
      <Noise />
    </AbsoluteFill>
  );
};

// Partículas roxas ascendentes (elemento vivo alternativo)
export const Particles: React.FC<{count?: number; color?: string; speed?: number}> = ({
  count = 40,
  color = '#C77DFF',
  speed = 6,
}) => {
  const frame = useCurrentFrame();
  const dots = React.useMemo(
    () =>
      new Array(count).fill(0).map((_, i) => ({
        x: (i * 137.5) % 100,
        y0: (i * 53.7) % 100,
        size: 2 + ((i * 7) % 4),
        phase: (i % 7) * 13,
      })),
    [count]
  );
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {dots.map((d, i) => {
        const y = (((d.y0 - ((frame + d.phase) * speed) / 30) % 100) + 100) % 100;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${d.x}%`,
              top: `${y}%`,
              width: d.size,
              height: d.size,
              borderRadius: '50%',
              background: color,
              opacity: 0.3,
              filter: 'blur(0.5px)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
