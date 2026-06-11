import React from 'react';
import { AbsoluteFill } from 'remotion';

// Subtle dark radial vignette to focus attention toward the center/logo
// and add a broadcast-quality cinematic finish.
export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      background:
        'radial-gradient(ellipse at 50% 38%, transparent 45%, rgba(0,0,0,0.45) 100%)',
    }}
  />
);
