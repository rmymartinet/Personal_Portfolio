import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import Model from "./Model";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

/**
 * !TODO Réaliser l'animation de flip il faut qu'il soit toujours centrer dans le viewport
 */

export default function Scene({ scrollContainer }) {
  const flipRef = useRef();
  const canvaRef = useRef();

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);

    let state = Flip.getState(canvaRef.current);
    let canvaContainer = canvaRef.current;
    let flipContainer = flipRef.current;

    if (!isClicked) {
      flipContainer.appendChild(canvaContainer);

      Flip.from(state, {
        duration: 1,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <>
      <div
        ref={flipRef}
        className="
        fixed top-1/2 right-1/2 
        transform translate-x-1/2 translate-y-1/2
        w-1/4 h-1/4 border border-red-500  flex items-center justify-center
        "
      ></div>
      <Canvas onClick={handleClick} ref={canvaRef}>
        <Model />
      </Canvas>
      <Canvas>
        <Model />
      </Canvas>
      <Canvas>
        <Model />
      </Canvas>
    </>
  );
}
