"use client";

import images from "@/app/data/data";
import CustomScrollbar from "@/components/CustomScrollBar";
import DynamicImageContainer from "@/components/DynamicImageContainer";
import DynamicTextContainer from "@/components/DynamicTextContainer";
import InfosIdWork from "@/components/InfosIdWork";
import Nav from "@/components/Nav";
import { useBackNavigationStore } from "@/store/BackNavigation";
import { useHomeNavigationStore } from "@/store/useHomeNavigation";
import { useParamsId } from "@/store/useParamsId";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, Flip, Observer);

export default function Work({ params }) {
  const image = images[params.id];

  const { setIsIndex } = useParamsId();

  useEffect(() => {
    setIsIndex(images[params.id]);
  }, [images, params.id, setIsIndex]);

  const { isClicked } = useBackNavigationStore();
  const { isHomeClicked } = useHomeNavigationStore();

  const containerRef = useRef();
  const imgContainerRef = useRef();
  const textContainerRef = useRef();
  const flipContainerRef = useRef();
  const scrollRef = useRef();
  const intialImageRef = useRef();

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

  const imagesArray = Object.keys(image)
    .filter((key) => key.startsWith("img"))
    .map((imageKey) => images[params.id][imageKey]);

  const imagesRefs = imagesArray.map(() => useRef(null));
  const nextWork = parseInt(params.id) + 1;
  const nextImage = images[nextWork];

  /*------------------------
  Resize the flip container and animate the infos content
  ----------------------------*/

  const timeoutId = setTimeout(() => {
    document.body.classList.remove("no-scroll");
  }, 2000);

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  /*------------------------
  Resize the flip container and animate the infos content
  ----------------------------*/
  useEffect(() => {
    if (flipContainerRef.current && containerRef.current) {
      let ctx = gsap.context(() => {
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
      });

      return () => {
        ctx.revert();
      };
    }
  }, []);

  /*----------------
  Animate the images and text on scroll
  ----------------*/

  useEffect(() => {
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
  }, []);

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

      let ctx = gsap.context(() => {
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
              width: "405px",
              height: "405px",
              duration: 1,
              ease: "power3.inOut",
              onComplete: () => {
                setIsHomeAnimationDone(true);
              },
            }
          );
      });

      return () => {
        ctx.kill();
      };
    }
  }, [isHomeClicked, imgContainerRef]);

  return (
    <>
      <Nav
        imageIndex={image}
        isAnimationDone={isAnimationDone}
        isHomeAnimationDone={isHomeAnimationDone}
      />

      <div className="no-scroll" ref={containerRef}>
        <div
          ref={flipContainerRef}
          className="fixed top-0 w-full h-screen overflow-hidden z-50"
          style={{
            backgroundImage: `url(${image.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <InfosIdWork image={image} containerRef={containerRef} />
          <DynamicImageContainer
            image={image}
            imgContainerRef={imgContainerRef}
            imagesRefs={imagesRefs}
            imagesArray={imagesArray}
            intialImageRef={intialImageRef}
          />
        </div>
        <DynamicTextContainer
          textContainerRef={textContainerRef}
          imagesRefs={imagesRefs}
          body={body}
          scrollRef={scrollRef}
          nextWork={nextWork}
          nextImage={nextImage}
        />
        <CustomScrollbar scrollRef={scrollRef} />
      </div>
    </>
  );
}
