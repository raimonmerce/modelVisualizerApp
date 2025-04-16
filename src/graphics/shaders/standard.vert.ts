const vertexShader = `
    attribute vec3 position;

    uniform mat4 uTransformMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
    gl_Position = uProjectionMatrix * uViewMatrix * uTransformMatrix * vec4(position, 1.0);
    }
`;

export default vertexShader;
