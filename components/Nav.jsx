"use client";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useIsActiveStore } from "@/stateStore/isActive";
import { useWorkNavigation } from "@/stateStore/useWorkNavigation";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { preloadImage } from "./PreloadImg";

const Nav = ({ imageIndex, intialImageRef, flipContainer }) => {
  const router = useRouter();
  const navRef = useRef();
  const { work } = useWorkNavigation();
  const { isClicked, setIsClicked } = useBackNavigationStore();
  const { isActive } = useIsActiveStore();

  const handleClickHome = async () => {
    await preloadImage(`/images/${work}.jpg`);
    router.push("/");
  };

  const handleClickBack = async () => {
    await preloadImage(imageIndex.image);
    setIsClicked(true);
  };

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

  useEffect(() => {
    if (
      isClicked &&
      intialImageRef &&
      intialImageRef.current !== null &&
      flipContainer &&
      flipContainer.current !== null
    ) {
      const tl = gsap.timeline();

      tl.fromTo(
        intialImageRef.current,
        {
          height: "0%",
        },
        {
          zIndex: 9999,
          height: "100%",
          duration: 1,
          ease: "power2.out",
        }
      ).to(flipContainer.current, {
        x: 0,
        y: 0,
        borderRadius: "0%",
        width: "100%",
        height: "100%",
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
          router.push("/works");
        },
      });
    }
  }, [isClicked, intialImageRef, flipContainer]);

  return (
    <div
      ref={navRef}
      className="fixed top-0 left-0 p-10 text-2xl uppercase z-50 flex justify-between w-full opacity-0"
    >
      <div className="cursor-pointer" onClick={() => handleClickHome()}>
        (Home)
      </div>
      <div className="cursor-pointer" onClick={() => handleClickBack()}>
        (Works)
      </div>
    </div>
  );
};

export default Nav;
