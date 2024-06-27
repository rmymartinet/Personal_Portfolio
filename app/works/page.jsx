"use client";

import Background from "@/components/Background";
import InfosWork from "@/components/InfosWork";
import Nav from "@/components/Nav";
import Carousel from "@/components/Scene/Carousel";
import { useBackNavigationStore } from "@/store/BackNavigation";
import { useNavigationStore } from "@/store/Navigation";
import { useIsActiveStore } from "@/store/isActive";
import { useIsHoverStore } from "@/store/isHover";
import { useParamsId } from "@/store/useParamsId";
import { useWorkNavigation } from "@/store/useWorkNavigation";
import { numberSplitAnimation } from "@/utils/Animation";
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
  const back1Ref = useRef();

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

  useEffect(() => {
    if (isActive) {
      gsap.to(back1Ref.current, {
        opacity: 0,
        duration: 0,
      });
    }
  }, [isActive]);

  useEffect(() => {
    if (isClicked === true) {
      gsap.set(back1Ref.current, {
        opacity: 0,
        duration: 0,
        onComplete: () => {
          setTimeout(() => {
            gsap.set(back1Ref.current, {
              opacity: 1,
              duration: 0,
            });
          }, 3000);
        },
      });
    }
  }, [isClicked]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
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
        ref={back1Ref}
        className="fixed top-1/2 transform -translate-y-1/2 w-[20%] h-1/2 z-40  bg-white"
      ></div>

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
    </section>
  );
}
