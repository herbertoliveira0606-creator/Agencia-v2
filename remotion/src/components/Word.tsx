import React from 'react';
import {useCurrentFrame} from 'remotion';
import {kf, E} from '../lib/anim';

// Tipografia palavra-por-palavra: cada palavra com delay, y, blur e opacity próprios
export const Word: React.FC<{
  delay: number;
  children: React.ReactNode;
  size?: number;
  weight?: number;
  color?: string;
  fromY?: number;
  blur?: number;
  ease?: (t: number) => number;
  glow?: string;
  style?: React.CSSProperties;
}> = ({
  delay,
  children,
  size = 64,
  weight = 700,
  color = '#FFFFFF',
  fromY = 24,
  blur = 8,
  ease = E.outExpo,
  glow,
  style,
}) => {
  const frame = useCurrentFrame();
  const opacity = kf(frame, [
    [delay, 0],
    [delay + 16, 1, E.outExpo],
  ]);
  const ty = kf(frame, [
    [delay, fromY],
    [delay + 18, 0, ease],
  ]);
  const blurPx = kf(frame, [
    [delay, blur],
    [delay + 18, 0, E.outSine],
  ]);
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: size,
        fontWeight: weight,
        color,
        opacity,
        transform: `translateY(${ty}px)`,
        filter: `blur(${blurPx}px)`,
        textShadow: glow ? `0 0 24px ${glow}` : undefined,
        letterSpacing: '-0.02em',
        ...style,
      }}
    >
      {children}
    </span>
  );
};
