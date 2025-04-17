const fragmentShader = `
    precision mediump float;

    uniform vec3 uColor;
    uniform vec3 uLightDirection;
    uniform vec3 uLightColor;
    uniform float uShininess;
    uniform vec3 uCameraPosition;

    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
        vec3 norm = normalize(vNormal);
        vec3 lightDir = normalize(-uLightDirection); // Direction *to* light
        vec3 viewDir = normalize(- vPosition); // assuming camera at origin
        vec3 reflectDir = reflect(-lightDir, norm);

        float diff = max(dot(norm, lightDir), 0.0);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), uShininess);

        vec3 ambient = 0.4 * uColor;
        vec3 diffuse = diff * uColor * uLightColor;
        vec3 specular = spec * uLightColor;

        vec3 finalColor = ambient + diffuse + specular;
        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

export default fragmentShader;
