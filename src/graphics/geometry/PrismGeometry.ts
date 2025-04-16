// src/graphics/PrismGeometry.ts
import { Geometry } from './Geometry';

export class PrismGeometry extends Geometry {
  constructor(numberEdges: number = 4, height: number = 1) {
    const vertices: number[] = [];
    const indices: number[] = [];

    const radius = 0.5; // Radius of the base polygon
    const angleStep = (2 * Math.PI) / numberEdges;

    // Generate base and top vertices
    for (let i = 0; i < numberEdges; i++) {
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      // Base vertex (y = 0)
      vertices.push(x, 0, z);
      // Top vertex (y = height)
      vertices.push(x, height, z);
    }

    // Center points for base and top
    const baseCenterIndex = vertices.length / 3;
    vertices.push(0, 0, 0); // Base center
    const topCenterIndex = vertices.length / 3;
    vertices.push(0, height, 0); // Top center

    // Indices for base and top faces (triangle fan)
    for (let i = 0; i < numberEdges; i++) {
      const next = (i + 1) % numberEdges;
      // Base triangle
      indices.push(baseCenterIndex, i * 2, next * 2);
      // Top triangle
      indices.push(topCenterIndex, next * 2 + 1, i * 2 + 1);
    }

    // Side faces (two triangles per rectangular side)
    for (let i = 0; i < numberEdges; i++) {
      const next = (i + 1) % numberEdges;
      const v0 = i * 2;
      const v1 = next * 2;
      const v2 = v1 + 1;
      const v3 = v0 + 1;

      indices.push(v0, v1, v2);
      indices.push(v0, v2, v3);
    }

    super(vertices, indices);
  }
}
