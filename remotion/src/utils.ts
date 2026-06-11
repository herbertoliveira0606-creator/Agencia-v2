// Smooth deterministic oscillation, e.g. for floating / swinging / breathing
// loops. `frame` and `periodInFrames` define the cycle, `phase` (0-1) shifts
// the start point so multiple elements don't move in lockstep.
export const wiggle = (frame: number, periodInFrames: number, phase = 0) =>
  Math.sin(((frame / periodInFrames) + phase) * Math.PI * 2);
