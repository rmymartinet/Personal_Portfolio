"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Scene = dynamic(() => import("../works/_components/Scene"), {
  ssr: false,
});

/**
 * !TODO: Gérer le pin qui remonte à la fin de l'animation
 */

export default function Works() {
  const scrollContainer = useRef();
  const flipRef = useRef();

  /** Scroll horizontal
   */

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
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

    return () => ctx.revert();
  }, []);

  // useEffect(() => {
  //   let ctx = gsap.context(() => {
  //     function getScrollAmount() {
  //       let containerWidth = scrollContainer.current.scrollWidth;
  //       return containerWidth - window.innerWidth;
  //     }

  //     const tween = gsap.to(flipRef.current, {
  //       x: getScrollAmount,
  //       duration: 3,
  //       ease: "none",
  //     });

  //     ScrollTrigger.create({
  //       trigger: flipRef.current,
  //       start: "top top",
  //       end: "+=100%",
  //       pin: true,
  //       animation: tween,
  //       scrub: 1,
  //       markers: true,
  //       invalidateOnRefresh: true,
  //     });
  //   });

  //   return () => ctx.revert();
  // }, []);

  return (
    <main>
      <div
        ref={flipRef}
        className="
        fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        w-1/4 h-1/4 border border-red-500  flex items-center justify-center z-10
        "
      ></div>
      <div
        ref={scrollContainer}
        className="
        flex items-center h-[100vh] w-[200vw] bg-gray-500"
      >
        <Scene flipRef={flipRef} />
      </div>
    </main>
  );
}
