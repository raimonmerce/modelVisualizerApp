export abstract class Material {
  vertexShader: string;
  fragmentShader: string;

  constructor(vertexShader: string, fragmentShader: string) {
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
  }

  abstract setUniforms(gl: WebGLRenderingContext, program: WebGLProgram): void;
}