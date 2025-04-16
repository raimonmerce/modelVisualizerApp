// src/graphics/SphereGeometry.ts
import { Geometry } from './Geometry';

export class SphereGeometry extends Geometry {
  constructor(
    latitudeBands: number = 30,
    longitudeBands: number = 30,
    radius: number = 0.5
  ) {
    const vertices: number[] = [];
    const indices: number[] = [];

    // Generate the vertices
    for (let latNumber = 0; latNumber <= latitudeBands; latNumber++) {
      const theta = latNumber * Math.PI / latitudeBands;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let longNumber = 0; longNumber <= longitudeBands; longNumber++) {
        const phi = longNumber * 2 * Math.PI / longitudeBands;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        const x = radius * cosPhi * sinTheta;
        const y = radius * cosTheta;
        const z = radius * sinPhi * sinTheta;

        vertices.push(x, y, z);
      }
    }

    // Generate the indices
    for (let latNumber = 0; latNumber < latitudeBands; latNumber++) {
      for (let longNumber = 0; longNumber < longitudeBands; longNumber++) {
        const first = (latNumber * (longitudeBands + 1)) + longNumber;
        const second = first + longitudeBands + 1;

        indices.push(first, second, first + 1);
        indices.push(second, second + 1, first + 1);
      }
    }

    super(vertices, indices);
  }
}
