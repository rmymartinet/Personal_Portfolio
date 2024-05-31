"use client";

import images from "@/app/data/data";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useNavigationStore } from "@/stateStore/Navigation";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useEffect, useRef, useState } from "react";
import Carousel from "./_components/Carousel";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const sceneContainer = useRef();
  const { isClicked } = useBackNavigationStore();
  const [showImage, setShowImage] = useState(false);
  const { isClickedIndex } = useNavigationStore();

  /**
   * !TODO Corriger le bug de la scrollbar avec un overflow hidden
   */

  useEffect(() => {
    let timeoutId;

    if (isClicked) {
      setShowImage(true);
      timeoutId = setTimeout(() => {
        setShowImage(false);
      }, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [isClicked]);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {showImage && (
        <img
          className="absolute w-full h-full object-cover"
          src={images[isClickedIndex].image}
          alt=""
          rel="preload"
          as="image"
        />
      )}
      <div className="w-full h-full">
        <Canvas ref={sceneContainer}>
          <Suspense fallback={null}>
            <Carousel />
          </Suspense>
        </Canvas>
      </div>
    </main>
  );
}
