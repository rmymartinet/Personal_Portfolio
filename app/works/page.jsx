"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useLayoutEffect, useRef } from "react";

import { useScroll } from "framer-motion";

const Scene = dynamic(() => import("../works/_components/Scene"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

/**
 *
 * !TODO: Gérer le pin qui remonte à la fin de l'animation + Ajout d'images
 *
 */

export default function Works() {
  const scrollContainer = useRef();

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

  const { scrollXProgress } = useScroll({
    target: scrollContainer,
    offset: ["start start", "end end"],
  });

  return (
    <main>
      <div
        ref={scrollContainer}
        className="
        flex items-center h-[100vh] w-[200vw] "
      >
        <Scene scrollProgress={scrollXProgress} />
      </div>
    </main>
  );
}
