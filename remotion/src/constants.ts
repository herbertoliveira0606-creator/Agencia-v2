export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const FPS = 60;
export const DURATION_IN_SECONDS = 10;
export const DURATION_IN_FRAMES = FPS * DURATION_IN_SECONDS;

// Original artwork is 1024x1280 (4:5). Render it at full canvas width and
// center it vertically inside the 9:16 frame, leaving room top/bottom for
// the blurred atmosphere background.
export const POSTER_W = 1024;
export const POSTER_H = 1280;
export const POSTER_RENDER_W = VIDEO_WIDTH;
export const POSTER_RENDER_H = Math.round((POSTER_RENDER_W * POSTER_H) / POSTER_W);
export const POSTER_OFFSET_Y = Math.round((VIDEO_HEIGHT - POSTER_RENDER_H) / 2);

export type Region = { left: number; top: number; width: number; height: number };

// All regions are expressed as percentages of the poster (1024x1280).
export const REGIONS = {
  topStrip: { left: 0, top: 0, width: 100, height: 34 } as Region,
  bottomStrip: { left: 0, top: 33, width: 100, height: 67 } as Region,

  sunflower: { left: -1, top: -1, width: 26, height: 19 } as Region,
  lantern: { left: 75, top: -1, width: 26, height: 26 } as Region,
  titleBadge: { left: 15, top: 0, width: 70, height: 34 } as Region,
  flameIcon: { left: 40, top: 9, width: 19, height: 11 } as Region,

  artists: [
    { left: 0, top: 42, width: 19, height: 38 },
    { left: 17, top: 42, width: 21, height: 38 },
    { left: 35, top: 42, width: 22, height: 38 },
    { left: 54, top: 42, width: 21, height: 38 },
    { left: 69, top: 42, width: 18, height: 38 },
    { left: 84, top: 42, width: 16, height: 38 },
  ] as Region[],

  dateBadges: [
    { left: 2, top: 70, width: 30, height: 9 },
    { left: 33, top: 70, width: 30, height: 9 },
    { left: 65, top: 70, width: 33, height: 9 },
  ] as Region[],

  cornerFlame: { left: -3, top: 88, width: 31, height: 15 } as Region,
};

// Center of the main "São João das Tradições" logo plate, in poster px.
export const LOGO_CENTER = {
  x: ((REGIONS.titleBadge.left + REGIONS.titleBadge.width / 2) / 100) * POSTER_RENDER_W,
  y: ((REGIONS.titleBadge.top + REGIONS.titleBadge.height / 2) / 100) * POSTER_RENDER_H,
};

export const CONFETTI_COLORS = ['#e63946', '#ffd60a', '#1d4ed8', '#ffffff', '#ff8c00', '#2a9d34', '#ff2d8a'];

export const regionToPx = (region: Region, containerWidth: number, containerHeight: number) => ({
  left: (region.left / 100) * containerWidth,
  top: (region.top / 100) * containerHeight,
  width: (region.width / 100) * containerWidth,
  height: (region.height / 100) * containerHeight,
});
