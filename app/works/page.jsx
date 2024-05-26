"use client";

import useStore from "@/stateStore/CanvaDimension";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useEffect, useRef } from "react";
import Carousel from "./_components/Carousel";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const sceneContainer = useRef();
  const { isClicked } = useStore();

  /**
   * !TODO mettre un etat avec zustand pour le click agrandir le container
   * !TODO Corriger le bug de la scrollbar avec un overflow hidden
   */

  useEffect(() => {
    gsap.to(sceneContainer.current, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    });
    if (isClicked === true) {
      gsap.to(sceneContainer.current, {
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(sceneContainer.current, {
        width: "30%",
        height: "30%",
        duration: 1,
        ease: "power3.inOut",
      });
    }

    console.log(isClicked);
  }, [isClicked]);

  return (
    <main className="">
      <div className="w-[100vw] h-screen border-4 border-red-500 overflow-hidden">
        <Canvas ref={sceneContainer}>
          <Suspense fallback={null}>
            <Carousel />
          </Suspense>
        </Canvas>
      </div>
    </main>
  );
}
