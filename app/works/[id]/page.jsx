"use client";

import images from "@/app/data/data";
import { useNavigationStore } from "@/stateStore/Navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/**
 * !TODO: Améliorer le chargement de l'image au premier rendu / Scene
 * !TODO: Voir  pour la taille de l'image par rapport à la Scene
 * !TODO: Faire la transition entre l'image et la scene
 */

export default function Work() {
  const { isClickedIndex } = useNavigationStore();

  console.log(isClickedIndex);
  return (
    <div className="">
      <div className="relative flex items-end justify-around h-screen w-[100vw]">
        <div className="flex w-full h-screen items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src={images[isClickedIndex].image}
            alt=""
            rel="preload"
            as="image"
          />
        </div>
      </div>
    </div>
  );
}
