"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

const SceneId = dynamic(() => import("../../works/_components/SceneId"), {
  ssr: false,
});

/**
 * !TODO: Améliorer le chargement de l'image au premier rendu / Scene
 * !TODO: Voir  pour la taille de l'image par rapport à la Scene
 * !TODO: Faire la transition entre l'image et la scene
 */

export default function Work() {
  return (
    <>
      <div className="">
        <div className=" relative flex items-end justify-around h-screen w-[100vw] border-4 border-blue-500">
          <div className="flex w-full h-screen border-4 border-red-500  items-center justify-center">
            <SceneId canvasCount={1} />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl">
            Bonjour c'est moi
          </div>
        </div>

        <div className="h-[200vh]"></div>
      </div>
    </>
  );
}
