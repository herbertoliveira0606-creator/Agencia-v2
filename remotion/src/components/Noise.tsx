import React from 'react';

// Camada de ruído/grain 3% — blend overlay sobre tudo
export const Noise: React.FC<{opacity?: number}> = ({opacity = 0.04}) => (
  <svg
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      opacity,
      mixBlendMode: 'overlay',
      pointerEvents: 'none',
    }}
  >
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);
