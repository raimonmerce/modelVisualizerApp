// src/graphics/CubeGeometry.ts
import { Geometry } from './Geometry';

export class CubeGeometry extends Geometry {
  constructor(width: number = 1, height: number = 1, depth: number = 1) {
    const hw = width / 2;
    const hh = height / 2;
    const hd = depth / 2;

    const vertices = [
      // Front face
      -hw, -hh,  hd,  // 0
       hw, -hh,  hd,  // 1
       hw,  hh,  hd,  // 2
      -hw,  hh,  hd,  // 3
      // Back face
      -hw, -hh, -hd,  // 4
       hw, -hh, -hd,  // 5
       hw,  hh, -hd,  // 6
      -hw,  hh, -hd,  // 7
      // Top face
      -hw,  hh,  hd,  // 8
       hw,  hh,  hd,  // 9
       hw,  hh, -hd,  // 10
      -hw,  hh, -hd,  // 11
      // Bottom face
      -hw, -hh,  hd,  // 12
       hw, -hh,  hd,  // 13
       hw, -hh, -hd,  // 14
      -hw, -hh, -hd,  // 15
      // Right face
       hw, -hh,  hd,  // 16
       hw,  hh,  hd,  // 17
       hw,  hh, -hd,  // 18
       hw, -hh, -hd,  // 19
      // Left face
      -hw, -hh,  hd,  // 20
      -hw,  hh,  hd,  // 21
      -hw,  hh, -hd,  // 22
      -hw, -hh, -hd   // 23
    ];

    const indices = [
      0, 2, 1,  0, 3, 2, // Front
      4, 5, 6,  4, 6, 7, // Back
      8, 10, 9,  8, 11, 10, //Top V
      12, 13, 14,  12, 14, 15,  // Bottom V
      16, 17, 18,  16, 18, 19, // Right
      20, 22, 21,  20, 23, 22  // Left
    ];

    super(vertices, indices);
  }
}
