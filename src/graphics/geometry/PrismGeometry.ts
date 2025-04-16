// src/graphics/PrismGeometry.ts
import { Geometry } from './Geometry';

export class PrismGeometry extends Geometry {
  constructor() {
    const vertices = [
      // Base
      -0.5, -0.5, -0.5,  // 0
       0.5, -0.5, -0.5,  // 1
       0.5, -0.5,  0.5,  // 2
      -0.5, -0.5,  0.5,  // 3
      // Top
      -0.5,  0.5, -0.5,  // 4
       0.5,  0.5, -0.5,  // 5
       0.5,  0.5,  0.5,  // 6
      -0.5,  0.5,  0.5   // 7
    ];

    const indices = [
      // Base
      0, 1, 2, 0, 2, 3,
      // Top
      4, 5, 6, 4, 6, 7,
      // Sides
      0, 1, 5, 0, 5, 4,
      1, 2, 6, 1, 6, 5,
      2, 3, 7, 2, 7, 6,
      3, 0, 4, 3, 4, 7
    ];

    super(vertices, indices);
  }
}
