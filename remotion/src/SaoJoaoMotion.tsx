import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  LOGO_CENTER,
  POSTER_OFFSET_Y,
  POSTER_RENDER_H,
  POSTER_RENDER_W,
  REGIONS,
  regionToPx,
} from './constants';
import { Background } from './components/Background';
import { Confetti } from './components/Confetti';
import { DustParticles } from './components/DustParticles';
import { Embers } from './components/Embers';
import { GlowPulse } from './components/GlowPulse';
import { LayerCutout } from './components/LayerCutout';
import { LightRays } from './components/LightRays';
import { Stars } from './components/Stars';
import { Vignette } from './components/Vignette';
import { wiggle } from './utils';

const titleBadgePx = regionToPx(REGIONS.titleBadge, POSTER_RENDER_W, POSTER_RENDER_H);
const flameIconPx = regionToPx(REGIONS.flameIcon, POSTER_RENDER_W, POSTER_RENDER_H);
const sunflowerPx = regionToPx(REGIONS.sunflower, POSTER_RENDER_W, POSTER_RENDER_H);
const lanternPx = regionToPx(REGIONS.lantern, POSTER_RENDER_W, POSTER_RENDER_H);
const cornerFlamePx = regionToPx(REGIONS.cornerFlame, POSTER_RENDER_W, POSTER_RENDER_H);

// Logo center, expressed relative to the title badge's own box.
const logoLocal = {
  x: LOGO_CENTER.x - titleBadgePx.left,
  y: LOGO_CENTER.y - titleBadgePx.top,
};

// Flame icon position, relative to the title badge's own box.
const flameIconLocal = {
  left: flameIconPx.left - titleBadgePx.left,
  top: flameIconPx.top - titleBadgePx.top,
  width: flameIconPx.width,
  height: flameIconPx.height,
};

const cameraOrigin = {
  x: (LOGO_CENTER.x / POSTER_RENDER_W) * 100,
  y: (LOGO_CENTER.y / POSTER_RENDER_H) * 100,
};

