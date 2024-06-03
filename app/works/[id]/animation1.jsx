"use client";

import images from "@/app/data/data";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useNavigationStore } from "@/stateStore/Navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);

export default function Work() {
  const router = useRouter();
  const containerRef = useRef();
  const imagesContainerRef = useRef();
  const imgContainerRef = useRef();
  const textContainerRef = useRef();
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

  // useGSAP(() => {
  //   if (container.current) {
  //     const h1 = container.current.querySelector("h1");
  //     const subtitle = container.current.querySelector("span");

  //     textGsapTransition(h1);
  //     textGsapTransition(subtitle);

  //     // Synchronize images with text sections
  //     const textSections = Array.from(
  //       textContainerRef.current.querySelectorAll(".text-section")
  //     );
  //     const images = Array.from(
  //       imagesContainerRef.current.querySelectorAll("img")
  //     );

  //     const tl = gsap.timeline();

  //     tl.to(pinContainer.current, {
  //       scrollTrigger: {
  //         trigger: container.current,
  //         start: "top top",
  //         end: "+=600%",
  //         scrub: true,
  //         pin: true,
  //       },
  //     });

  //     tl.to(imagesContainerRef.current, {
  //       borderRadius: "10%",
  //       duration: 1,
  //       x: 40,
  //       y: 40,
  //       width: "45%",
  //       height: "30%",
  //       onComplete: () => {
  //         gsap.to(textContainerRef.current, {
  //           yPercent: -100,
  //           delay: 1,
  //           scrollTrigger: {
  //             trigger: pinContainer.current,
  //             start: "top top",
  //             end: "bottom bottom",
  //             scrub: 1.5,
  //           },
  //         });

  //         textSections.forEach((section, i) => {
  //           tl.to(images[i], {
  //             scrollTrigger: {
  //               trigger: section,
  //               start: "top center",
  //               end: "bottom center",
  //               scrub: true,
  //               onEnter: () => gsap.to(images[i], { autoAlpha: 1 }),
  //               onLeave: () => gsap.to(images[i], { autoAlpha: 0 }),
  //               onEnterBack: () => gsap.to(images[i], { autoAlpha: 1 }),
  //               onLeaveBack: () => gsap.to(images[i], { autoAlpha: 0 }),
  //             },
  //           });
  //         });
  //       },

  //       scrollTrigger: {
  //         trigger: pinContainer.current,
  //         endTrigger: pinContainer.current,
  //         start: "top top",
  //         end: "bottom bottom",
  //         scrub: 1.5,
  //       },
  //     });
  //   }
  // });
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: imagesContainerRef.current,
    });

    gsap.to(imagesContainerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        pin: true,
        pinSpacing: false,
      },
      borderRadius: "10%",
      duration: 1,
      x: 40,
      y: 40,
      width: "40%",
      height: "100%",
    });

    // const details = gsap.utils.toArray(textContainerRef.current.children);
    // const photos = gsap.utils.toArray(imgContainerRef.current.children);

    // gsap.set(photos, { yPercent: 101 });

    // let mm = gsap.matchMedia();

    // mm.add("(min-width: 600px)", () => {
    //   details.forEach((detail, index) => {
    //     let headline = detail.querySelector("h1");
    //     let animation = gsap.timeline().to(photos[index], { yPercent: 0 });

    //     ScrollTrigger.create({
    //       trigger: headline,
    //       start: "top 80%",
    //       end: "top 40%",
    //       animation: animation,
    //       scrub: 1.5,
    //       markers: true,
    //     });
    //   });

    //   return () => {
    //     // optional
    //     // custom cleanup code here (runs when it STOPS matching)
    //     console.log("mobile");
    //   };
    // });
  });

  const handleClickBack = async () => {
    await preloadImage(images[isClickedIndex].image);
    setIsClicked(true);
    router.back();
  };

  return (
    <div ref={containerRef} className="">
      <div
        ref={imagesContainerRef}
        className="flex items-center justify-center w-full h-screen"
      >
        <div
          ref={imgContainerRef}
          className="rounded-[10%] w-full h-full relative overflow-hidden border-4 border-blue-500"
        >
          <img
            className="absolute w-full h-full object-cover"
            src="/images/car.jpg"
            alt=""
          />
          <img
            className="absolute w-full h-full object-cover"
            src="/images/city.jpg"
            alt=""
          />
          <img
            className="absolute w-full h-full object-cover"
            src="/images/car.jpg"
            alt=""
          />
        </div>
      </div>
      <div
        ref={textContainerRef}
        className="border-4  border-orange-950 w-full flex justify-end  text-4xl"
      >
        {["Title 1", "Title 2", "Title 3"].map((title, index) => (
          <div
            key={index}
            className="h-screen flex flex-col items-center justify-center"
          >
            <h1>{title}</h1>
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
