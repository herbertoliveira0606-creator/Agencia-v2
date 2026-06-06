import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Scene1} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';
import {Scene3} from './scenes/Scene3';
import {Scene4} from './scenes/Scene4';
import {Scene5} from './scenes/Scene5';
import {Scene6} from './scenes/Scene6';

const FONT =
  '"Graphik", "Inter", "Helvetica Neue", "Segoe UI", system-ui, -apple-system, sans-serif';

// Mapa de cenas (frames absolutos) — overlap garante zero frames vazios
// C1 0-110 | C2 104-210 | C3 204-340 | C4 334-430 | C5 424-510 | C6 504-600
export const NubankAd: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0E0118',
        fontFamily: FONT,
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <Sequence from={0} durationInFrames={110}>
        <Scene1 />
      </Sequence>
      <Sequence from={104} durationInFrames={106}>
        <Scene2 />
      </Sequence>
      <Sequence from={204} durationInFrames={136}>
        <Scene3 />
      </Sequence>
      <Sequence from={334} durationInFrames={96}>
        <Scene4 />
      </Sequence>
      <Sequence from={424} durationInFrames={86}>
        <Scene5 />
      </Sequence>
      <Sequence from={504} durationInFrames={96}>
        <Scene6 />
      </Sequence>
    </AbsoluteFill>
  );
};
