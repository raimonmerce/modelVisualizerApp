// WebGLView.tsx
import React from 'react';
import { GLView } from 'expo-gl';
import { Geometry } from '../graphics/geometry/Geometry';
import { CubeGeometry } from '../graphics/geometry/CubeGeometry';
import { SphereGeometry } from '../graphics/geometry/SphereGeometry';
import { PyramidGeometry } from '../graphics/geometry/PyramidGeometry';
import { PrismGeometry } from '../graphics/geometry/PrismGeometry';
import { StandardMaterial } from '../graphics/material/StandardMaterial';
import { Mesh } from '../graphics/Mesh';
import {
  createPerspectiveMatrix,
  createTranslationMatrix,
  createLookAtMatrix,
  createRotationMatrix,
  createScaleMatrix,
  multiplyMatrices
} from '../utils/graphicUtils';

import type { ExpoWebGLRenderingContext } from 'expo-gl';

type WebGLViewProps = {
  geometry: 'cube' | 'sphere' | 'pyramid' | 'prism';
  color: [number, number, number];
};

export default function WebGLView({ geometry, color }: WebGLViewProps) {
    return (
      <GLView
        key={`${geometry}-${color.join(',')}`}
        style={{ width: 300, height: 300 }}
        onContextCreate={(gl) => onContextCreate(gl, geometry, color)}
      />
    );
}

function onContextCreate(gl: ExpoWebGLRenderingContext, geometry: string, color: [number, number, number]) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(1, 1, 1, 1);
  gl.enable(gl.DEPTH_TEST);

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

  const colorMaterial = new StandardMaterial(color);

  const mesh = new Mesh(geometryObject, colorMaterial, [0, 0, 0], [Math.PI/4, Math.PI/4, Math.PI/4], [1, 1, 1]);

  const program = gl.createProgram();
  const vertShader = gl.createShader(gl.VERTEX_SHADER);
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertShader, mesh.material.vertexShader);
  gl.compileShader(vertShader);
  
  if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
    console.error("Vertex shader failed to compile:", gl.getShaderInfoLog(vertShader));
  }

  gl.shaderSource(fragShader, mesh.material.fragmentShader);
  gl.compileShader(fragShader);

  if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
    console.error("Fragment shader failed to compile:", gl.getShaderInfoLog(fragShader));
  }

  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program failed to link:", gl.getProgramInfoLog(program));
  }

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.geometry.vertices, gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.geometry.indices, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'position');
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLocation);

  const fov = Math.PI / 4;
  const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
  const near = 0.1;
  const far = 100.0;

  const cameraPosition: [number, number, number] = [0, 0, 3];
  const target: [number, number, number] = [0, 0, 0];
  const up: [number, number, number] = [0, 1, 0];  

  const translationMatrix = createTranslationMatrix(mesh.position[0], mesh.position[1], mesh.position[2]);
  const rotationMatrix = createRotationMatrix(mesh.rotation[0], mesh.rotation[1], mesh.rotation[2]);
  const scaleMatrix = createScaleMatrix(mesh.scale[0], mesh.scale[1], mesh.scale[2]);
  const transformMatrix = multiplyMatrices(translationMatrix, multiplyMatrices(rotationMatrix, scaleMatrix));

  const viewMatrix = createLookAtMatrix(cameraPosition, target, up);
  const projectionMatrix = createPerspectiveMatrix(fov, aspect, near, far);
  
  const transformMatrixLoc = gl.getUniformLocation(program, 'uTransformMatrix');
  const viewMatrixLoc = gl.getUniformLocation(program, 'uViewMatrix');
  const projectionMatrixLoc = gl.getUniformLocation(program, 'uProjectionMatrix');
  const colorLoc = gl.getUniformLocation(program, 'uColor');
  
  gl.uniform3fv(colorLoc, mesh.material.color);
  gl.uniformMatrix4fv(transformMatrixLoc, false, new Float32Array(transformMatrix));
  gl.uniformMatrix4fv(viewMatrixLoc, false, new Float32Array(viewMatrix));
  gl.uniformMatrix4fv(projectionMatrixLoc, false, new Float32Array(projectionMatrix));

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, mesh.geometry.indices.length, gl.UNSIGNED_SHORT, 0);

  gl.flush();
  gl.endFrameEXP();
}