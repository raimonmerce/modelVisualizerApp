import { Material } from './Material';

export class StandardMaterial extends Material {
  constructor(color: [number, number, number]) {
    const [r, g, b] = color;
    const vertexShader = `...`;
    const fragmentShader = `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(${r}, ${g}, ${b}, 1.0);
      }
    `;
    super(vertexShader, fragmentShader);
  }
}