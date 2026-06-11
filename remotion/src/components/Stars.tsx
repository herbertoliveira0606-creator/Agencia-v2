import React from 'react';
import { interpolate, random, useCurrentFrame, useVideoConfig } from 'remotion';
import { wiggle } from '../utils';

type StarsProps = {
  left: number;
  top: number;
  width: number;
  height: number;
  count?: number;
};

const STAR_POINTS =
  'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';

// Small twinkling stars scattered around the logo plate. Each one fades
// in/out and gently scales on its own cycle for an organic sparkle.
export const Stars: React.FC<StarsProps> = ({ left, top, width, height, count = 8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ position: 'absolute', left, top, width, height, pointerEvents: 'none' }}>
      {new Array(count).fill(0).map((_, i) => {
        const seed = `star-${i}`;
        const x = random(`${seed}-x`) * width;
        const y = random(`${seed}-y`) * height;
        const size = 6 + random(`${seed}-size`) * 10;
        const period = (1.4 + random(`${seed}-period`) * 1.6) * fps;
        const phase = random(`${seed}-phase`);

        const twinkle = wiggle(frame, period, phase);
        const opacity = interpolate(twinkle, [-1, 1], [0.1, 0.95]);
        const scale = interpolate(twinkle, [-1, 1], [0.6, 1.15]);
        const rotation = interpolate(twinkle, [-1, 1], [-12, 12]);

        return (
          <div
            key={seed}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size,
              opacity,
              transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
              background: 'radial-gradient(circle, #fffceb 0%, #ffd966 60%, transparent 100%)',
              clipPath: STAR_POINTS,
              filter: 'drop-shadow(0 0 4px rgba(255, 240, 180, 0.8))',
            }}
          />
        );
      })}
    </div>
  );
};
