import React from 'react';
import { Img } from 'remotion';
import { Region, regionToPx } from '../constants';

type LayerCutoutProps = {
  region: Region;
  containerWidth: number;
  containerHeight: number;
  src: string;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  children?: React.ReactNode;
};

// Crops a rectangular region out of the full poster image by absolutely
// positioning an oversized <Img> inside an overflow-hidden "window" box.
// The window itself stays pixel-aligned with the rest of the composition;
// `contentStyle` (transform/transformOrigin) is applied to an inner wrapper
// so a layer can float/sway/zoom slightly without revealing gaps at its edges.
export const LayerCutout: React.FC<LayerCutoutProps> = ({
  region,
  containerWidth,
  containerHeight,
  src,
  style,
  contentStyle,
  imgStyle,
  children,
}) => {
  const { left, top, width, height } = regionToPx(region, containerWidth, containerHeight);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, ...contentStyle }}>
        <Img
          src={src}
          style={{
            position: 'absolute',
            left: -left,
            top: -top,
            width: containerWidth,
            height: containerHeight,
            maxWidth: 'none',
            ...imgStyle,
          }}
        />
        {children}
      </div>
    </div>
  );
};
