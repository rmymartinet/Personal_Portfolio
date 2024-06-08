"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function MyApp() {
  const router = useRouter();
  const fixedContainerRef = useRef(null);
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const fixedImageRef = useRef(null);
  const fixedImageRef2 = useRef(null);
  const lineRef2 = useRef(null);

  /**
   * !TODO Ajouter le fais que l'on ne puisse pas scroller entre les animations
   * !TODO Créer des composants pour éviter la répétition de code
   */

  /*-------------
  Time
  -------------- */

  const [time, setTime] = useState({
    hour: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });

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

  /*-------------
  Transition animation to works page
  -------------- */

  useEffect(() => {
    if (!lineRef.current || !fixedContainerRef.current) return;
    let context = gsap.context(() => {
      gsap.set(fixedImageRef.current, {
        height: "0%",
      });

      const lineRefchildren = lineRef.current.children;

      gsap.set(lineRefchildren, {
        height: "0vh",
      });

      gsap.to(fixedImageRef.current, {
        height: "100%",
        duration: 2,
        ease: "power2.Out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top -2%",
          end: "+=50vh",
          scrub: 1.5,
        },
      });

      gsap.to(lineRefchildren, {
        height: "100vh",
        duration: 5,
        stagger: 0.5,
        ease: "power2.Out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100vh",
          scrub: 1.5,
          onLeave: () => {
            router.push("/works");
          },
        },
      });
    });

    return () => {
      context.kill();
    };
  }, []);

  /*-------------
  Transition animation from works page
  -------------- */

  useEffect(() => {
    if (!lineRef2.current || !fixedImageRef2.current) return;
    let context = gsap.context(() => {
      /*---------
      Fixed image animation
      ----------- */
      const fixedImageRef = fixedImageRef2.current;

      gsap.set(fixedImageRef, {
        height: "100%",
      });

      gsap.to(fixedImageRef, {
        delay: 0.5,
        height: "0%",
        duration: 0.7,
        ease: "power2.Out",
      });

      /*---------
      Line animation
      ----------- */
      const lineRef = lineRef2.current.children;

      gsap.fromTo(
        lineRef,
        {
          height: "100vh",
        },
        {
          delay: 0.5,
          height: "0vh",
          duration: 0.5,
          stagger: 0.2,
          ease: "power2.Out",
        }
      );
    });

    return () => {
      context.kill();
    };
  }, []);

  return (
    <>
      <div ref={containerRef}>
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
              <img
                className="object-cover h-full w-full"
                src="./images/r.jpg"
              />
            </div>
            <div className="px-10 h-full grid grid-col-2 items-end justify-center">
              <div className="flex gap-32">
                <p>About</p>
                <div className="flex flex-col gap-5 px-32 leading-5">
                  <p>
                    Hey there! I'm a Front-end developer, specializing in React.
                    Always eager to learn and explore, I'm a true adventurer,
                    with professional experience in web design and idea creation
                    through my start-up. What I love about this job is the
                    constant evolution.
                  </p>
                  <p>
                    I have a competitive spirit and I'm always seeking new
                    challenges. Routine, not for me! What truly excites me is
                    seeing a project evolve and the creativity I can express in
                    its development.
                  </p>
                  <p>
                    I'm incredibly curious, which is why I've pursued so many
                    training opportunities. It gives me a unique perspective and
                    a different approach to projects.
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
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] z-50">
              <div
                ref={fixedImageRef}
                className="absolute bottom-0 left-0 w-full h-0 bg-white"
              >
                <img
                  className="object-cover h-full w-full"
                  src="./images/city.jpg"
                />
              </div>
            </div>
            <div ref={lineRef} className="absolute flex w-full h-screen z-20">
              <div className="bg-white absolute bottom-0 left-0 w-1/4  flex-1 shadow-xl"></div>
              <div className="bg-white absolute bottom-0 left-[25%] w-1/4  flex-1 shadow-xl"></div>
              <div className="bg-white absolute bottom-0 left-[50%] w-1/4  flex-1 shadow-xl"></div>
              <div className="bg-white absolute bottom-0 left-[75%] w-1/4  flex-1 shadow-xl"></div>
            </div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] z-50">
              <div
                ref={fixedImageRef2}
                className="absolute top-0 left-0 w-full h-0 bg-white"
              >
                <img
                  className="object-cover h-full w-full"
                  src="./images/r.jpg"
                />
              </div>
            </div>
            <div
              ref={lineRef2}
              className="absolute top-0 left-0 w-full h-screen"
            >
              <div className="bg-white  absolute left-0 w-1/4  flex-1 shadow-xl"></div>
              <div className="bg-white absolute left-[25%] w-1/4  flex-1 shadow-xl"></div>
              <div className="bg-white absolute left-[50%] w-1/4  flex-1 shadow-xl"></div>
              <div className="bg-white absolute left-[75%] w-1/4  flex-1 shadow-xl"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </>
  );
}
