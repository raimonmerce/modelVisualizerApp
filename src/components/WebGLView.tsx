// WebGLView.tsx
import React, { useRef } from 'react';
import { GLView } from 'expo-gl';
import { Geometry } from '../graphics/geometry/Geometry';
import { CubeGeometry } from '../graphics/geometry/CubeGeometry';
import { SphereGeometry } from '../graphics/geometry/SphereGeometry';
import { PyramidGeometry } from '../graphics/geometry/PyramidGeometry';
import { PrismGeometry } from '../graphics/geometry/PrismGeometry';
import { StandardMaterial } from '../graphics/material/StandardMaterial';
import { Mesh } from '../graphics/Mesh';
import { Renderer } from '../graphics/Renderer';

import type { ExpoWebGLRenderingContext } from 'expo-gl';

type WebGLViewProps = {
  geometry: 'cube' | 'sphere' | 'pyramid' | 'prism';
  color: [number, number, number];
};

export default function WebGLView({ geometry, color }: WebGLViewProps) {
  const rendererRef = useRef<Renderer | null>(null);  
  return (
      <GLView
        key={`${geometry}-${color.join(',')}`}
        style={{ width: 300, height: 300 }}
        onContextCreate={
          (gl) => onContextCreate(gl, geometry, color, rendererRef)
        }
      />
    );
}

function onContextCreate(
  gl: ExpoWebGLRenderingContext,
  geometry: string,
  color: [number, number, number],
  rendererRef: React.MutableRefObject<Renderer | null>
) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(1, 1, 1, 1);
  gl.enable(gl.DEPTH_TEST);

  const geometryObject: Geometry = (() => {
    switch (geometry) {
      case 'sphere': return new SphereGeometry();
      case 'pyramid': return new PyramidGeometry();
      case 'prism': return new PrismGeometry();
      case 'cube':
      default: return new CubeGeometry();
    }
  })();

  const material = new StandardMaterial(color);
  const mesh = new Mesh(geometryObject, material, [0, 0, 0], [0, 0, 0], [1, 1, 1]);

  const renderer = new Renderer(gl);
  renderer.setMesh(mesh);
  renderer.start();

  rendererRef.current = renderer;
}