"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Scene = dynamic(() => import("../works/_components/Scene"), {
  ssr: false,
});

/**
 * !TODO: Gérer le pin qui remonte à la fin de l'animation
 */

export default function Works() {
  const router = useRouter();
  const scrollContainer = useRef();
  const flipRef = useRef();

  /** Scroll horizontal
   */

  useGSAP(() => {
    function getScrollAmount() {
      let containerWidth = scrollContainer.current.scrollWidth;
      return -(containerWidth - window.innerWidth);
    }

    const tween = gsap.to(scrollContainer.current, {
      x: getScrollAmount,
      duration: 3,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: scrollContainer.current,
      start: "top top",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });
  });

  return (
    <main className="overflow-x-hidden">
      <div
        ref={flipRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-10  flex items-center justify-center"
      ></div>
      <div
        ref={scrollContainer}
        className="flex items-center justify-between h-[100vh] w-[300vw]"
      >
        <Scene router={router} flipRef={flipRef} canvasCount={3} />
      </div>
    </main>
  );
}
