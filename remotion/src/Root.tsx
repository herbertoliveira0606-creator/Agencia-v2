import React from 'react';
import {Composition} from 'remotion';
import {NubankAd} from './NubankAd';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="NubankAd"
      component={NubankAd}
      durationInFrames={600}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
