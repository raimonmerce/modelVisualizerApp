import { Geometry } from './geometry/Geometry';
import { Material } from './material/Material';

export class Mesh {
  geometry: Geometry;
  material: Material;

  // Transformation properties
  position: [number, number, number];
  rotation: [number, number, number]; // Typically Euler angles in radians (pitch, yaw, roll)
  scale: [number, number, number];

  constructor(
    geometry: Geometry,
    material: Material,
    position: [number, number, number] = [0, 0, 0],
    rotation: [number, number, number] = [0, 0, 0],
    scale: [number, number, number] = [1, 1, 1]
  ) {
    this.geometry = geometry;
    this.material = material;
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
  }
}