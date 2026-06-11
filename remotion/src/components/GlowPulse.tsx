import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { wiggle } from '../utils';

type GlowPulseProps = {
  left: number;
  top: number;
  width: number;
  height: number;
  color: string;
  baseOpacity?: number;
  flickerAmount?: number;
  periodSeconds?: number;
  blur?: number;
  phase?: number;
};

// Soft radial-gradient glow, screen-blended, with a gentle sine-based
// flicker so flames / lanterns feel alive rather than static.
export const GlowPulse: React.FC<GlowPulseProps> = ({
  left,
  top,
  width,
  height,
  color,
  baseOpacity = 0.5,
  flickerAmount = 0.2,
  periodSeconds = 2.4,
  blur = 30,
  phase = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flicker =
    wiggle(frame, periodSeconds * fps, phase) * 0.6 +
    wiggle(frame, periodSeconds * fps * 0.37, phase + 0.31) * 0.4;

  const opacity = Math.max(0, baseOpacity + flicker * flickerAmount);
  const scale = 1 + flicker * 0.06;

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        mixBlendMode: 'screen',
        opacity,
        filter: `blur(${blur}px)`,
        transform: `scale(${scale})`,
        transformOrigin: '50% 50%',
        pointerEvents: 'none',
      }}
    />
  );
};
