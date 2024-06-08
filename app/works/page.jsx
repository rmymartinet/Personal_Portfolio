"use client";

import images from "@/app/data/data";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useNavigationStore } from "@/stateStore/Navigation";
import { useIsActiveStore } from "@/stateStore/isActive";
import { useIsHoverStore } from "@/stateStore/isHover";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import Carousel from "./_components/Carousel";

gsap.registerPlugin(ScrollTrigger);

/**
 * !TODO : Add animation to number slide in relation with de carousel
 * !TODO Créer des composants pour éviter la répétition de code
 */

export default function Works() {
  const { isClicked } = useBackNavigationStore();
  const { isClickedIndex } = useNavigationStore();
  const { isHover } = useIsHoverStore();
  const { isActive } = useIsActiveStore();
  const [showImage, setShowImage] = useState(false);
  const infosRef = useRef();
  const sceneContainer = useRef();
  const slideIndexRef = useRef();
  const lineRef = useRef();
  const isClickedIndexIsNull = isClickedIndex === null ? 0 : isClickedIndex;
  const [slideIndex, setSlideIndex] = useState(isClickedIndexIsNull);
  const [isRender, setIsRender] = useState(false);
  const router = useRouter();

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
      animation = gsap.fromTo(
        slideIndexRef.current,
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
      gsap.to(slideIndexRef.current, {
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

  const handleClick = () => {
    router.push("/");
  };

  return (
    <>
      <main className="relative h-screen w-full overflow-hidden">
        <div
          onClick={() => handleClick()}
          className="absolute top-1/4 left-1/4 text-2xl uppercase z-50"
        >
          (back)
        </div>
        <div ref={lineRef} className="absolute top-0 flex w-full h-screen z-0">
          <div className="bg-white  left-0 w-1/4  flex-1 shadow-xl"></div>
          <div className="bg-white  left-[25%] w-1/4  flex-1 shadow-xl"></div>
          <div className="bg-white  left-[50%] w-1/4  flex-1 shadow-xl"></div>
          <div className="bg-white  left-[75%] w-1/4  flex-1 shadow-xl"></div>
        </div>
        {!isRender && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
            <img
              className="w-full h-full object-cover"
              src="./images/city.jpg"
              alt=""
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
              <Carousel
                isRender={isRender}
                slideIndex={slideIndex}
                setSlideIndex={setSlideIndex}
              />
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
    </>
  );
}
