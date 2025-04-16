// WebGLView.tsx
import React, { useRef } from 'react';
import { GLView } from 'expo-gl';
import { Geometry } from '../graphics/geometry/Geometry';
import { CubeGeometry } from '../graphics/geometry/CubeGeometry';
import { SphereGeometry } from '../graphics/geometry/SphereGeometry';
import { PyramidGeometry } from '../graphics/geometry/PyramidGeometry';
import { PrismGeometry } from '../graphics/geometry/PrismGeometry';
import { StandardMaterial } from '../graphics/material/StandardMaterial';
import { PhongMaterial } from '../graphics/material/PhongMaterial';
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
      case 'sphere': return new SphereGeometry(8, 8, 0.5);
      case 'pyramid': return new PyramidGeometry(3, 1);
      case 'prism': return new PrismGeometry(3, 1);
      case 'cube':
      default: return new CubeGeometry(1, 1.5, 2);
    }
  })();

  const material = new StandardMaterial(color);
  // const material = new PhongMaterial(
  //   color,
  //   [0.5, 0.7, 1.0],      // lightDirection (arbitrary directional light)
  //   [1.0, 1.0, 1.0],      // lightColor (white)
  //   64                   // shininess
  // );
  const mesh = new Mesh(geometryObject, material, [0, 0, 0], [0, 0, 0], [1, 1, 1]);

  const renderer = new Renderer(gl);
  renderer.setMesh(mesh);
  renderer.start();

  rendererRef.current = renderer;
}