"use client";

import CustomScrollbar from "@/components/CustomScrollBar";
import DynamicImageContainer from "@/components/DynamicImageContainer";
import DynamicTextContainer from "@/components/DynamicTextContainer";
import InfosDetailsWork from "@/components/InfosDetailsWork";
import Nav from "@/components/Nav";
import { useNavigationStore } from "@/stateStore/Navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import images from "../../data/data";

gsap.registerPlugin(ScrollTrigger, Flip, Observer);

export default function Work() {
  const { isClickedIndex } = useNavigationStore();

  const containerRef = useRef();
  const imgContainerRef = useRef();
  const textContainerRef = useRef();
  const flipContainerRef = useRef();
  const scrollRef = useRef();
  const intialImageRef = useRef();

  const body = document.body;
  const bgColor = [
    "rgb(224 231 255);",
    "rgb(226 232 240))",
    "rgb(219 234 254)",
    "rgb(226 232 240))",
    "rgb(245 245 245)",
  ];

  const imagesIndex = images[isClickedIndex];
  const firstImage = imagesIndex.image;
  const imagesArray = Object.values(imagesIndex).splice(2, 5);
  const imagesRefs = imagesArray.map(() => useRef(null));

  /*------------------------
  Resize the flip container and animate the infos content 
  ----------------------------*/
  useEffect(() => {
    gsap.to(flipContainerRef.current, {
      x: 300,
      y: 200,
      borderRadius: "2%",
      width: "60%",
      height: "70%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
  }, []);

  /*----------------
  Animate the images and text on scroll
  ----------------*/

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
    <>
      <Nav
        imageIndex={imagesIndex}
        intialImageRef={intialImageRef}
        flipContainer={flipContainerRef}
      />
      <div ref={containerRef}>
        <div
          ref={flipContainerRef}
          className="fixed top-0 w-full h-screen overflow-hidden z-50"
          style={{
            backgroundImage: `url(${images[isClickedIndex].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <InfosDetailsWork
            image={images[isClickedIndex]}
            containerRef={containerRef}
          />
          <DynamicImageContainer
            imgContainerRef={imgContainerRef}
            imagesRefs={imagesRefs}
            imagesArray={imagesArray}
            firstImage={firstImage}
            intialImageRef={intialImageRef}
          />
        </div>
        <DynamicTextContainer
          textContainerRef={textContainerRef}
          imagesRefs={imagesRefs}
          body={body}
          scrollRef={scrollRef}
        />
        <CustomScrollbar scrollRef={scrollRef} />
      </div>
    </>
  );
}
