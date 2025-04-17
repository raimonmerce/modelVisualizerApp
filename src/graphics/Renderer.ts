// Renderer.ts
import { Mesh } from './Mesh';
import {
    createProgramFromMaterial,
    createLookAtMatrix,
    createPerspectiveMatrix,
    createTranslationMatrix,
    createRotationMatrix,
    createScaleMatrix,
    multiplyMatrices,
    mat3normalFromMat4
} from '../utils/graphicUtils';

export class Renderer {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram | null = null;
  private mesh: Mesh | null = null;
  private running = false;

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl;
  }

  setMesh(mesh: Mesh) {
    this.mesh = mesh;
  }

  start() {
    this.running = true;
    const renderLoop = () => {
      if (!this.running || !this.mesh) return;

      this.mesh.rotation[1] += 0.01;

      this.render(this.mesh);
      requestAnimationFrame(renderLoop);
    };

    renderLoop();
  }

  stop() {
    this.running = false;
  }

  render(mesh: Mesh): void {
    const { gl } = this;

    if (!this.program) {
      this.program = createProgramFromMaterial(gl, mesh.material);
    }
    gl.useProgram(this.program);

    // Buffers
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.geometry.vertices, gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.geometry.indices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(this.program, 'position');
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.FRONT); // Cull back-facing triangles
    gl.frontFace(gl.CCW);

    // Matrices
    const fov = Math.PI / 4;
    const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    const cameraPos: [number, number, number] = [0, 0, 4];

    const transformMatrix = multiplyMatrices(
      createTranslationMatrix(...mesh.position),
      multiplyMatrices(
        createRotationMatrix(...mesh.rotation),
        createScaleMatrix(...mesh.scale)
      )
    );

    const viewMatrix = createLookAtMatrix(cameraPos, [0, 0, 0], [0, 1, 0]);
    const projMatrix = createPerspectiveMatrix(fov, aspect, 0.1, 100);

    gl.uniformMatrix4fv(gl.getUniformLocation(this.program, 'uTransformMatrix'), false, new Float32Array(transformMatrix));
    gl.uniformMatrix4fv(gl.getUniformLocation(this.program, 'uViewMatrix'), false, new Float32Array(viewMatrix));
    gl.uniformMatrix4fv(gl.getUniformLocation(this.program, 'uProjectionMatrix'), false, new Float32Array(projMatrix));

    const modelMatrix = transformMatrix;
    const normalMatrix = mat3normalFromMat4(modelMatrix); // You need to implement this

    gl.uniformMatrix3fv(
      gl.getUniformLocation(this.program, 'uNormalMatrix'),
      false,
      new Float32Array(normalMatrix)
    );
    gl.uniformMatrix3fv(
      gl.getUniformLocation(this.program, 'uCameraPosition'),
      false,
      new Float32Array(cameraPos)
    );
    // Material-specific uniforms
    mesh.material.setUniforms(gl, this.program);

    // Draw
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, mesh.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.flush();
    gl.endFrameEXP();
  }
}
