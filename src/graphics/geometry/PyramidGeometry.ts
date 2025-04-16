// src/graphics/PyramidGeometry.ts
import { Geometry } from './Geometry';

export class PyramidGeometry extends Geometry {
  constructor() {
    const vertices = [
      // Base
      -0.5, -0.5, -0.5,  // 0
       0.5, -0.5, -0.5,  // 1
       0.5, -0.5,  0.5,  // 2
      -0.5, -0.5,  0.5,  // 3
      // Apex
       0.0,  0.5,  0.0   // 4
    ];

    const indices = [
      // Base face (quad)
      0, 1, 2, 0, 2, 3,
      // Side faces (triangles)
      0, 1, 4,
      1, 2, 4,
      2, 3, 4,
      3, 0, 4
    ];

    super(vertices, indices);
  }
}
