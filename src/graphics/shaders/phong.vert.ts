const vertexShader = `
    attribute vec3 position;
    attribute vec3 normal;

    uniform mat4 uTransformMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat3 uNormalMatrix;

    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
        vec4 worldPosition = uTransformMatrix * vec4(position, 1.0);
        vPosition = worldPosition.xyz;
        vNormal = uNormalMatrix * normal;

        gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;
    }
`;

export default vertexShader;
