"use client";

import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Suspense, useRef } from "react";
import CarouselItem from "./_components/CarouselItems";

gsap.registerPlugin(ScrollTrigger);

const Scene = dynamic(() => import("../works/_components/Scene"), {
  ssr: false,
});

export default function Works() {
  const router = useRouter();
  const scrollContainer = useRef();
  const flipRef = useRef();
  const sceneContainer = useRef();

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
      start: "bottom bottom",
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
        className="fixed top-1/2 left-1/2 transform -translate-x-[49.1%] -translate-y-1/2 w-[50vw] h-[50vh] flex items-center justify-center "
      ></div>
      <div
        ref={scrollContainer}
        className="flex items-end justify-around h-screen w-[100vw] border-4 border-blue-500"
      >
        <Canvas>
          <Suspense fallback={null}>
            <CarouselItem />
          </Suspense>
        </Canvas>
        {/* <Scene router={router} flipRef={flipRef} canvasCount={3} /> */}
      </div>
    </main>
  );
}
