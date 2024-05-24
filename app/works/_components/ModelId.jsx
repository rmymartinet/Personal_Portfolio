import { useAspect, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";
import { fragment, vertex } from "./Shader";

import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export default function ModelId() {
  const timeSpeed = useRef(0);
  const amplitudeValue = useRef(0);
  const waveLengthValue = useRef(0);

  const image = useRef();
  const texture = useTexture("/images/paysage.jpg");
  const { viewport } = useThree();
  const { width, height } = texture.image;
  const [scaleX, scaleY] = useAspect(viewport.width, viewport.height);

  const { amplitude, waveLength } = useControls({
    amplitude: { value: amplitudeValue.current, min: 0, max: 2, step: 0.1 },
    waveLength: { value: waveLengthValue.current, min: 0, max: 20, step: 0.5 },
  });

  const uniforms = useRef({
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
    uTexture: { value: texture },
    vUvScale: { value: new THREE.Vector2(0, 0) },
  });

  const handleClick = () => {
    const targetScaleX =
      image.current.scale.x === scaleX ? viewport.width : scaleX;
    const targetScaleY =
      image.current.scale.y === scaleY ? viewport.height : scaleY;
    gsap.to(image.current.scale, {
      x: targetScaleX,
      y: targetScaleY,
      ease: "power2.inOut",
      duration: 2,
    });
    gsap.to(timeSpeed, {
      current: 0.2, // Accélérer temporairement
      duration: 1,
      onComplete: () => {
        gsap.to(timeSpeed, {
          current: 0, // Revenir à la vitesse normale
          duration: 1,
        });
      },
    });

    gsap.to(amplitudeValue, {
      current: 1, // Accélérer temporairement
      duration: 1,
      onComplete: () => {
        gsap.to(amplitudeValue, {
          current: 0, // Revenir à la vitesse normale
          duration: 1,
        });
      },
    });

    gsap.to(waveLengthValue, {
      current: 5, // Accélérer temporairement
      duration: 1,
      onComplete: () => {
        gsap.to(amplitudeValue, {
          current: 0, // Revenir à la vitesse normale
          duration: 1,
        });
      },
    });
  };

  useFrame(() => {
    // Adjust texture to new scale
    const scaleX = image.current.scale.x;
    const scaleY = image.current.scale.y;

    const scaleRatio = scaleX / scaleY;
    const aspectRatio = width / height;

    // Scale texture inside shader
    image.current.material.uniforms.vUvScale.value.set(
      1,
      aspectRatio / scaleRatio
    );

    // Animate wave based on amplitude value
    image.current.material.uniforms.uTime.value += timeSpeed.current;
    image.current.material.uniforms.uAmplitude.value = amplitudeValue.current;
    image.current.material.uniforms.uWaveLength.value = waveLengthValue.current;
  });

  return (
    <mesh onClick={handleClick} ref={image} scale={[scaleX, scaleY, 1]}>
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
