import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Vertex shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader for advection
const advectionFragmentShader = `
  uniform sampler2D tPrev;
  uniform sampler2D velocity;
  uniform float dt;
  varying vec2 vUv;

  void main() {
    vec2 vel = texture2D(velocity, vUv).xy;
    vec2 prevUv = vUv - vel * dt;
    gl_FragColor = texture2D(tPrev, prevUv);
  }
`;

// Fragment shader for adding force
const forceFragmentShader = `
  uniform sampler2D tPrev;
  uniform vec2 mousePos;
  uniform vec2 mouseVel;
  uniform float radius;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 diff = uv - mousePos;
    float dist = length(diff);
    float force = 1.0 - smoothstep(0.0, radius, dist);
    vec2 vel = texture2D(tPrev, uv).xy + mouseVel * force;
    gl_FragColor = vec4(vel, 0.0, 1.0);
  }
`;

// Fragment shader for screen
const screenFragmentShader = `
  uniform sampler2D tFluid;
  varying vec2 vUv;

  void main() {
    vec4 color = texture2D(tFluid, vUv);
    gl_FragColor = vec4(color.rgb * 0.5 + 0.5, 1.0); // Visualize velocity
  }
`;

const FluidCursor: React.FC = () => {
  const { gl, scene, camera, size, mouse } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);

  const renderTargets = useRef([
    new THREE.WebGLRenderTarget(size.width, size.height),
    new THREE.WebGLRenderTarget(size.width, size.height),
  ]);

  const advectionMaterial = useRef(new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: advectionFragmentShader,
    uniforms: {
      tPrev: { value: null },
      velocity: { value: null },
      dt: { value: 0.016 },
    },
  }));

  const forceMaterial = useRef(new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: forceFragmentShader,
    uniforms: {
      tPrev: { value: null },
      mousePos: { value: new THREE.Vector2() },
      mouseVel: { value: new THREE.Vector2() },
      radius: { value: 0.05 },
    },
  }));

  const screenMaterial = useRef(new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: screenFragmentShader,
    uniforms: {
      tFluid: { value: null },
    },
  }));

  const prevMouse = useRef(new THREE.Vector2());

  useFrame(() => {
    if (!meshRef.current) return;

    const current = renderTargets.current[0];
    const previous = renderTargets.current[1];

    // Update mouse pos (normalized -1 to 1)
    const mousePos = new THREE.Vector2(mouse.x, mouse.y);
    const mouseVel = mousePos.clone().sub(prevMouse.current);

    // Add force
    meshRef.current.material = forceMaterial.current;
    forceMaterial.current.uniforms.tPrev.value = previous.texture;
    forceMaterial.current.uniforms.mousePos.value.copy(mousePos);
    forceMaterial.current.uniforms.mouseVel.value.copy(mouseVel);

    gl.setRenderTarget(current);
    gl.render(scene, camera);

    // Advection
    meshRef.current.material = advectionMaterial.current;
    advectionMaterial.current.uniforms.tPrev.value = current.texture;
    advectionMaterial.current.uniforms.velocity.value = current.texture;

    gl.setRenderTarget(previous);
    gl.render(scene, camera);

    // Swap
    [renderTargets.current[0], renderTargets.current[1]] = [renderTargets.current[1], renderTargets.current[0]];

    // Render to screen
    meshRef.current.material = screenMaterial.current;
    screenMaterial.current.uniforms.tFluid.value = renderTargets.current[0].texture;
    gl.setRenderTarget(null);
    gl.render(scene, camera);

    prevMouse.current.copy(mousePos);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
};

export default FluidCursor;