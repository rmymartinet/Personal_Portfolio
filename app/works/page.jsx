"use client";

import Background from "@/components/Background";
import Nav from "@/components/Nav/Nav";
import Carousel from "@/components/ SceneComponents/Carousel";
import InfosWork from "@/components/WorksComponents/InfosWork";
import { useBackNavigationStore } from "@/store/BackNavigation";
import { useNavigationStore } from "@/store/Navigation";
import { useIsActiveStore } from "@/store/isActive";
import { useIsHoverStore } from "@/store/isHover";
import { useParamsId } from "@/store/useParamsId";
import { useWorkNavigation } from "@/store/useWorkNavigation";
import {
  activeAnimation,
  clickedAnimation,
  hoverAnimation,
  numberSplitAnimation,
} from "@/utils/Animation";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * !TODO : Add animation to number slide in relation with de carousel
 */

export default function Works() {
  const { isClickedIndex } = useNavigationStore();
  const { isClicked } = useBackNavigationStore();
  const { setWork } = useWorkNavigation();
  const { isIndex } = useParamsId();
  const { isHover } = useIsHoverStore();
  const { isActive } = useIsActiveStore();

  const [showImage, setShowImage] = useState(false);

  const sceneContainer = useRef();
  const slideIndexRef = useRef();
  const infosRef = useRef();
  const blockInvisibleRef = useRef();
  const workContainerRef = useRef();
  const pageWorkContainerRef = useRef();

  const isClickedIndexIsNull = isClickedIndex === null ? 0 : isClickedIndex;
  const [slideIndex, setSlideIndex] = useState(isClickedIndexIsNull);
  const [isRender, setIsRender] = useState(false);

  const timeOut = [1300, 1300, 1300];

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
  Display preload image
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

  useGSAP(hoverAnimation(isHover, infosRef), {
    dependencies: [isHover],
    scope: workContainerRef.current,
    revertOnUpdate: false,
  });

  useEffect(() => {
    setWork(slideIndex);
  }, [slideIndex, setWork]);

  /*------------
  SlideIndexRef Animation
  -----------*/

  useEffect(() => {
    slideIndexRef.current.textContent = `0${slideIndex + 1}`;
    const clean = numberSplitAnimation(slideIndexRef.current);
    return () => {
      clean();
    };
  }, [slideIndex]);

  /*---------------
  Show Image Animation
  -----------------*/

  useEffect(() => {
    let timeoutId;

    if (isClicked) {
      setShowImage(true);
      timeoutId = setTimeout(() => {
        setShowImage(false);
      }, timeOut[isIndex.index]);
    }

    return () => clearTimeout(timeoutId);
  }, [isClicked]);

  /*---------------
  Display background trick for hide slide animation effect
  -----------------*/

  useGSAP(activeAnimation(isActive, blockInvisibleRef), {
    dependencies: [isActive],
    scope: pageWorkContainerRef.current,
    revertOnUpdate: false,
  });

  useGSAP(clickedAnimation(isClicked, blockInvisibleRef), {
    dependencies: [isClicked],
    scope: pageWorkContainerRef.current,
    revertOnUpdate: false,
  });

  return (
    <section
      ref={pageWorkContainerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <Nav />
      <Background />
      {!isRender && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[405px] h-[405px]">
          <Image
            className="w-full h-full"
            src="/images/margritt/margritt.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className="absolute bottom-5 right-5 transform -translate-x-1/2 -translate-y-1/2 text-9xl uppercase text-black overflow-hidden">
        <h1 className="opacity-0" ref={slideIndexRef}>
          {`0${slideIndex + 1}`}
        </h1>
      </div>
      {showImage && (
        <img
          className="absolute w-full h-full object-cover z-50"
          src={isIndex.image}
          alt=""
        />
      )}
      <div
        ref={blockInvisibleRef}
        className="fixed top-1/2 transform -translate-y-1/2 w-[20%] h-1/2 z-40  bg-white"
      ></div>

      <div ref={workContainerRef} className="w-full h-full">
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
    </section>
  );
}
