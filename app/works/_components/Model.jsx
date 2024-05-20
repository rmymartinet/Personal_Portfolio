import { useAspect, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";
import { fragment, vertex } from "./Shader";

import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export default function Model({ isClicked }) {
  const timeSpeed = useRef(0.04); // Utilisation de useRef pour stocker timeSpeed
  const amplitudeValue = useRef(0.25);

  const image = useRef();
  const texture = useTexture("/images/car.jpg");
  const { width, height } = texture.image;
  const { viewport } = useThree();
  const scale = useAspect(width, height, 0.3);
  const { amplitude, waveLength } = useControls({
    amplitude: { value: amplitudeValue, min: 0, max: 2, step: 0.1 },
    waveLength: { value: 5, min: 0, max: 20, step: 0.5 },
  });

  const uniforms = useRef({
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
    uTexture: { value: texture },
    vUvScale: { value: new THREE.Vector2(0, 0) },
  });

  const handleClick = () => {
    const scaleMultiplier = !isClicked ? 2 : 1;
    gsap.to(image.current.scale, {
      x: scale[0] * scaleMultiplier,
      y: scale[1] * scaleMultiplier,
      ease: "power2.inOut",
      duration: 1,
    });

    gsap.to(timeSpeed, {
      current: 0.2, // Accélérer temporairement
      duration: 1,
      onComplete: () => {
        gsap.to(timeSpeed, {
          current: 0.04, // Revenir à la vitesse normale
          duration: 1,
        });
      },
    });

    gsap.to(amplitudeValue, {
      current: 1, // Accélérer temporairement
      duration: 1,
      onComplete: () => {
        gsap.to(amplitudeValue, {
          current: 0.25, // Revenir à la vitesse normale
          duration: 1,
        });
      },
    });
  };

  useFrame(() => {
    const scaleX = image.current.scale.x;
    const scaleY = image.current.scale.y;

    // Adjust texture to new scale
    const scaleRatio = scaleX / scaleY;
    const aspectRatio = width / height;
    image.current.material.uniforms.vUvScale.value.set(
      1,
      aspectRatio / scaleRatio
    );

    image.current.material.uniforms.uTime.value += timeSpeed.current;
    image.current.material.uniforms.uAmplitude.value = amplitudeValue.current;
    image.current.material.uniforms.uWaveLength.value = waveLength;
  });

  return (
    <mesh onClick={handleClick} ref={image} scale={scale}>
      <planeGeometry args={[1, 1, 15, 15]} />
      <shaderMaterial
        wireframe={false}
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}
