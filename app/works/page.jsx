"use client";

import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useRef } from "react";
import Carousel from "./_components/Carousel";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const sceneContainer = useRef();

  /**
   * !TODO mettre un etat avec zustand pour le click agrandir le container
   * !TODO Corriger le bug de la scrollbar avec un overflow hidden
   */

  return (
    <main className="flex items-center justify-center">
      <div
        ref={sceneContainer}
        className="w-1/2 h-1/2 border-4 border-red-500 overflow-hidden"
      >
        <Canvas>
          <Suspense fallback={null}>
            <Carousel />
          </Suspense>
        </Canvas>
      </div>
    </main>
  );
}
