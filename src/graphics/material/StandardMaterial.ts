// StandardMaterial.ts
import vertexShader from '../shaders/standard.vert';
import fragmentShader from '../shaders/standard.frag';
import { Material } from './Material';

export class StandardMaterial extends Material {
  color: [number, number, number];

  constructor(color: [number, number, number]) {
    super(vertexShader, fragmentShader);
    this.color = color;
  }

  setUniforms(gl: WebGLRenderingContext, program: WebGLProgram): void {
    const colorLoc = gl.getUniformLocation(program, 'uColor');
    gl.uniform3fv(colorLoc, this.color);
  }
}
