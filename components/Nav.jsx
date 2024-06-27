"use client";

import { useBackNavigationStore } from "@/store/BackNavigation";
import { useIsActiveStore } from "@/store/isActive";
import { useHomeNavigationStore } from "@/store/useHomeNavigation";
import { useWorkNavigation } from "@/store/useWorkNavigation";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { preloadImage } from "./PreloadImg";

const Nav = ({ imageIndex, isAnimationDone, isHomeAnimationDone }) => {
  const { work } = useWorkNavigation();
  const { isClicked, setIsClicked } = useBackNavigationStore();
  const { isHomeClicked, setIsHomeClicked } = useHomeNavigationStore();
  const { isActive } = useIsActiveStore();

  const [isPreload, setIsPreloadDone] = useState(false);

  const router = useRouter();
  const navRef = useRef();

  /*------------
  Clique sur le bouton Home
  ------------*/
  const currentPath = window.location.pathname;

  const handleClickHome = async () => {
    if (/^\/works\/\d+$/.test(currentPath)) {
      try {
        await preloadImage(`/images/${work}.jpg`);
        setIsHomeClicked(true);
        setIsPreloadDone(true);
      } catch (error) {
        console.error("Failed to preload image", error);
      }
    } else {
      await preloadImage(`/images/${work}.jpg`);
      router.push("/");
      setIsHomeClicked(true);
    }
  };

  useEffect(() => {
    if (isHomeAnimationDone && isHomeClicked) {
      router.push("/");
    }
  }, [isHomeClicked, isHomeAnimationDone]);

  /*------------
  Clique sur le bouton Works
  ------------*/

  const handleClickWorks = async () => {
    try {
      await preloadImage(imageIndex.image);
      setIsPreloadDone(true);
      setIsClicked(true);
    } catch (error) {
      console.error("Failed to preload image", error);
    }
  };

  useEffect(() => {
    if (isAnimationDone && isClicked && isPreload) {
      router.push("/works");
    }
  }, [isAnimationDone, isClicked, isPreload]);

  /*------------
  Animation de la Nav
  ------------*/

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
        <span style={{ color: "initial" }}>
          <span>(</span>
          <span className="linkHover">Home</span>
          <span>)</span>
        </span>
      </div>
      <div onClick={handleClickWorks}>
        <span
          className={
            currentPath === "/works" ? "cursor-none no-hover" : "cursor-pointer"
          }
          style={{
            textDecoration: currentPath === "/works" ? "line-through" : "none",
          }}
        >
          <span style={{ color: "initial" }}>
            <span>(</span>
            <span className="linkHover">Works</span>
            <span>)</span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Nav;
