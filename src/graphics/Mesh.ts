import { Geometry } from './geometry/Geometry';
import { Material } from './Material';

export class Mesh {
  geometry: Geometry;
  material: Material;

  constructor(geometry: Geometry, material: Material) {
    this.geometry = geometry;
    this.material = material;
  }
}
