// WebGLView.tsx
import React from 'react';
import { GLView } from 'expo-gl';
import { Geometry } from '../graphics/Geometry';
import { Material } from '../graphics/Material';
import { Mesh } from '../graphics/Mesh';
import type { ExpoWebGLRenderingContext } from 'expo-gl';

export default function WebGLView() {
  return (
    <GLView style={{ width: 300, height: 300 }} onContextCreate={onContextCreate} />
  );
}


function onContextCreate(gl: ExpoWebGLRenderingContext) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(1, 1, 1, 1);

  // Step 1: Create Geometry for the square
  const squareGeometry = new Geometry(
    [
      -0.5, -0.5,
       0.5, -0.5,
       0.5,  0.5,
      -0.5,  0.5
    ],
    [
      0, 1, 2,
      0, 2, 3
    ]
  );

  // Step 2: Create Material for the square with a green color
  const greenMaterial = new Material(
    `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `,
    `
      void main() {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); // Green color
      }
    `
  );

  // Step 3: Create Mesh combining Geometry and Material
  const squareMesh = new Mesh(squareGeometry, greenMaterial);

  // Step 4: Set up the WebGL program and render the square
  const program = gl.createProgram();
  const vertShader = gl.createShader(gl.VERTEX_SHADER);
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertShader, squareMesh.material.vertexShader);
  gl.compileShader(vertShader);

  gl.shaderSource(fragShader, squareMesh.material.fragmentShader);
  gl.compileShader(fragShader);

  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  // Step 5: Create buffers for vertices and indices
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, squareMesh.geometry.vertices, gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, squareMesh.geometry.indices, gl.STATIC_DRAW);

  // Step 6: Set up the position attribute in the vertex shader
  const positionLocation = gl.getAttribLocation(program, 'position');
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLocation);

  // Step 7: Clear the screen and draw the square
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, squareMesh.geometry.indices.length, gl.UNSIGNED_SHORT, 0);

  gl.flush();
  gl.endFrameEXP();
}