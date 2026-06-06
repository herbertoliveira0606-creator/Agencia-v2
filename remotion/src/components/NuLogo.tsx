import React from 'react';

// Monograma "nu" em SVG — dois paths (curva n + curva u) com draw-in via strokeDashoffset
const PATH_N = 'M 30 312 L 30 112 A 82 82 0 0 1 194 112 L 194 312';
const PATH_U = 'M 206 18 L 206 218 A 82 82 0 0 0 370 218 L 370 18';
const LEN = 700; // comprimento aproximado de cada path

export const NuLogo: React.FC<{
  size?: number;
  color?: string;
  rim?: string;
  drawN?: number; // 0..1 progresso de desenho da curva n
  drawU?: number; // 0..1 progresso de desenho da curva u
  fillOpacity?: number;
  glow?: number; // px do glow
  style?: React.CSSProperties;
}> = ({
  size = 360,
  color = '#820AD1',
  rim = '#C77DFF',
  drawN = 1,
  drawU = 1,
  fillOpacity = 1,
  glow = 40,
  style,
}) => {
  const w = size;
  const h = (size * 330) / 400;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 400 330"
      style={{
        overflow: 'visible',
        filter: `drop-shadow(0 30px 60px rgba(0,0,0,0.5)) drop-shadow(0 0 ${glow}px ${rim}88)`,
        ...style,
      }}
    >
      <g
        fill="none"
        stroke={color}
        strokeWidth={58}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={fillOpacity}
      >
        <path
          d={PATH_N}
          strokeDasharray={LEN}
          strokeDashoffset={LEN * (1 - drawN)}
        />
        <path
          d={PATH_U}
          strokeDasharray={LEN}
          strokeDashoffset={LEN * (1 - drawU)}
        />
      </g>
      {/* rim light na borda */}
      <g
        fill="none"
        stroke={rim}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.6 * fillOpacity}
      >
        <path d={PATH_N} strokeDasharray={LEN} strokeDashoffset={LEN * (1 - drawN)} />
        <path d={PATH_U} strokeDasharray={LEN} strokeDashoffset={LEN * (1 - drawU)} />
      </g>
    </svg>
  );
};
