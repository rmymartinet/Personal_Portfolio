"use client";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useIsActiveStore } from "@/stateStore/isActive";
import { useHomeNavigationStore } from "@/stateStore/useHomeNavigation";
import { useWorkNavigation } from "@/stateStore/useWorkNavigation";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { preloadImage } from "./PreloadImg";

const Nav = ({ imageIndex, isAnimationDone, isHomeAnimationDone }) => {
  const router = useRouter();
  const navRef = useRef();
  const { work } = useWorkNavigation();
  const { isClicked, setIsClicked } = useBackNavigationStore();
  const { isHomeClicked, setIsHomeClicked } = useHomeNavigationStore();
  const { isActive } = useIsActiveStore();

  const handleClickHome = async () => {
    try {
      await preloadImage(`/images/${work}.jpg`);
      setIsHomeClicked(true);
    } catch (error) {
      console.error("Failed to preload image", error);
    }
  };

  useEffect(() => {
    if (isHomeAnimationDone && isHomeClicked) {
      router.push("/");
    }
  }, [isHomeClicked, isHomeAnimationDone]);

  const handleClickBack = async () => {
    try {
      await preloadImage(imageIndex.image);
      setIsClicked(true);
      setIsPreloadDone(true);
    } catch (error) {
      console.error("Failed to preload image", error);
    }
  };

  useEffect(() => {
    if (isAnimationDone && isClicked) {
      router.push("/works");
    }
  }, [isAnimationDone, isClicked]);

  useEffect(() => {
    gsap.to(navRef.current, {
      opacity: 1,
      delay: 1,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    if (isActive) {
      gsap.to(navRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [isActive]);

  return (
    <div
      ref={navRef}
      className="fixed top-0 left-0 p-10 text-2xl uppercase z-50 flex justify-between w-full opacity-0"
    >
      <div className="cursor-pointer" onClick={handleClickHome}>
        (Home)
      </div>
      <div className="cursor-pointer" onClick={handleClickBack}>
        (Works)
      </div>
    </div>
  );
};

export default Nav;
