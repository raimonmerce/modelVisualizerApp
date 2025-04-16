// graphicUtils.ts
import { Material } from '../graphics/material/Material';

// utils/createProgram.ts
export function createProgramFromMaterial(
  gl: WebGLRenderingContext,
  material: Material
): WebGLProgram {
  const program = gl.createProgram();
  if (!program) throw new Error('Unable to create program');

  const vertShader = compileShader(gl, gl.VERTEX_SHADER, material.vertexShader);
  const fragShader = compileShader(gl, gl.FRAGMENT_SHADER, material.fragmentShader);

  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program failed to link:', gl.getProgramInfoLog(program));
    throw new Error('Program link error');
  }

  return program;
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    throw new Error('Shader compile error');
  }
  return shader;
}


export function createPerspectiveMatrix(fov: number, aspect: number, near: number, far: number): number[] {
    const f = 1.0 / Math.tan(fov / 2);
    const rangeInv = 1 / (near - far);
  
    return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, -(far + near) * rangeInv, -1,
        0, 0, -2 * far * near * rangeInv, 0
    ];
}
  
export function createTranslationMatrix(tx: number, ty: number, tz: number): number[] {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    tx, ty, tz, 1
  ];
}
  
export function createRotationYMatrix(angle: number): number[] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    c, 0, s, 0,
    0, 1, 0, 0,
    -s, 0, c, 0,
    0, 0, 0, 1
  ];
}
  
/** Multiplies two 4x4 matrices (a * b). Both matrices are 16-element arrays in row-major order. */
export function multiplyMatrices(a: number[], b: number[]): number[] {
  const result = new Array(16).fill(0);
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      for (let i = 0; i < 4; i++) {
        result[row * 4 + col] += a[row * 4 + i] * b[i * 4 + col];
      }
    }
  }
  return result;
}
  
/**
 * Creates a LookAt matrix.
 *
 * @param eye Camera position [x, y, z]
 * @param target Point to look at [x, y, z]
 * @param up Up vector [x, y, z] (typically [0, 1, 0])
 * @returns A 4x4 LookAt matrix in row-major order.
 */
export function createLookAtMatrix(eye: [number, number, number], target: [number, number, number], up: [number, number, number]): number[] {
  // Compute forward vector (z axis)
  const zAxis = normalizeVector([
    eye[0] - target[0],
    eye[1] - target[1],
    eye[2] - target[2]
  ]);
  
  // Compute right vector (x axis) = normalize(cross(up, zAxis))
  const xAxis = normalizeVector(crossProduct(up, zAxis));
  
  // Compute true up vector (y axis) = cross(zAxis, xAxis)
  const yAxis = crossProduct(zAxis, xAxis);

  // Create translation components (dot product of negative axes with eye)
  const tx = -dotProduct(xAxis, eye);
  const ty = -dotProduct(yAxis, eye);
  const tz = -dotProduct(zAxis, eye);

  // Row-major lookAt matrix
  return [
      xAxis[0], yAxis[0], zAxis[0], 0,
      xAxis[1], yAxis[1], zAxis[1], 0,
      xAxis[2], yAxis[2], zAxis[2], 0,
      tx,       ty,       tz,       1
  ];  
}

/**
 * Creates a rotation matrix from Euler angles.
 * The rotation is applied in the order: first around X, then Y, then Z.
 *
 * @param rx Rotation angle around the X-axis in radians.
 * @param ry Rotation angle around the Y-axis in radians.
 * @param rz Rotation angle around the Z-axis in radians.
 * @returns A 4x4 rotation matrix in row-major order.
 */
export function createRotationMatrix(rx: number, ry: number, rz: number): number[] {
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const cz = Math.cos(rz);
  const sz = Math.sin(rz);

  // Rotation about X-axis
  const rotX = [
    1,  0,   0,  0,
    0,  cx, -sx, 0,
    0,  sx,  cx, 0,
    0,  0,   0,  1
  ];

  // Rotation about Y-axis
  const rotY = [
    cy,  0, sy, 0,
      0,  1,  0, 0,
    -sy,  0, cy, 0,
      0,  0,  0, 1
  ];

  // Rotation about Z-axis
  const rotZ = [
    cz, -sz, 0, 0,
    sz,  cz, 0, 0,
      0,   0, 1, 0,
      0,   0, 0, 1
  ];

  // Combine the rotations.
  // Note: The multiplication order matters. Here we first rotate about X, then Y, then Z:
  const rotationXY = multiplyMatrices(rotX, rotY);
  return multiplyMatrices(rotationXY, rotZ);
}

/**
 * Creates a scale matrix.
 *
 * @param sx Scale factor along the X axis.
 * @param sy Scale factor along the Y axis.
 * @param sz Scale factor along the Z axis.
 * @returns A 4x4 scale matrix in row-major order.
 */
export function createScaleMatrix(sx: number, sy: number, sz: number): number[] {
  return [
    sx, 0,  0,  0,
    0,  sy, 0,  0,
    0,  0,  sz, 0,
    0,  0,  0,  1
  ];
}

// --- Helper functions for vector math ---

function dotProduct(a: [number, number, number], b: [number, number, number]): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function crossProduct(a: [number, number, number], b: [number, number, number]): [number, number, number] {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function normalizeVector(v: [number, number, number]): [number, number, number] {
  const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  if (length === 0) {
    return [0, 0, 0];
  }
  return [v[0] / length, v[1] / length, v[2] / length];
}
  