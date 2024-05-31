"use client";

import images from "@/app/data/data";
import { textGsapTransition } from "@/app/works/_animations/TextAnimation";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useNavigationStore } from "@/stateStore/Navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const router = useRouter();
  const imgContainer = useRef();
  const { setIsClicked } = useBackNavigationStore();
  const { isClickedIndex } = useNavigationStore();

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  useGSAP(() => {
    /*--------------------
  Animate text
  --------------------*/
    if (imgContainer.current) {
      const h1 = imgContainer.current.querySelector("h1");
      const subtitle = imgContainer.current.querySelector("span");

      textGsapTransition(h1);
      textGsapTransition(subtitle);
    }
  }, []);

  const handleClickBack = async () => {
    await preloadImage(images[isClickedIndex].image);
    setIsClicked(true);
    router.back();
  };

  return (
    <div className="">
      <div
        ref={imgContainer}
        className="flex w-full h-screen items-center justify-center relative z-50"
      >
        <button
          onClick={() => handleClickBack()}
          className="border-4 border-white absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-md text-2xl text-white"
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
