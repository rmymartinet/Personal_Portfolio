"use client";

import useStore from "@/store/CanvaDimension";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

const Scene = dynamic(() => import("../../works/_components/Scene"), {
  ssr: false,
});

/**
 * !TODO: Améliorer le chargement de l'image au premier rendu / Scene
 * !TODO: Voir  pour la taille de l'image par rapport à la Scene
 * !TODO: Faire la transition entre l'image et la scene
 */

export default function Work() {
  const { width, height } = useStore((state) => state.canvasDimensions);

  return (
    <>
      {/* <div className="fixed top-1/2 left-1/2 transform -translate-x-[51.5%] -translate-y-1/2 flex items-center justify-center  ">
        <Image width={500} height={height} src="/images/car.jpg" />
      </div> */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-1/2 flex items-center justify-center w-full h-screen">
        <Scene canvasCount={1} />
      </div>
    </>
  );
}
