"use client";

import CustomScrollbar from "@/components/CustomScrollBar";
import DynamicImageContainer from "@/components/DynamicImageContainer";
import DynamicTextContainer from "@/components/DynamicTextContainer";
import InfosIdWork from "@/components/InfosIdWork";
import Nav from "@/components/Nav";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useNavigationStore } from "@/stateStore/Navigation";
import { useHomeNavigationStore } from "@/stateStore/useHomeNavigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import images from "../../data/data";

gsap.registerPlugin(ScrollTrigger, Flip, Observer);

export default function Work() {
  const { isClickedIndex } = useNavigationStore();
  const { isClicked } = useBackNavigationStore();
  const { isHomeClicked } = useHomeNavigationStore();

  const containerRef = useRef();
  const imgContainerRef = useRef();
  const textContainerRef = useRef();
  const flipContainerRef = useRef();
  const scrollRef = useRef();
  const intialImageRef = useRef();
  const triggerContainer = useRef();
  const imageTransitionRef = useRef();

  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [isHomeAnimationDone, setIsHomeAnimationDone] = useState(false);

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
    if (flipContainerRef.current && containerRef.current) {
      gsap.set(flipContainerRef.current, {
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      });

      gsap.to(flipContainerRef.current, {
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
    }
  }, []);

  /*----------------
  Animate the images and text on scroll
  ----------------*/

  useGSAP(() => {
    if (textContainerRef.current && imgContainerRef.current) {
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
    }
  });

  /*----------------
  Click Back from Work [id] to Works
  --------------- */
  useEffect(() => {
    if (isClicked && imgContainerRef.current && flipContainerRef.current) {
      const imgContainerChildren = gsap.utils.toArray(
        imgContainerRef.current.children
      );

      const tl = gsap.timeline();

      tl.to(imgContainerChildren, {
        yPercent: 100,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.inOut",
      }).to(
        flipContainerRef.current,
        {
          x: 0,
          y: 0,
          borderRadius: "0%",
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => {
            setIsAnimationDone(true);
          },
        },
        "-=0.2"
      );
    }
  }, [isClicked, imgContainerRef]);

  /*----------------
  Click Back from Work [id] to Home
  --------------- */
  useEffect(() => {
    if (isHomeClicked && imgContainerRef.current && flipContainerRef.current) {
      const imgContainerChildren = gsap.utils.toArray(
        imgContainerRef.current.children
      );

      const tl = gsap.timeline();

      tl.to(body, {
        backgroundColor: "white",
        duration: 0.5,
        ease: "power3.inOut",
      })
        .to(imgContainerChildren, {
          yPercent: 100,
          duration: 0.5,
          ease: "power3.inOut",
        })
        .fromTo(
          flipContainerRef.current,
          {
            width: "60%",
            height: "70%",
            borderRadius: "0%",
            duration: 1,
            ease: "power3.inOut",
          },
          {
            width: "400px",
            height: "400px",
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
              setIsHomeAnimationDone(true);
            },
          }
        );
    }
  }, [isHomeClicked, imgContainerRef]);

  return (
    <>
      <Nav
        imageIndex={imagesIndex}
        isAnimationDone={isAnimationDone}
        isHomeAnimationDone={isHomeAnimationDone}
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
          <InfosIdWork
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
