"use client";

import images from "@/app/data/data";
import { useNavigationStore } from "@/stateStore/Navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { textGsapTransition } from "@/app/works/_animations/TextAnimation";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useGSAP } from "@gsap/react";

/**
 * !TODO: Améliorer le chargement de l'image au premier rendu / Scene
 * !TODO: Voir  pour la taille de l'image par rapport à la Scene
 * !TODO: Faire la transition entre l'image et la scene
 */

export default function Work() {
  const { isClickedIndex } = useNavigationStore();
  const router = useRouter();
  const imgContainer = useRef();
  const { setClicked } = useBackNavigationStore();

  const [isClicked, setIsClicked] = useState(false);

  useGSAP(() => {
    if (imgContainer.current) {
      const h1 = imgContainer.current.querySelector("h1");
      const subtitle = imgContainer.current.querySelector("span");

      textGsapTransition(h1);
      textGsapTransition(subtitle);
    }
  }, []);

  const handleClickBack = () => {
    setIsClicked(true);
    setClicked(true);
    router.back();
  };

  return (
    <div className="">
      <div
        ref={imgContainer}
        className="flex w-full h-screen items-center justify-center relative"
      >
        <button
          onClick={() => handleClickBack()}
          className=" absolute top-0 left-1/2 p-3 rounded-md text-2xl text-white"
        >
          Back
        </button>
        <img
          className="w-full h-full object-cover"
          src={images[isClickedIndex].image}
          alt=""
          rel="preload"
          as="image"
        />

        <div className=" flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <h1 className="text-8xl text-white uppercase font-bold">
            {images[isClickedIndex].title}
          </h1>
          <span className="text-2xl text-white uppercase font-semibold">
            {images[isClickedIndex].subtitle}
          </span>
        </div>
      </div>

      <div className="h-[200vh]"></div>
    </div>
  );
}
