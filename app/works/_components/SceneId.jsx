import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import ModelId from "./ModelId";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

/**
 * !TODO: Attention au double click qui ne lance pas l'aniamtion FLIP
 * !TODO : Peut etre charger une image a la fin de fliup aniamtion pour la transition ?
 */

export default function Scene({ flipRef, canvasCount, router }) {
  const canvaRef = Array(canvasCount)
    .fill()
    .map(() => useRef());

  const [isClicked, setIsClicked] = useState(null);

  const handleClick = (index) => {
    setIsClicked(index);
  };

  useGSAP(() => {
    if (isClicked === null) return;
    let state = Flip.getState(canvaRef[isClicked].current);
    let canvaContainer = canvaRef[isClicked].current;
    let flipContainer = flipRef.current;

    flipContainer.appendChild(canvaContainer);

    Flip.from(state, {
      duration: 1,
      ease: "power2.inOut",

      onComplete: () => {
        setTimeout(() => {
          router.push(`/works/${isClicked}`, undefined, { scroll: false });
        }, 1500);
      },
    });

    canvaRef.map((canva, index) => {
      if (isClicked !== index) {
        gsap.to(canva.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        });
      }
    });
  }, [isClicked, canvaRef, flipRef, router]);

  return (
    <>
      {canvaRef.map((ref, index) => (
        <Canvas key={index} onClick={() => handleClick(index)} ref={ref}>
          <ModelId isClicked={isClicked} />
        </Canvas>
      ))}
    </>
  );
}