export const SaoJoaoMotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const posterSrc = staticFile('poster.jpg');

  // ---- Camera: slow dolly-in toward the logo, then pull back to reveal ----
  const cameraScale = interpolate(
    frame,
    [0, durationInFrames * 0.55, durationInFrames],
    [1, 1.16, 1.04],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // ---- Background strips (independent subtle parallax) ----
  const topStripDriftX = wiggle(frame, fps * 9, 0) * 4;
  const topStripScale = interpolate(frame, [0, durationInFrames], [1, 1.018], {
    extrapolateRight: 'clamp',
  });

  const bottomStripDriftY = wiggle(frame, fps * 11, 0.25) * 5;
  const bottomStripScale = interpolate(frame, [0, durationInFrames], [1, 1.022], {
    extrapolateRight: 'clamp',
  });

  // ---- Sunflower (top-left): gentle sway + light variation ----
  const sunflowerSway = wiggle(frame, fps * 5, 0.1) * 1.6;
  const sunflowerScale = 1 + wiggle(frame, fps * 4.5, 0.4) * 0.012;
  const sunflowerBrightness = 1 + wiggle(frame, fps * 3.2, 0.6) * 0.08;

  // ---- Lantern (top-right): breeze swing + warm flicker that intensifies ----
  const lanternSwing = wiggle(frame, fps * 3.4, 0.15) * 2.8;
  const lanternGlowBase = interpolate(frame, [0, durationInFrames], [0.45, 0.78], {
    extrapolateRight: 'clamp',
  });

  // ---- Corner flame (bottom-left): pulsing flicker ----
  const cornerFlameScale = 1 + wiggle(frame, fps * 2.1, 0.2) * 0.05;
  const cornerFlameBrightness = 1 + wiggle(frame, fps * 1.7, 0.5) * 0.12;

  // ---- Logo / title plate: soft float ----
  const logoFloatY = wiggle(frame, fps * 4.2, 0.05) * 7;
  const logoScale = 1 + wiggle(frame, fps * 4.2, 0.05) * 0.01;

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070f', overflow: 'hidden' }}>
      <Background src={posterSrc} />
      <DustParticles />

      {/* Camera group: holds the sharp poster artwork, dolly-in/pull-back anchored on the logo */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: POSTER_OFFSET_Y,
          width: POSTER_RENDER_W,
          height: POSTER_RENDER_H,
          transform: `scale(${cameraScale})`,
          transformOrigin: `${cameraOrigin.x}% ${cameraOrigin.y}%`,
        }}
      >
        {/* Base layers: yellow/blue background fields with independent drift */}
        <LayerCutout
          region={REGIONS.bottomStrip}
          containerWidth={POSTER_RENDER_W}
          containerHeight={POSTER_RENDER_H}
          src={posterSrc}
          contentStyle={{
            transform: `translateY(${bottomStripDriftY}px) scale(${bottomStripScale})`,
            transformOrigin: '50% 60%',
          }}
        />
        <LayerCutout
          region={REGIONS.topStrip}
          containerWidth={POSTER_RENDER_W}
          containerHeight={POSTER_RENDER_H}
          src={posterSrc}
          contentStyle={{
            transform: `translateX(${topStripDriftX}px) scale(${topStripScale})`,
            transformOrigin: '50% 30%',
          }}
        />

        {/* Sunflower (top-left) */}
        <LayerCutout
          region={REGIONS.sunflower}
          containerWidth={POSTER_RENDER_W}
          containerHeight={POSTER_RENDER_H}
          src={posterSrc}
          style={{ filter: `brightness(${sunflowerBrightness})` }}
          contentStyle={{
            transform: `rotate(${sunflowerSway}deg) scale(${sunflowerScale})`,
            transformOrigin: '60% 95%',
          }}
        >
          <GlowPulse
            left={sunflowerPx.width * 0.05}
            top={sunflowerPx.height * 0.05}
            width={sunflowerPx.width * 0.9}
            height={sunflowerPx.height * 0.9}
            color="rgba(255, 220, 120, 0.55)"
            baseOpacity={0.3}
            flickerAmount={0.15}
            periodSeconds={3.4}
            blur={26}
            phase={0.2}
          />
        </LayerCutout>

        {/* Lantern (top-right) */}
        <LayerCutout
          region={REGIONS.lantern}
          containerWidth={POSTER_RENDER_W}
          containerHeight={POSTER_RENDER_H}
          src={posterSrc}
          contentStyle={{
            transform: `rotate(${lanternSwing}deg)`,
            transformOrigin: '55% 6%',
          }}
        >
          <GlowPulse
            left={lanternPx.width * 0.15}
            top={lanternPx.height * 0.35}
            width={lanternPx.width * 0.75}
            height={lanternPx.height * 0.65}
            color="rgba(255, 180, 80, 0.85)"
            baseOpacity={lanternGlowBase}
            flickerAmount={0.18}
            periodSeconds={1.8}
            blur={20}
            phase={0.5}
          />
        </LayerCutout>
        <Embers
          left={lanternPx.left + lanternPx.width * 0.2}
          top={lanternPx.top + lanternPx.height * 0.4}
          width={lanternPx.width * 0.6}
          height={lanternPx.height * 0.5}
          count={6}
          seedPrefix="lantern"
        />

        {/* Corner flame (bottom-left) */}
        <LayerCutout
          region={REGIONS.cornerFlame}
          containerWidth={POSTER_RENDER_W}
          containerHeight={POSTER_RENDER_H}
          src={posterSrc}
          style={{ filter: `brightness(${cornerFlameBrightness})` }}
          contentStyle={{
            transform: `scale(${cornerFlameScale})`,
            transformOrigin: '35% 30%',
          }}
        >
          <GlowPulse
            left={cornerFlamePx.width * 0.1}
            top={cornerFlamePx.height * 0.05}
            width={cornerFlamePx.width * 0.85}
            height={cornerFlamePx.height * 0.85}
            color="rgba(255, 150, 60, 0.8)"
            baseOpacity={0.5}
            flickerAmount={0.2}
            periodSeconds={1.6}
            blur={18}
            phase={0.35}
          />
        </LayerCutout>
        <Embers
          left={cornerFlamePx.left + cornerFlamePx.width * 0.2}
          top={cornerFlamePx.top}
          width={cornerFlamePx.width * 0.6}
          height={cornerFlamePx.height * 0.6}
          count={8}
          seedPrefix="corner"
        />

        {/* Artists: pop-in entrance + soft glow + continuous parallax float */}
        {REGIONS.artists.map((region, i) => {
          const px = regionToPx(region, POSTER_RENDER_W, POSTER_RENDER_H);
          const entrance = spring({
            frame: frame - i * 5,
            fps,
            config: { damping: 14, mass: 0.6, stiffness: 120 },
            durationInFrames: 40,
          });
          const entranceY = interpolate(entrance, [0, 1], [40, 0]);
          const entranceScale = interpolate(entrance, [0, 1], [0.9, 1]);
          const entranceOpacity = Math.min(1, Math.max(0, entrance));

          const floatY = wiggle(frame, fps * (3 + i * 0.3), i * 0.13) * 5;
          const floatScale = 1 + wiggle(frame, fps * (3.5 + i * 0.2), i * 0.2) * 0.012;

          return (
            <React.Fragment key={`artist-${i}`}>
              <GlowPulse
                left={px.left - px.width * 0.15}
                top={px.top + px.height * 0.1}
                width={px.width * 1.3}
                height={px.height * 0.9}
                color="rgba(255, 200, 120, 0.45)"
                baseOpacity={0.3}
                flickerAmount={0.12}
                periodSeconds={3 + i * 0.4}
                blur={28}
                phase={i * 0.17}
              />
              <LayerCutout
                region={region}
                containerWidth={POSTER_RENDER_W}
                containerHeight={POSTER_RENDER_H}
                src={posterSrc}
                style={{
                  opacity: entranceOpacity,
                  filter: 'drop-shadow(0 14px 26px rgba(0,0,0,0.45))',
                }}
                contentStyle={{
                  transform: `translateY(${entranceY + floatY}px) scale(${entranceScale * floatScale})`,
                  transformOrigin: '50% 100%',
                }}
              />
            </React.Fragment>
          );
        })}

        {/* Date / city badges: smooth pop-in */}
        {REGIONS.dateBadges.map((region, i) => {
          const entrance = spring({
            frame: frame - 10 - i * 6,
            fps,
            config: { damping: 13, mass: 0.5, stiffness: 130 },
            durationInFrames: 36,
          });
          const entranceY = interpolate(entrance, [0, 1], [22, 0]);
          const entranceScale = interpolate(entrance, [0, 1], [0.85, 1]);
          const entranceOpacity = Math.min(1, Math.max(0, entrance));
          const floatY = wiggle(frame, fps * 4, i * 0.3) * 2;

          return (
            <LayerCutout
              key={`date-${i}`}
              region={region}
              containerWidth={POSTER_RENDER_W}
              containerHeight={POSTER_RENDER_H}
              src={posterSrc}
              style={{
                opacity: entranceOpacity,
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.35))',
              }}
              contentStyle={{
                transform: `translateY(${entranceY + floatY}px) scale(${entranceScale})`,
              }}
            />
          );
        })}

        {/* Title plate / main logo: focal point, floats gently, framed by light + stars */}
        <LayerCutout
          region={REGIONS.titleBadge}
          containerWidth={POSTER_RENDER_W}
          containerHeight={POSTER_RENDER_H}
          src={posterSrc}
          style={{ filter: 'drop-shadow(0 18px 34px rgba(0,0,0,0.4))' }}
          contentStyle={{
            transform: `translateY(${logoFloatY}px) scale(${logoScale})`,
          }}
        >
          <LightRays centerX={logoLocal.x} centerY={logoLocal.y} size={650} />
          <Stars left={0} top={0} width={titleBadgePx.width} height={titleBadgePx.height} count={9} />
          <GlowPulse
            left={flameIconLocal.left - 30}
            top={flameIconLocal.top - 30}
            width={flameIconLocal.width + 60}
            height={flameIconLocal.height + 60}
            color="rgba(255, 200, 110, 0.85)"
            baseOpacity={0.45}
            flickerAmount={0.22}
            periodSeconds={1.4}
            blur={16}
            phase={0.6}
          />
        </LayerCutout>

        {/* Soft atmospheric fade where the sharp poster meets the blurred backdrop */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 90,
            background: 'linear-gradient(to bottom, rgba(5,7,15,0.85), rgba(5,7,15,0))',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 110,
            background: 'linear-gradient(to top, rgba(5,7,15,0.85), rgba(5,7,15,0))',
            pointerEvents: 'none',
          }}
        />
      </div>

      <Confetti />
      <Vignette />
    </AbsoluteFill>
  );
};
