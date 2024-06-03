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
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);
gsap.registerPlugin(Flip);

export default function Work() {
  const router = useRouter();
  const containerRef = useRef();
  const imagesContainerRef = useRef();
  const imgContainerRef = useRef();
  const textContainerRef = useRef();
  const flipContainerRef = useRef();
  const elToTriggerRef = useRef();
  const elToFlipRef = useRef();
  const { setIsClicked } = useBackNavigationStore();
  const { isClickedIndex } = useNavigationStore();
  const [isFlipped, setIsFlipped] = useState(false);

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

    const details = gsap.utils.toArray(textContainerRef.current.children);
    const photos = gsap.utils.toArray(elToFlipRef.current.children);

    gsap.set(photos, { yPercent: 101 });

    let mm = gsap.matchMedia();

    mm.add("(min-width: 600px)", () => {
      details.forEach((detail, index) => {
        let headline = detail.querySelector("h1");
        let animation = gsap.timeline().to(photos[index], { yPercent: 0 });

        ScrollTrigger.create({
          trigger: headline,
          start: "top 80%",
          end: "top 40%",
          animation: animation,
          scrub: 1.5,
        });
      });

      return () => {
        // optional
        // custom cleanup code here (runs when it STOPS matching)
        console.log("mobile");
      };
    });
  });

  useEffect(() => {
    const lionWrap = flipContainerRef.current;
    const globe = elToFlipRef.current;

    const state = Flip.getState(globe);

    Flip.from(state, {
      borderRadius: "10%",
      scrollTrigger: {
        trigger: elToFlipRef.current,
        start: "top top",
        end: "+=1000 top",
        scrub: true,
        markers: true,
      },

      onEnter: () => {
        lionWrap.append(globe);
        console.log("onEnter");
      },
      onComplete: () => {
        setIsFlipped(false);
      },
    });
  }, []);

  useEffect(() => {
    if (isFlipped) {
      gsap.set(flipContainerRef.current, {
        overflow: "hidden",
      });
    }

    console.log("isFlipped", isFlipped);
  }, [isFlipped]);

  const handleClickBack = async () => {
    await preloadImage(images[isClickedIndex].image);
    setIsClicked(true);
    router.back();
  };

  return (
    <div className="">
      <div
        ref={elToTriggerRef}
        className="relative border-4 border-red-800 w-full h-screen "
      >
        <div
          ref={elToFlipRef}
          className="absolute left-0 top-0 w-full h-full"
          style={{
            backgroundImage: "url('/images/car.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          src="/images/car.jpg"
        >
          {/* <img
            className="absolute left-0 top-0 w-full h-full object-cover rounded-[10%]"
            src="/images/city.jpg"
            alt=""
          />
          <img
            className="absolute left-0 top-0 w-full h-full object-cover rounded-[10%] "
            src="/images/city.jpg"
            alt=""
          /> */}
        </div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="spacer h-[100vh]"></div>
      <div
        ref={flipContainerRef}
        className="fixed top-0 border-4 border-blue-800 w-1/2 h-screen rounded-[10%] "
      >
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>

      <div
        ref={textContainerRef}
        className="absolute right-0 border-4  border-orange-950 w-1/2   text-4xl"
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

  // return (
  //   <>
  //     <div ref={containerRef} className="">
  //       <div ref={first} className="relative w-full h-screen">
  //         <div
  //           ref={second}
  //           className="top-0 left-0 w-full h-1/2  bg-red-500"
  //         ></div>
  //         <div
  //           ref={flipContainerRef}
  //           className="fixed border-4 border-blue_400  t w-1/4 h-1/4"
  //         ></div>
  //       </div>
  //       <div
  //         ref={imagesContainerRef}
  //         className="flex items-center justify-center w-1/2 h-screen"
  //       >
  //         {/* <button
  //         onClick={() => handleClickBack()}
  //         className="border-4 border-white absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-md text-2xl text-white"
  //       >
  //         Back
  //       </button> */}
  //         <div
  //           ref={imgContainerRef}
  //           className="w-1/4 h-1/4 relative overflow-hidden border-4 border-blue-500"
  //         >
  //           <div className="bg-black absolute w-full h-full"></div>
  //           <div className="bg-red-500 absolute w-full h-full"></div>
  //           <div className="bg-blue-500 absolute w-full h-full"></div>
  //         </div>

  //         {/* {images.map((image, index) => (
  //         <img
  //           key={index}
  //           className="w-full h-full object-cover border-4 border-red-600"
  //           src={image.image}
  //           alt=""
  //           rel="preload"
  //           as="image"
  //         />
  //       ))} */}
  //         {/* <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  //         <h1 className="text-8xl text-white uppercase font-bold">
  //           {images[1].title}
  //         </h1>
  //         <span className="text-2xl text-white uppercase font-semibold">
  //           {images[1].subtitle}
  //         </span>
  //       </div> */}
  //       </div>
  //       <div
  //         ref={textContainerRef}
  //         className="border-4  border-orange-950 w-1/2   text-4xl"
  //       >
  //         {["Title 1", "Title 2", "Title 3"].map((title, index) => (
  //           <div
  //             key={index}
  //             className="h-screen flex flex-col items-center justify-center"
  //           >
  //             <h1>{title}</h1>
  //             <p>
  //               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
  //               ullam atque dolorem quia modi assumenda ab, at vero odit
  //               perspiciatis maiores aliquam deserunt error? Asperiores
  //               voluptatibus laboriosam rerum dolores qui!
  //             </p>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </>
  // );
}
