"use client";
import { useWorkNavigation } from "@/stateStore/useWorkNavigation";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const Nav = () => {
  const { work } = useWorkNavigation();
  const router = useRouter();
  const navRef = useRef();

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

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
