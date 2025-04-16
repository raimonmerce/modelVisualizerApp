export class Material {
    vertexShader: string;
    fragmentShader: string;
    color: [number, number, number];
  
    constructor(vertexShader: string, fragmentShader: string, color: [number, number, number]) {
      this.vertexShader = vertexShader;
      this.fragmentShader = fragmentShader;
      this.color = color;
    }
  }
  