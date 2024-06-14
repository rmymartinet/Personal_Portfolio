"use client";

import WhiteDivBottom from "@/components/WhiteDivBottom";
import WhiteDivTop from "@/components/WhiteDivTop";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function MyApp() {
  const containerRef = useRef(null);
  const fixedContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  /**
   * !TODO Ajouter le fais que l'on ne puisse pas scroller entre les animations
   * !TODO Créer des composants pour éviter la répétition de code
   */

  const handleWheel = () => {
    setIsScrolling(true);
  };

  const [time, setTime] = useState({
    hour: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });

  /*-------------
  Time
  -------------- */
  useEffect(() => {
    const now = new Date();
    const delay = 60 * 1000 - (now.getSeconds() * 1000 + now.getMilliseconds());

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

  return (
    <>
      <div onWheel={handleWheel} ref={containerRef}>
        <div
          ref={fixedContainerRef}
          className="fixed top-0 left-0 h-screen w-full"
        >
          <div
            className="relative grid"
            style={{
              gridTemplateColumns: "1.5fr 2fr",
            }}
          >
            <div className="h-screen">
              <Image
                width={500}
                height={500}
                className="object-cover h-full w-full"
                src="/images/r.jpg"
                alt=""
                objectFit="cover"
              />
            </div>
            <div className="px-10 h-full flex flex-col gap-y-10 justify-center">
              <div className="flex">
                <p className="text-md uppercase w-1/6 flex-0.5 opacity-40">
                  [ About ]
                </p>
                <div className="flex flex-col gap-5 px-24 leading-5 flex-1">
                  <p>
                    Hey there! I &apos m a Front-end developer, specializing in
                    React. Always eager to learn and explore, I&apos m a true
                    adventurer, with professional experience in web design and
                    idea creation through my start-up. What I love about this
                    job is the constant evolution.
                  </p>
                  <p>
                    Hey there! I &apos m a Front-end developer, specializing in
                    React. Always eager to learn and explore, I&apos m a true
                    adventurer, with professional experience in web design and
                    idea creation through my start-up. What I love about this
                    job is the constant evolution.
                  </p>
                  <p>
                    Hey there! I &apos m a Front-end developer, specializing in
                    React. Always eager to learn and explore, I&apos m a true
                    adventurer, with professional experience in web design and
                    idea creation through my start-up. What I love about this
                    job is the constant evolution.
                  </p>
                </div>
              </div>
              <div className="flex">
                <p className="w-1/6 text-md uppercase flex-0.5 opacity-40">
                  [ Contact ]
                </p>
                <div className="flex px-24 gap-10 flex-1 justify-between">
                  <div className="flex gap-10">
                    <p>Instagram</p>
                    <p>LinkedIn</p>
                  </div>
                  <p>Email</p>
                </div>
              </div>
              <div className="absolute py-5 bottom-0">
                <h1
                  className="tracking-tight uppercase font-light"
                  style={{ fontSize: "4.3vw" }}
                >
                  martinet rémy 2024 ®
                </h1>
                <p>{`Local ${time.hour} : ${time.minutes}`}</p>
              </div>
            </div>
            <WhiteDivBottom isScrolling={isScrolling} />
            <WhiteDivTop />
          </div>
        </div>
      </div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </>
  );
}
