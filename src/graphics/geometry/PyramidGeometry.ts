import { Geometry } from './Geometry';

export class PyramidGeometry extends Geometry {
  constructor(numberEdges: number = 4, height: number = 1, radius: number = 0.5) {
    const vertices: number[] = [];
    const indices: number[] = [];
    const angleStep = (2 * Math.PI) / numberEdges;

    // Base vertices (y = -height/2)
    for (let i = 0; i < numberEdges; i++) {
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      vertices.push(x, -height / 2, z);
    }

    // Apex vertex (y = +height/2)
    const apexIndex = vertices.length / 3;
    vertices.push(0, height / 2, 0);

    // Base center (used for triangle fan)
    const baseCenterIndex = vertices.length / 3;
    vertices.push(0, -height / 2, 0);

    // Invert winding order for base (CW from below)
    for (let i = 0; i < numberEdges; i++) {
      const next = (i + 1) % numberEdges;
      indices.push(baseCenterIndex, next, i);
    }

    // Invert winding order for sides (CW from inside = CCW from outside)
    for (let i = 0; i < numberEdges; i++) {
      const next = (i + 1) % numberEdges;
      indices.push(next, apexIndex, i);
    }

    super(vertices, indices);
  }
}
