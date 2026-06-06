import React, {createContext, useContext} from 'react';

// Câmera virtual: posição XYZ, rotação XYZ e FOV (R1)
export type Cam = {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  fov: number;
};

const DEFAULT_CAM: Cam = {x: 0, y: 0, z: 400, rotX: 0, rotY: 0, rotZ: 0, fov: 45};
const CamCtx = createContext<Cam>(DEFAULT_CAM);
export const useCam = () => useContext(CamCtx);

const REF_Z = 400;
const BASE_FOV = 45;
const d2r = (d: number) => (d * Math.PI) / 180;

export const Stage: React.FC<{cam: Cam; children: React.ReactNode}> = ({cam, children}) => {
  return (
    <CamCtx.Provider value={cam}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: 1400,
          transformStyle: 'preserve-3d',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </CamCtx.Provider>
  );
};

// Layer: aplica escala de câmera (push-in/FOV) + parallax por z-depth (R2)
// Parallax factor = 1 + (zDepth / 1000). Elemento à frente (Z+) reage mais.
// Três níveis: câmera (escala global) → posicionamento (x/y) → conteúdo (scale/spin/blur/opacity)
export const Layer: React.FC<{
  z?: number;
  x?: number;
  y?: number;
  spin?: number; // rotateY do conteúdo
  scale?: number;
  blur?: number;
  opacity?: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({
  z = 0,
  x = 0,
  y = 0,
  spin = 0,
  scale = 1,
  blur = 0,
  opacity = 1,
  width,
  height,
  style,
  children,
}) => {
  const cam = useCam();
  const pf = 1 + z / 1000;
  // escala global: push-in (z menor = maior) combinado ao FOV
  const S =
    (REF_Z / cam.z) * (Math.tan(d2r(BASE_FOV / 2)) / Math.tan(d2r(cam.fov / 2)));
  const dscale = 1 + z / 2500;
  // parallax de translação + componente de orbit (rotação Y da câmera)
  const orbit = Math.sin(d2r(cam.rotY)) * (z + 250);
  const camTx = (-cam.x * pf + orbit) * 0.5;
  const camTy = cam.y * pf * 0.5 - (cam.rotX * (z + 250) * 0.5 * Math.PI) / 180;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(${camTx}px, ${camTy}px) scale(${S * dscale})`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          position: 'absolute',
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) rotateY(${spin}deg)`,
            filter: blur ? `blur(${blur}px)` : undefined,
            opacity,
            width,
            height,
            transformStyle: 'preserve-3d',
            ...style,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
