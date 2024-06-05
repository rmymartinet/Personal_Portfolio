"use client";

import images from "@/app/data/data";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useNavigationStore } from "@/stateStore/Navigation";
import { useIsHoverStore } from "@/stateStore/isHover";
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
  const { isHover } = useIsHoverStore();
  const infosRef = useRef();

  useEffect(() => {
    if (isHover) {
      gsap.to(infosRef.current, {
        top: "74.5%",
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(infosRef.current, {
        top: "72.5%",
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [isHover]);

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
        <div
          ref={infosRef}
          className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[400px] pl-6 pt-2 pb-2 mt-7 space-y-1"
          style={{ backgroundColor: "#FCFCFC" }}
        >
          <p className="font-semibold">Margritt</p>
          <div
            className="flex flex-wrap text-sm gap-2"
            style={{ color: "#969696" }}
          >
            <p>Year : 2024</p>
            <p>|</p>
            <p>Role : FullStack dev & Motion</p>
            <p>Type : Portfolio</p>
            <p>|</p>
            <p>Client : Margritt</p>
          </div>
        </div>
      </div>
    </main>
  );
}
