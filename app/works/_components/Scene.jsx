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

export default function Scene({ flipRef }) {
  const canvaRef = [useRef(), useRef(), useRef()];
  const [isClicked, setIsClicked] = useState(null);

  const handleClick = (index) => {
    setIsClicked(index);

    let state = Flip.getState(canvaRef[index].current);
    let canvaContainer = canvaRef[index].current;
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
      <Canvas onClick={() => handleClick(0)} ref={canvaRef[0]}>
        <Model isClicked={isClicked} />
      </Canvas>
      <Canvas onClick={() => handleClick(1)} ref={canvaRef[1]}>
        <Model isClicked={isClicked} />
      </Canvas>
      <Canvas onClick={() => handleClick(2)} ref={canvaRef[2]}>
        <Model isClicked={isClicked} />
      </Canvas>
    </>
  );
}
