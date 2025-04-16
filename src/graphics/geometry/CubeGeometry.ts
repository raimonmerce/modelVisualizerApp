// src/graphics/CubeGeometry.ts
import { Geometry } from './Geometry';

export class CubeGeometry extends Geometry {
  constructor() {
    const vertices = [
      // Front face
      -0.5, -0.5,  0.5,  // 0
       0.5, -0.5,  0.5,  // 1
       0.5,  0.5,  0.5,  // 2
      -0.5,  0.5,  0.5,  // 3
      // Back face
      -0.5, -0.5, -0.5,  // 4
       0.5, -0.5, -0.5,  // 5
       0.5,  0.5, -0.5,  // 6
      -0.5,  0.5, -0.5,  // 7
      // Top face
      -0.5,  0.5,  0.5,  // 8
       0.5,  0.5,  0.5,  // 9
       0.5,  0.5, -0.5,  // 10
      -0.5,  0.5, -0.5,  // 11
      // Bottom face
      -0.5, -0.5,  0.5,  // 12
       0.5, -0.5,  0.5,  // 13
       0.5, -0.5, -0.5,  // 14
      -0.5, -0.5, -0.5,  // 15
      // Right face
       0.5, -0.5,  0.5,  // 16
       0.5,  0.5,  0.5,  // 17
       0.5,  0.5, -0.5,  // 18
       0.5, -0.5, -0.5,  // 19
      // Left face
      -0.5, -0.5,  0.5,  // 20
      -0.5,  0.5,  0.5,  // 21
      -0.5,  0.5, -0.5,  // 22
      -0.5, -0.5, -0.5,  // 23
    ];

    const indices = [
      0, 1, 2, 0, 2, 3,   // front face
      4, 5, 6, 4, 6, 7,   // back face
      8, 9, 10, 8, 10, 11, // top face
      12, 13, 14, 12, 14, 15, // bottom face
      16, 17, 18, 16, 18, 19, // right face
      20, 21, 22, 20, 22, 23  // left face
    ];

    super(vertices, indices);
  }
}
