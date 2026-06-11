import React from 'react';
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion';

// A heavily blurred, enlarged duplicate of the poster fills the full 9:16
// canvas and behind the sharp foreground artwork, giving the impression of
// an atmospheric backdrop without needing any extra assets.
export const Background: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1.55, 1.7], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const driftX = interpolate(frame, [0, durationInFrames], [0, -16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Gentle depth-of-field shift: background softens further as the camera
  // pushes in, then relaxes slightly during the pull-back.
  const blur = interpolate(frame, [0, durationInFrames * 0.55, durationInFrames], [55, 72, 60], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: '#05070f' }}>
      <Img
        src={src}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width,
          height,
          objectFit: 'cover',
          transform: `translate(-50%, -50%) translateX(${driftX}px) scale(${scale})`,
          filter: `blur(${blur}px) brightness(0.45) saturate(1.2)`,
        }}
      />
      <AbsoluteFill style={{ backgroundColor: 'rgba(5, 7, 15, 0.45)' }} />
    </AbsoluteFill>
  );
};
