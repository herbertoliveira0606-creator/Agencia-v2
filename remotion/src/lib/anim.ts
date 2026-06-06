import {interpolate, Easing} from 'remotion';

// Easings nomeados conforme a decupagem
export const E = {
  inOutCubic: Easing.inOut(Easing.cubic),
  outQuint: Easing.out(Easing.poly(5)),
  outExpo: Easing.out(Easing.exp),
  outBack: Easing.out(Easing.back(1.7)),
  inQuart: Easing.in(Easing.poly(4)),
  outCubic: Easing.out(Easing.cubic),
  inOutSine: Easing.inOut(Easing.sin),
  outSine: Easing.out(Easing.sin),
  linear: Easing.linear,
};

export type KF = [number, number, ((t: number) => number)?];

// Interpolação multi-keyframe com easing por segmento
export function kf(frame: number, pts: KF[]): number {
  if (frame <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (frame <= pts[i][0]) {
      const [f0, v0] = pts[i - 1];
      const [f1, v1, e] = pts[i];
      return interpolate(frame, [f0, f1], [v0, v1], {
        easing: e || E.linear,
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }
  }
  return pts[pts.length - 1][1];
}

// Breathing 3D — oscilação suave coseno
export function breathe(frame: number, period: number, min: number, max: number): number {
  return min + (max - min) * (0.5 - 0.5 * Math.cos((2 * Math.PI * frame) / period));
}

export type Dir = 'up' | 'down' | 'left' | 'right';

export interface QuadExit {
  tx: number;
  ty: number;
  blur: number;
  opacity: number;
  scale: number;
}

// Quadruple Exit obrigatório: posição + blur + opacity + scale
export function quadExit(
  frame: number,
  f0: number,
  f1: number,
  dir: Dir,
  dist = 480,
  scaleTo = 1.0,
  blurMax = 16
): QuadExit {
  const t = interpolate(frame, [f0, f1], [0, 1], {
    easing: E.inQuart,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const m: Record<Dir, [number, number]> = {
    up: [0, -dist],
    down: [0, dist],
    left: [-dist, 0],
    right: [dist, 0],
  };
  return {
    tx: m[dir][0] * t,
    ty: m[dir][1] * t,
    blur: blurMax * t,
    opacity: 1 - t,
    scale: 1 + (scaleTo - 1) * t,
  };
}
