import React from 'react';
import { Composition } from 'remotion';
import { SaoJoaoMotion } from './SaoJoaoMotion';
import { DURATION_IN_FRAMES, FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SaoJoaoMotion"
      component={SaoJoaoMotion}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
};
