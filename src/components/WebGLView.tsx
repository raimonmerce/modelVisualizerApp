import React, { useRef, useEffect } from 'react';
import { GLView } from 'expo-gl';
import { CubeGeometry } from '../graphics/geometry/CubeGeometry';
import { SphereGeometry } from '../graphics/geometry/SphereGeometry';
import { PyramidGeometry } from '../graphics/geometry/PyramidGeometry';
import { PrismGeometry } from '../graphics/geometry/PrismGeometry';
import { StandardMaterial } from '../graphics/material/StandardMaterial';
import { PhongMaterial } from '../graphics/material/PhongMaterial';
import { Mesh } from '../graphics/Mesh';
import { Renderer } from '../graphics/Renderer';
import type { Geometry } from '../graphics/geometry/Geometry';
import type { ExpoWebGLRenderingContext } from 'expo-gl';
import { GeometryConfig } from '../types';

type WebGLViewProps = {
  geometry: GeometryConfig;
  color: [number, number, number];
};

export default function WebGLView({ geometry, color }: WebGLViewProps) {
  const rendererRef = useRef<Renderer | null>(null);
  const glRef = useRef<ExpoWebGLRenderingContext | null>(null);

  useEffect(() => {
    if (rendererRef.current && glRef.current) {
      const mesh = createMesh(geometry, color);
      rendererRef.current.setMesh(mesh);
    }
  }, [geometry, color]);

  return (
    <GLView
      style={{ width: 300, height: 300 }}
      onContextCreate={async (gl) => {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clearColor(1, 1, 1, 1);
        gl.enable(gl.DEPTH_TEST);

        const mesh = createMesh(geometry, color);
        const renderer = new Renderer(gl);
        renderer.setMesh(mesh);
        renderer.start();

        rendererRef.current = renderer;
        glRef.current = gl;
      }}
    />
  );
}

function createMesh(
  geometryConfig: GeometryConfig,
  color: [number, number, number]
): Mesh {
  const geometry: Geometry = (() => {
    switch (geometryConfig.type) {
      case 'cube':
        return new CubeGeometry(
          geometryConfig.width,
          geometryConfig.height,
          geometryConfig.depth
        );
      case 'sphere':
        return new SphereGeometry(
          geometryConfig.latitudeBands,
          geometryConfig.longitudeBands,
          geometryConfig.radius
        );
      case 'pyramid':
        return new PyramidGeometry(
          geometryConfig.edges,
          geometryConfig.height
        );
      case 'prism':
        return new PrismGeometry(
          geometryConfig.edges,
          geometryConfig.height
        );
    }
  })();

  //const material = new StandardMaterial(color);
  const material = new PhongMaterial(
    color,
    [4.0, 0.0, -4.0],
    [1.0, 1.0, 1.0],
    4.0
  );
  return new Mesh(geometry, material, [0, 0, 0], [0, 0, 0], [1, 1, 1]);
}
