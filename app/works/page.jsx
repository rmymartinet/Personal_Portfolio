"use client";

import images from "@/app/data/data";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useNavigationStore } from "@/stateStore/Navigation";
import { useIsActiveStore } from "@/stateStore/isActive";
import { useIsHoverStore } from "@/stateStore/isHover";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useEffect, useRef, useState } from "react";
import Carousel from "./_components/Carousel";

gsap.registerPlugin(ScrollTrigger);

/**
 * !TODO : Add animation to number slide in relation with de carousel
 */

export default function Works() {
  const { isClicked } = useBackNavigationStore();

  const { isClickedIndex } = useNavigationStore();
  const { isHover } = useIsHoverStore();
  const { isActive } = useIsActiveStore();
  const [showImage, setShowImage] = useState(false);
  const infosRef = useRef();
  const sceneContainer = useRef();
  const isClickedIndexIsNull = isClickedIndex === null ? 0 : isClickedIndex;
  const [slideIndex, setSlideIndex] = useState(isClickedIndexIsNull);

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

  /*----------------
  Animations infos
  ------------------ */

  useEffect(() => {
    let animation;

    if (!isActive) {
      animation = gsap.fromTo(
        infosRef.current,
        {
          opacity: 0,
        },
        {
          delay: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      );
    } else {
      if (animation) {
        animation.kill();
      }

      gsap.to(infosRef.current, {
        opacity: 0,
        duration: 0,
      });
    }
    return () => {
      if (animation) {
        animation.kill();
      }
    };
  }, [isActive]);

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
    <main className="relative h-screen w-full">
      <div className="absolute bottom-5 right-5 transform -translate-x-1/2 -translate-y-1/2 z-[-10] text-9xl uppercase text-black">
        {`0${slideIndex + 1}`}
      </div>
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
            <Carousel slideIndex={slideIndex} setSlideIndex={setSlideIndex} />
          </Suspense>
        </Canvas>
        <div
          ref={infosRef}
          className="absolute top-[72.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[400px] pl-6 pt-2 pb-2 mt-7 space-y-1"
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
