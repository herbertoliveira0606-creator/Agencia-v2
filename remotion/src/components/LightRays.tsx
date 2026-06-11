import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { wiggle } from '../utils';

type LightRaysProps = {
  centerX: number;
  centerY: number;
  size: number;
};

// Slowly rotating conic-gradient "god rays" centered behind the logo,
// screen-blended so they add warm volumetric light without darkening
// anything underneath.
export const LightRays: React.FC<LightRaysProps> = ({ centerX, centerY, size }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const rotation = interpolate(frame, [0, durationInFrames], [0, 18]);
  const pulse = wiggle(frame, fps * 6);
  const opacity = 0.16 + pulse * 0.05;

  return (
    <div
      style={{
        position: 'absolute',
        left: centerX - size / 2,
        top: centerY - size / 2,
        width: size,
        height: size,
        borderRadius: '50%',
        mixBlendMode: 'screen',
        opacity,
        pointerEvents: 'none',
        background: `conic-gradient(from ${rotation}deg, rgba(255, 224, 150, 0.9) 0deg, transparent 25deg, transparent 65deg, rgba(255, 224, 150, 0.6) 90deg, transparent 115deg, transparent 200deg, rgba(255, 224, 150, 0.7) 230deg, transparent 260deg, transparent 360deg)`,
        filter: 'blur(18px)',
      }}
    />
  );
};
