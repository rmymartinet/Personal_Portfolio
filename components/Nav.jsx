"use client";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useIsActiveStore } from "@/stateStore/isActive";
import { useWorkNavigation } from "@/stateStore/useWorkNavigation";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { preloadImage } from "./PreloadImg";

const Nav = ({ imageIndex, isAnimationDone }) => {
  const router = useRouter();
  const navRef = useRef();
  const { work } = useWorkNavigation();
  const { isClicked, setIsClicked } = useBackNavigationStore();
  const { isActive } = useIsActiveStore();
  const [isPreloadDone, setIsPreloadDone] = useState(false);

  const handleClickHome = async () => {
    await preloadImage(`/images/${work}.jpg`);
    router.push("/");
  };

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
    if (isAnimationDone && isClicked && isPreloadDone) {
      router.push("/works");
    }
  }, [isAnimationDone, isClicked, isPreloadDone]);

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
