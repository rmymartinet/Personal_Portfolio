"use client";

import useStore from "@/stateStore/CanvaDimension";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useRef } from "react";
import Carousel from "./_components/Carousel";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const sceneContainer = useRef();
  const { isClicked } = useStore();

  /**
   * !TODO mettre un etat avec zustand pour le click agrandir le container
   * !TODO Corriger le bug de la scrollbar avec un overflow hidden
   */

  // useEffect(() => {
  //   gsap.to(sceneContainer.current, {
  //     position: "fixed",
  //     top: "50%",
  //     left: "50%",
  //     transform: "translate(-50%, -50%)",
  //   });
  //   gsap.to(
  //     sceneContainer.current,
  //     {
  //       clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
  //       duration: 2,
  //       ease: "power4.inOut",
  //       onComplete: () => {
  //         isAnimating = false;
  //       },
  //     },
  //     "<"
  //   );
  //   if (isClicked === true) {
  //     gsap.to(sceneContainer.current, {
  //       width: "100%",
  //       height: "100%",
  //       duration: 1,
  //       ease: "power3.inOut",
  //     });
  //   } else {
  //     gsap.to(sceneContainer.current, {
  //       width: "30%",
  //       height: "30%",
  //       duration: 1,
  //       ease: "power3.inOut",
  //     });
  //   }

  //   console.log(isClicked);
  // }, [isClicked]);

  return (
    <main className="">
      <div className="w-[100vw] h-screen overflow-hidden">
        <Canvas ref={sceneContainer}>
          <Suspense fallback={null}>
            <Carousel />
          </Suspense>
        </Canvas>
      </div>
    </main>
  );
}
