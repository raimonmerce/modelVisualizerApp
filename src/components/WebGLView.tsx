import React, { useRef, useEffect, useState } from 'react';
import { GLView } from 'expo-gl';
import { DeviceMotion } from 'expo-sensors';
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
  const [lightDirection, setLightDirection] = useState<[number, number, number]>([0, 0, -1]);


  useEffect(() => {
    DeviceMotion.setUpdateInterval(100);
  
    const subscription = DeviceMotion.addListener((data) => {
      const rot = data.rotation;
  
      if (rot) {
        // Estimate direction based on rotation (pitch, roll, yaw)
        const { alpha, beta, gamma } = rot;
  
        // Convert to a direction vector - rough approximation
        const x = Math.sin(gamma || 0);
        const y = Math.sin(beta || 0);
        const z = -Math.cos(alpha || 0);
  
        const length = Math.sqrt(x * x + y * y + z * z) || 1;
        setLightDirection([x / length, y / length, z / length]);
  
        console.log('DeviceMotion Light Direction:', x, y, z);
      }
    });
  
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (rendererRef.current && glRef.current) {
      const mesh = createMesh(geometry, color, lightDirection);
      rendererRef.current.setMesh(mesh);
    }
  }, [geometry, color, lightDirection]);

  return (
    <GLView
      style={{ width: 300, height: 300 }}
      onContextCreate={async (gl) => {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clearColor(1, 1, 1, 1);
        gl.enable(gl.DEPTH_TEST);

        const mesh = createMesh(geometry, color, lightDirection);
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
  color: [number, number, number],
  lightDir: [number, number, number]
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
          geometryConfig.height,
          geometryConfig.radius
        );
      case 'prism':
        return new PrismGeometry(
          geometryConfig.edges,
          geometryConfig.height,
          geometryConfig.radius
        );
    }
  })();

  //const material = new StandardMaterial(color);
  const material = new PhongMaterial(
    color,
    [4.0, 0.0, 4.0],
    [1.0, 1.0, 1.0],
    1.0
  );
  return new Mesh(geometry, material, [0, 0, 0], [0, 0, 0], [1, 1, 1]);
}
