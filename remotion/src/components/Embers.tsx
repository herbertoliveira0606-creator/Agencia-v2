import React from 'react';
import { interpolate, random, useCurrentFrame, useVideoConfig } from 'remotion';

type EmbersProps = {
  left: number;
  top: number;
  width: number;
  height: number;
  count?: number;
  seedPrefix?: string;
};

// Small glowing sparks that rise, drift sideways and fade out in a loop,
// spawned from a rectangular zone near a flame source.
export const Embers: React.FC<EmbersProps> = ({ left, top, width, height, count = 10, seedPrefix = 'ember' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ position: 'absolute', left, top, width, height, pointerEvents: 'none' }}>
      {new Array(count).fill(0).map((_, i) => {
        const seed = `${seedPrefix}-${i}`;
        const size = 3 + random(`${seed}-size`) * 5;
        const startX = random(`${seed}-x`) * width;
        const startY = height - random(`${seed}-y`) * height * 0.4;
        const rise = 110 + random(`${seed}-rise`) * 160;
        const drift = (random(`${seed}-drift`) - 0.5) * 70;
        const durationSec = 2.4 + random(`${seed}-dur`) * 2.6;
        const durationFrames = durationSec * fps;
        const delayFrames = random(`${seed}-delay`) * durationFrames;

        const t = ((frame + delayFrames) % durationFrames) / durationFrames;

        const y = interpolate(t, [0, 1], [0, -rise]);
        const x = interpolate(t, [0, 1], [0, drift]);
        const opacity = interpolate(t, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);
        const scale = interpolate(t, [0, 0.15, 0.8, 1], [0.5, 1, 1, 0.3]);

        return (
          <div
            key={seed}
            style={{
              position: 'absolute',
              left: startX,
              top: startY,
              width: size,
              height: size,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #fff6d8 0%, #ffb347 55%, transparent 80%)',
              boxShadow: '0 0 8px 2px rgba(255, 160, 60, 0.7)',
              opacity,
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
            }}
          />
        );
      })}
    </div>
  );
};
