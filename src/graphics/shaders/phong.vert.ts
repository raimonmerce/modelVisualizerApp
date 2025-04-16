const vertexShader = `
    attribute vec3 position;
    attribute vec3 normal;

    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
    vec4 worldPosition = uModelMatrix * vec4(position, 1.0);
    vPosition = worldPosition.xyz;
    vNormal = mat3(uModelMatrix) * normal;

    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;
    }
`;

export default vertexShader;
