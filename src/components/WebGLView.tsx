// WebGLView.tsx
import React from 'react';
import { GLView } from 'expo-gl';
import { Geometry } from '../graphics/geometry/Geometry';
import { CubeGeometry } from '../graphics/geometry/CubeGeometry';
import { SphereGeometry } from '../graphics/geometry/SphereGeometry';
import { PyramidGeometry } from '../graphics/geometry/PyramidGeometry';
import { PrismGeometry } from '../graphics/geometry/PrismGeometry';
import { Material } from '../graphics/Material';
import { Mesh } from '../graphics/Mesh';
import type { ExpoWebGLRenderingContext } from 'expo-gl';

type WebGLViewProps = {
  geometry: 'cube' | 'sphere' | 'pyramid' | 'prism'; // Geometry types
  color: [number, number, number]; // RGB color as an array
};

export default function WebGLView({ geometry, color }: WebGLViewProps) {
    return (
      <GLView
        key={`${geometry}-${color.join(',')}`} // force re-mount on geometry or color change
        style={{ width: 300, height: 300 }}
        onContextCreate={(gl) => onContextCreate(gl, geometry, color)}
      />
    );
}

function onContextCreate(gl: ExpoWebGLRenderingContext, geometry: string, color: [number, number, number]) {
  console.log("graphics", geometry, color)
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(1, 1, 1, 1);

  let geometryObject: Geometry;

  switch (geometry) {
    case 'cube':
      geometryObject = new CubeGeometry();
      break;
    case 'sphere':
      geometryObject = new SphereGeometry();
      break;
    case 'pyramid':
      geometryObject = new PyramidGeometry();
      break;
    case 'prism':
      geometryObject = new PrismGeometry();
      break;
    default:
      geometryObject = new CubeGeometry();
  }

  const [r, g, b] = color;

  const colorMaterial = new Material(
    `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `,
    `
      void main() {
        gl_FragColor = vec4(${r}, ${g}, ${b}, 1.0); // Dynamic color
      }
    `
  );

  const mesh = new Mesh(geometryObject, colorMaterial);

  const program = gl.createProgram();
  const vertShader = gl.createShader(gl.VERTEX_SHADER);
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertShader, mesh.material.vertexShader);
  gl.compileShader(vertShader);

  gl.shaderSource(fragShader, mesh.material.fragmentShader);
  gl.compileShader(fragShader);

  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.geometry.vertices, gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.geometry.indices, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'position');
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLocation);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, mesh.geometry.indices.length, gl.UNSIGNED_SHORT, 0);

  gl.flush();
  gl.endFrameEXP();
}