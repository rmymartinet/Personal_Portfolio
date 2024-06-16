"use client";
import { useWorkNavigation } from "@/stateStore/useWorkNavigation";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { preloadImage } from "./PreloadImg";

const Nav = () => {
  const router = useRouter();
  const navRef = useRef();
  const { work } = useWorkNavigation();

  const handleClickHome = async () => {
    await preloadImage(`/images/${work}.jpg`);
    router.push("/");
  };

  useEffect(() => {
    gsap.to(navRef.current, {
      opacity: 1,
      delay: 1,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={navRef}
      className="absolute top-0 left-0 p-10 text-2xl uppercase z-50 flex justify-between w-full opacity-0"
    >
      <div className="cursor-pointer" onClick={() => handleClickHome()}>
        (Home)
      </div>
    </div>
  );
};

export default Nav;
