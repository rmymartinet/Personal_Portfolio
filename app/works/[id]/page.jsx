"use client";

import images from "@/app/data/data";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useNavigationStore } from "@/stateStore/Navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { textGsapTransition } from "../_animations/TextAnimation";

gsap.registerPlugin(ScrollTrigger, Flip, Observer);

export default function Work() {
  const router = useRouter();
  const containerRef = useRef();
  const imgContainerRef = useRef();
  const textContainerRef = useRef();
  const flipContainerRef = useRef();
  const infosContentRef = useRef();
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

  const handleClickBack = async () => {
    await preloadImage(images[isClickedIndex].image);
    setIsClicked(true);
    router.back();
  };

  /*---------------
Initial Animaiton infosContent  
----------------- */

  useGSAP(() => {
    const h1 = infosContentRef.current.querySelector("h1");
    const subtitle = infosContentRef.current.querySelector("span");
    textGsapTransition(h1);
    textGsapTransition(subtitle);
  });

  /*---------------
  Resize the flip container and animate the infos content
  ----------------- */

  useEffect(() => {
    gsap.fromTo(
      infosContentRef.current,
      { opacity: 1 },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      }
    );

    gsap.to(flipContainerRef.current, {
      x: 30,
      y: 200,
      borderRadius: "2%",
      width: "40%",
      height: "70%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
  }, []);

  /*---------------
  Animate textContainer and imgContainer
  ----------------- */

  useGSAP(() => {
    const details = gsap.utils.toArray(textContainerRef.current.children);
    const photos = gsap.utils.toArray(imgContainerRef.current.children);

    gsap.set(photos, { yPercent: 101 });

    let mm = gsap.matchMedia();

    mm.add("(min-width: 600px)", () => {
      let animations = photos.map((photo) => {
        let animation = gsap.timeline().to(photo, { yPercent: 0 });

        return animation;
      });

      details.forEach((detail, index) => {
        let headline = detail.querySelector("h1");

        ScrollTrigger.create({
          trigger: headline,
          start: "top 80%",
          end: "top 40%",
          animation: animations[index],
          scrub: 1,
        });
      });

      return () => {
        console.log("mobile");
      };
    });
  });

  return (
    <div ref={containerRef}>
      <div
        ref={flipContainerRef}
        className="fixed top-0 w-full h-screen overflow-hidden"
        style={{
          backgroundImage: `url(${images[isClickedIndex].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div ref={infosContentRef}>
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white flex items-center justify-center uppercase text-bold text-xl">
            scroll down
          </div>
          <div
            onClick={handleClickBack}
            className="absolute top-[10%] left-1/2 transform -translate-x-1/2 text-white text-2xl z-10"
          >
            Back
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl z-10 gap-10 flex flex-col items-center justify-center">
            <h1 className="text-9xl uppercase font-bold">
              {images[isClickedIndex].title}
            </h1>
            <span className="text-4xl">{images[isClickedIndex].subtitle}</span>
          </div>
        </div>
        <div ref={imgContainerRef} className="relative w-full h-full">
          <div
            className="absolute top-0 w-full h-full overflow-hidden"
            style={{
              backgroundImage: `url(${images[1].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            className="absolute top-0 w-full h-full overflow-hidden"
            style={{
              backgroundImage: `url(${images[2].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            className="absolute top-0 w-full h-full overflow-hidden"
            style={{
              backgroundImage: `url(${images[1].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div
        ref={textContainerRef}
        className="absolute right-0 p-20  w-1/2  text-2xl"
      >
        {["Title 1", "Title 2", "Title 3"].map((title, index) => (
          <div
            key={index}
            className="h-screen flex flex-col items-center gap-20 justify-center text-center"
          >
            <h1 className="text-2xl">{title}</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              ullam atque dolorem quia modi assumenda ab, at vero odit
              perspiciatis maiores aliquam deserunt error? Asperiores
              voluptatibus laboriosam rerum dolores qui!
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
