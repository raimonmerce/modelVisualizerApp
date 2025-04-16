// PhongMaterial.ts
import vertexShader from '../shaders/phong.vert';
import fragmentShader from '../shaders/phong.frag';
import { Material } from './Material';

export class PhongMaterial extends Material {
  color: [number, number, number];
  lightDirection: [number, number, number];
  lightColor: [number, number, number];
  shininess: number;

  constructor(
    color: [number, number, number],
    lightDirection: [number, number, number] = [0.0, 0.0, -1.0],
    lightColor: [number, number, number] = [1.0, 1.0, 1.0],
    shininess: number = 32.0
  ) {
    super(vertexShader, fragmentShader);
    this.color = color;
    this.lightDirection = lightDirection;
    this.lightColor = lightColor;
    this.shininess = shininess;
  }

  setUniforms(gl: WebGLRenderingContext, program: WebGLProgram): void {
    gl.uniform3fv(gl.getUniformLocation(program, 'uColor'), this.color);
    gl.uniform3fv(gl.getUniformLocation(program, 'uLightDirection'), this.lightDirection);
    gl.uniform3fv(gl.getUniformLocation(program, 'uLightColor'), this.lightColor);
    gl.uniform1f(gl.getUniformLocation(program, 'uShininess'), this.shininess);
  }
}
