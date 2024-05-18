import { Canvas } from "@react-three/fiber";
import Model from "./Model";

export default function Scene({ scrollProgress }) {
  return (
    <>
      <Canvas>
        <Model scrollProgress={scrollProgress} />
      </Canvas>
      <Canvas>
        <Model scrollProgress={scrollProgress} />
      </Canvas>
      <Canvas>
        <Model scrollProgress={scrollProgress} />
      </Canvas>
    </>
  );
}
