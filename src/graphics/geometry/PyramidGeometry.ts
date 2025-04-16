// src/graphics/PyramidGeometry.ts
import { Geometry } from './Geometry';

export class PyramidGeometry extends Geometry {
  constructor(numberEdges: number = 4, height: number = 1) {
    const vertices: number[] = [];
    const indices: number[] = [];

    const radius = 0.5; // Base polygon radius
    const angleStep = (2 * Math.PI) / numberEdges;

    // Base vertices
    for (let i = 0; i < numberEdges; i++) {
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      vertices.push(x, 0, z); // y = 0 (base)
    }

    // Apex vertex
    const apexIndex = vertices.length / 3;
    vertices.push(0, height, 0); // Apex

    // Base center (for triangulation if needed)
    const baseCenterIndex = vertices.length / 3;
    vertices.push(0, 0, 0); // Optional: base center (can be used for triangle fan base)

    // Base face triangulation (triangle fan)
    for (let i = 0; i < numberEdges; i++) {
      const next = (i + 1) % numberEdges;
      indices.push(baseCenterIndex, next, i);
    }

    // Side faces (each is a triangle)
    for (let i = 0; i < numberEdges; i++) {
      const next = (i + 1) % numberEdges;
      indices.push(i, next, apexIndex);
    }

    super(vertices, indices);
  }
}
