import React from 'react';
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from 'remotion';
import { wiggle } from '../utils';

// Slow, soft, low-opacity dust motes drifting upward across the whole
// frame, adding cinematic atmosphere without competing with confetti.
export const DustParticles: React.FC<{ count?: number }> = ({ count = 22 }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', mixBlendMode: 'screen' }}>
      {new Array(count).fill(0).map((_, i) => {
        const seed = `dust-${i}`;
        const startX = random(`${seed}-x`) * width;
        const size = 2 + random(`${seed}-size`) * 5;

        const driftDurationSec = 12 + random(`${seed}-dur`) * 10;
        const driftDurationFrames = driftDurationSec * fps;
        const delayFrames = random(`${seed}-delay`) * driftDurationFrames;

        const t = ((frame + delayFrames) % driftDurationFrames) / driftDurationFrames;

        const y = interpolate(t, [0, 1], [height + 20, -20]);

        const swayAmount = 12 + random(`${seed}-sway`) * 28;
        const swayPeriod = (3 + random(`${seed}-swayPeriod`) * 3) * fps;
        const x = startX + wiggle(frame, swayPeriod, random(`${seed}-phase`)) * swayAmount;

        const baseOpacity = 0.08 + random(`${seed}-opacity`) * 0.18;
        const opacity = baseOpacity * Math.sin(t * Math.PI);

        return (
          <div
            key={seed}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: '#fff8e6',
              opacity,
              filter: 'blur(1px)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
