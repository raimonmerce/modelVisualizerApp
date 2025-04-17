// src/graphics/PrismGeometry.ts
import { Geometry } from './Geometry';

export class PrismGeometry extends Geometry {
  constructor(numberEdges: number = 4, height: number = 1) {
    const vertices: number[] = [];
    const indices: number[] = [];

    const radius = 0.5;
    const angleStep = (2 * Math.PI) / numberEdges;

    for (let i = 0; i < numberEdges; i++) {
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      vertices.push(x, -height/2, z);
      vertices.push(x, height/2, z);
    }

    const baseCenterIndex = vertices.length / 3;
    vertices.push(0, -height / 2, 0);
    const topCenterIndex = vertices.length / 3;
    vertices.push(0, height/2, 0);

    for (let i = 0; i < numberEdges; i++) {
      const next = (i + 1) % numberEdges;
      indices.push(baseCenterIndex, next * 2, i * 2); // flip order to keep CCW
    }

    // Top face (CCW when viewed from above)
    for (let i = 0; i < numberEdges; i++) {
      const next = (i + 1) % numberEdges;
      indices.push(topCenterIndex, i * 2 + 1, next * 2 + 1);
    }

    // Side faces (2 triangles per quad, ensure CCW)
    for (let i = 0; i < numberEdges; i++) {
      const next = (i + 1) % numberEdges;

      const v0 = i * 2;
      const v1 = next * 2;
      const v2 = next * 2 + 1;
      const v3 = i * 2 + 1;

      indices.push(v0, v1, v2); // lower triangle
      indices.push(v0, v2, v3); // upper triangle
    }

    super(vertices, indices);
  }
}
