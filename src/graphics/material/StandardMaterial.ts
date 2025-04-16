import { Material } from './Material';
import vertexShader from '../shaders/standard.vert';
import fragmentShader from '../shaders/standard.frag';

export class StandardMaterial extends Material {
  constructor(color: [number, number, number]) {
    super(vertexShader, fragmentShader, color);
  }
}