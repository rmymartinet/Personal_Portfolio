"use client";

import DynamicImageContainer from "@/components/DynamicImageContainer";
import DynamicTextContainer from "@/components/DynamicTextContainer";
import { preloadImage } from "@/components/PreloadImg";
import { textGsapTransition } from "@/lib/Animation";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useNavigationStore } from "@/stateStore/Navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import images from "../../data/data";

gsap.registerPlugin(ScrollTrigger, Flip, Observer);

export default function Work() {
  const router = useRouter();
  const containerRef = useRef();
  const imgContainerRef = useRef();
  const textContainerRef = useRef();
  const flipContainerRef = useRef();
  const infosContentRef = useRef();
  const body = document.body;
  const bgColor = [
    "rgb(224 231 255);",
    "rgb(226 232 240))",
    "rgb(219 234 254)",
    "rgb(226 232 240))",
    "rgb(245 245 245)",
  ];

  const { setIsClicked } = useBackNavigationStore();
  const { isClickedIndex } = useNavigationStore();

  const imagesIndex = images[isClickedIndex];
  const imagesArray = Object.values(imagesIndex).splice(1, 5);
  const imagesRefs = imagesArray.map(() => useRef(null));

  const handleClickBack = async () => {
    await preloadImage(images[isClickedIndex].image);
    setIsClicked(true);
    router.back();
  };

  /*--------------
   Initial Animaiton infosContent 
   -------------------*/
  useGSAP(() => {
    const h1 = infosContentRef.current.querySelector("h1");
    const subtitle = infosContentRef.current.querySelector("span");
    textGsapTransition(h1);
    textGsapTransition(subtitle);
  });

  /*------------------------
  Resize the flip container and animate the infos content 
  ----------------------------*/
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
      width: "50%",
      height: "70%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
  }, []);

  useGSAP(() => {
    const details = gsap.utils.toArray(textContainerRef.current.children);
    const photos = gsap.utils.toArray(imgContainerRef.current.children);

    gsap.set(photos, {
      clipPath: "inset(100% 0% 0% 0%)",
    });

    let mm = gsap.matchMedia();

    mm.add("(min-width: 600px)", () => {
      let animations = photos.map((photo, index) => {
        let animation = gsap
          .timeline()
          .to(photo, {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.inOut",
            duration: 5,
          })
          .to(images[index], { yPercent: -10, duration: 5 }, 0)
          .to(body, { backgroundColor: bgColor[index], duration: 10 }, 0);

        return animation;
      });

      details.forEach((detail, index) => {
        let headline = detail.querySelector("h1");

        ScrollTrigger.create({
          trigger: headline,
          start: "top 150%",
          end: "bottom 10%",
          animation: animations[index],
          scrub: 1.5,
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
            onClick={() => handleClickBack()}
            className="absolute top-0 left-0 p-10 uppercase text-white text-2xl z-10"
          >
            (Works)
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl z-10 gap-10 flex flex-col items-center justify-center overflow-hidden">
            <h1 className="text-9xl uppercase font-bold">
              {images[isClickedIndex].title}
            </h1>
            <span className="text-2xl">{images[isClickedIndex].subtitle}</span>
          </div>
        </div>
        <DynamicImageContainer
          imgContainerRef={imgContainerRef}
          imagesRefs={imagesRefs}
          imagesArray={imagesArray}
        />
      </div>
      <DynamicTextContainer
        textContainerRef={textContainerRef}
        imagesRefs={imagesRefs}
        body={body}
      />
    </div>
  );
}
