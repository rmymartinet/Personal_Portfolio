"use client";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// import dynamic from "next/dynamic";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// const Scene = dynamic(() => import("../../works/_components/Scene"), {
//   ssr: false,
// });

/**
 * !TODO: Gérer la taille de la scène
 * !TODO: Améliorer le chargement de l'image au premier rendu
 * !TODO: Voir  pour la taille de l'iamge par rapport a la Scene
 * !TODO: Faire la transition entre l'image et la scene
 */

export default function Work() {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-[51.7%] -translate-y-1/2 ">
      <Image width={447} height={450} src="/images/car.jpg" />
      {/* <Scene canvasCount={1} /> */}
    </div>
  );
}
