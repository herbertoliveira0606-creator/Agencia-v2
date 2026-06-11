import React from 'react';
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from 'remotion';
import { CONFETTI_COLORS } from '../constants';

// Festa-junina confetti drifting down across the whole frame in a seamless
// loop, each piece with its own size, color, fall speed, sway and spin.
export const Confetti: React.FC<{ count?: number }> = ({ count = 40 }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {new Array(count).fill(0).map((_, i) => {
        const seed = `confetti-${i}`;
        const startX = random(`${seed}-x`) * width;
        const size = 8 + random(`${seed}-size`) * 14;
        const color = CONFETTI_COLORS[Math.floor(random(`${seed}-color`) * CONFETTI_COLORS.length)];
        const isCircle = random(`${seed}-shape`) > 0.5;

        const fallDurationSec = 6 + random(`${seed}-fallDur`) * 5;
        const fallDurationFrames = fallDurationSec * fps;
        const delayFrames = random(`${seed}-delay`) * fallDurationFrames;

        const t = ((frame + delayFrames) % fallDurationFrames) / fallDurationFrames;

        const y = interpolate(t, [0, 1], [-40, height + 40]);

        const swayAmount = 30 + random(`${seed}-sway`) * 50;
        const swayPeriod = (1.5 + random(`${seed}-swayPeriod`) * 1.5) * fps;
        const swayPhase = random(`${seed}-swayPhase`) * Math.PI * 2;
        const x = startX + Math.sin((frame / swayPeriod) * Math.PI * 2 + swayPhase) * swayAmount;

        const spinSpeed = (random(`${seed}-spinSpeed`) - 0.5) * 6;
        const rotation = frame * spinSpeed;

        const opacity = interpolate(t, [0, 0.05, 0.92, 1], [0, 1, 1, 0]);

        return (
          <div
            key={seed}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: isCircle ? size : size * 0.4,
              backgroundColor: color,
              borderRadius: isCircle ? '50%' : 2,
              opacity,
              transform: `rotate(${rotation}deg)`,
              boxShadow: '0 0 4px rgba(0,0,0,0.15)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
