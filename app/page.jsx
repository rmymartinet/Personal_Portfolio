"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function MyApp() {
  const router = useRouter();
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const fixedImageRef = useRef(null);
  const [time, setTime] = useState({
    hour: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });

  useEffect(() => {
    const now = new Date();
    const delay = 60 * 1000 - (now.getSeconds() * 1000 + now.getMilliseconds()); // Calcul du délai jusqu'à la prochaine minute

    const timer = setTimeout(() => {
      setTime({
        hour: new Date().getHours(),
        minutes: new Date().getMinutes(),
      });

      setInterval(() => {
        setTime({
          hour: new Date().getHours(),
          minutes: new Date().getMinutes(),
        });
      }, 60000);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const lineRefchildren = lineRef.current.children;

    gsap.set(lineRefchildren, {
      yPercent: 200,
    });

    gsap.to(lineRefchildren, {
      yPercent: 0,
      duration: 10,
      stagger: 0.5,
      ease: "power2.Out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onLeave: () => {
          router.push("/works");
        },
      },
    });

    const thirdChild = lineRefchildren[2];

    Array.from(lineRefchildren).forEach((child, index) => {
      const childHeight = child.getBoundingClientRect().top;
      ScrollTrigger.create({
        trigger: thirdChild,
        start: `top-=${childHeight}px -50%`, // Adjusting the start position based on the child's height
        end: `bottom+=${childHeight}px bottom`, // Adjusting the end pos
        scrub: true,
        markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const maskHeight = 100 - 5000 * progress;
          const mask = `polygon(0% ${maskHeight}%, 100% ${maskHeight}%, 100% 100%, 0% 100%)`;
          fixedImageRef.current.style.clipPath = mask;
        },
        onEnter: () => gsap.to(fixedImageRef.current, { autoAlpha: 1 }),
        onLeave: () => gsap.to(fixedImageRef.current, { autoAlpha: 0 }),
        onEnterBack: () => gsap.to(fixedImageRef.current, { autoAlpha: 1 }),
        onLeaveBack: () => gsap.to(fixedImageRef.current, { autoAlpha: 0 }),
      });
    });
  }, []);

  useEffect(() => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "center center",
        scrub: 1,
      },
    });
  }, []);

  return (
    <>
      <main
        ref={containerRef}
        className="fixed top-0 left-0 grid h-screen w-full"
        style={{
          gridTemplateColumns: "1.5fr 2fr",
        }}
      >
        <div className="h-screen">
          <img className="object-cover h-full w-full" src="./images/r.jpg" />
        </div>
        <div className="px-10 h-full grid grid-col-2 items-end justify-center">
          <div className="flex gap-32">
            <p>About</p>
            <div className="flex flex-col gap-5 px-32 leading-5">
              <p>
                Hey there! I'm a Front-end developer, specializing in React.
                Always eager to learn and explore, I'm a true adventurer, with
                professional experience in web design and idea creation through
                my start-up. What I love about this job is the constant
                evolution.
              </p>
              <p>
                I have a competitive spirit and I'm always seeking new
                challenges. Routine, not for me! What truly excites me is seeing
                a project evolve and the creativity I can express in its
                development.
              </p>
              <p>
                I'm incredibly curious, which is why I've pursued so many
                training opportunities. It gives me a unique perspective and a
                different approach to projects.
              </p>
            </div>
          </div>
          <div className="flex gap-32">
            <p>Contact</p>
            <div className="flex gap-10 px-32 justify-between">
              <p>Instagram</p>
              <p>LinkedIn</p>
              <p className="mx-20">Email</p>
            </div>
          </div>
          <div>
            <h1 className="text-7xl tracking-tight uppercase font-light">
              martinet rémy 2024 ®
            </h1>
            <p>{`Local ${time.hour} : ${time.minutes}`}</p>
          </div>
        </div>
      </main>
      <div className="h-screen"></div>
      <div className="h-screen"></div>

      <div ref={lineRef} className="absolute top-0 flex w-full z-50 h-[400vh]">
        <div className="bg-white flex-1"></div>
        <div className="bg-white flex-1"></div>
        <div className="bg-white flex-1"></div>
        <div className="bg-white flex-1"></div>
        <div className="bg-white flex-1"></div>
        <div className="bg-white flex-1"></div>
      </div>
      <div
        ref={fixedImageRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] z-50 opacity-0"
      >
        <img
          className="w-full h-full object-cover"
          src="./images/car.jpg"
          alt=""
        />
      </div>
    </>
  );
}
