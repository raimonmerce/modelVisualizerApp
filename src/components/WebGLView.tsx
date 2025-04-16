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
import { GeometryConfig } from '../types';

import type { ExpoWebGLRenderingContext } from 'expo-gl';

type WebGLViewProps = {
  geometry: GeometryConfig;
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
  geometry: GeometryConfig,
  color: [number, number, number],
  rendererRef: React.MutableRefObject<Renderer | null>
) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(1, 1, 1, 1);
  gl.enable(gl.DEPTH_TEST);

  const geometryObject: Geometry = (() => {
    switch (geometry.type) {
      case 'cube':
        return new CubeGeometry(geometry.width, geometry.height, geometry.depth);
      case 'sphere':
        return new SphereGeometry(geometry.latitudeBands, geometry.longitudeBands, geometry.radius);
      case 'pyramid':
        return new PyramidGeometry(geometry.edges, geometry.height);
      case 'prism':
        return new PrismGeometry(geometry.edges, geometry.height);
      default:
        throw new Error('Unknown geometry type');
    }
  })();

  const material = new StandardMaterial(color);
  // const material = new PhongMaterial(
  //   color,
  //   [0.5, 0.7, 1.0],      // lightDirection (arbitrary directional light)
  //   [1.0, 1.0, 1.0],      // lightColor (white)
  //   64                   // shininess
  // );
  const mesh = new Mesh(geometryObject, material, [0, 0, 0], [Math.PI/8, 0, 0], [1, 1, 1]);

  const renderer = new Renderer(gl);
  renderer.setMesh(mesh);
  renderer.start();

  rendererRef.current = renderer;
}