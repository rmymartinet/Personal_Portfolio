"use client";

import images from "@/app/data/data";
import Background from "@/components/Background";
import InfosWork from "@/components/InfosWork";
import Nav from "@/components/Nav";
import { useNavigationStore } from "@/stateStore/Navigation";
import { useIsHoverStore } from "@/stateStore/isHover";
import { useWorkNavigation } from "@/stateStore/useWorkNavigation";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import Carousel from "./_components/Carousel";

gsap.registerPlugin(ScrollTrigger);

/**
 * !TODO : Add animation to number slide in relation with de carousel
 * !TODO Créer des composants pour éviter la répétition de code
 */

export default function Works() {
  const { isClickedIndex } = useNavigationStore();
  const { isHover } = useIsHoverStore();
  const [showImage, setShowImage] = useState(false);

  const sceneContainer = useRef();
  const slideIndexRef = useRef();
  const infosRef = useRef();

  const isClickedIndexIsNull = isClickedIndex === null ? 0 : isClickedIndex;
  const [slideIndex, setSlideIndex] = useState(isClickedIndexIsNull);
  const [isRender, setIsRender] = useState(false);
  const { setWork } = useWorkNavigation();

  /*-------------
  Overflow Hidden to body for the slide animation
  -------------- */

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  /*-------------
  Render content
  -------------- */

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setIsRender(true);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  /*----------------
  Animations Hover
  ------------------ */

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
    setWork(slideIndex);
  }, [slideIndex, setWork]);

  return (
    <>
      <main className="relative h-screen w-full overflow-hidden">
        <Nav />
        <Background />
        {!isRender && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
            <Image
              className="w-full h-full object-cover"
              src="/images/margritt.jpg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <div
          ref={slideIndexRef}
          className="absolute bottom-5 right-5 transform -translate-x-1/2 -translate-y-1/2 text-9xl uppercase text-black"
        >
          {`0${slideIndex + 1}`}
        </div>
        {showImage && (
          <img
            className="absolute w-full h-full object-cover z-50"
            src={images[isClickedIndex].image}
            alt=""
            rel="preload"
            as="image"
          />
        )}
        <div className="w-full h-full">
          <Canvas ref={sceneContainer}>
            <Suspense fallback={null}>
              <Carousel
                isRender={isRender}
                slideIndex={slideIndex}
                setSlideIndex={setSlideIndex}
              />
            </Suspense>
          </Canvas>
          <InfosWork
            setShowImage={setShowImage}
            slideIndexRef={slideIndexRef}
            infosRef={infosRef}
            slideIndex={slideIndex}
          />
        </div>
      </main>
    </>
  );
}
