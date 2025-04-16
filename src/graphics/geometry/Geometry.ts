export class Geometry {
    vertices: Float32Array;
    indices?: Uint16Array;
  
    constructor(vertices: number[], indices?: number[]) {
      this.vertices = new Float32Array(vertices);
      if (indices) {
        this.indices = new Uint16Array(indices);
      }
    }
  }