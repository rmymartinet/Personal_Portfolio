import { preloadImage } from "@/components/PreloadImg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import SplitType from "split-type";

export function AnimationToWorkPage(lineRef, fixedImageRef, isScrolling) {
  gsap.registerPlugin(ScrollTrigger);

  const router = useRouter();

  /*-------------
  Transition animation to works page
  -------------- */
  useGSAP(
    () => {
      if (!lineRef.current || !fixedImageRef.current) return;
      const fixedImageRefElement = fixedImageRef.current;
      const lineRefElement = lineRef.current.children;

      let context = gsap.context(() => {
        /*---------
          Fixed image animation
          ----------- */

        // Pre-set the fixed image height to 0%
        gsap.set(fixedImageRefElement, {
          height: "0%",
          zIndex: "110",
        });

        gsap.set(lineRefElement, {
          height: "0%",
          zIndex: "100",
        });

        /*---------
          Line animation
          ----------- */

        const tl = gsap.timeline();

        tl.fromTo(
          lineRefElement,
          {
            height: "0vh",
          },
          {
            height: "100vh",
            duration: 1.5,
            stagger: 0.1,
            ease: "power2.out",
          }
        );

        tl.to(
          fixedImageRefElement,
          {
            height: "100%",
            duration: 1.5,
            ease: "power2.out",
            onComplete: async () => {
              await preloadImage("/images/margritt/margritt.jpg");
              router.push("/works");
            },
          },
          "0.2"
        );
      });

      return () => {
        context.kill();
      };
    },
    { dependencies: [isScrolling] }
  );
}

export function AnimationFromWorkPage(lineRef2, fixedImageRef2) {
  useGSAP(() => {
    const lineRef = lineRef2.current.children;
    const fixedImageRef = fixedImageRef2.current;
    if (!lineRef2.current || !fixedImageRef2.current) return;
    let context = gsap.context(() => {
      /*---------
      Fixed image animation
      ----------- */

      gsap.set(fixedImageRef, {
        height: "100%",
      });

      gsap.to(fixedImageRef, {
        delay: 0.2,
        height: "0%",
        duration: 1,
        ease: "power2.Out",
      });

      /*---------
      Line animation
      ----------- */

      gsap.fromTo(
        lineRef,
        {
          height: "100vh",
        },
        {
          delay: 0.5,
          height: "0vh",
          duration: 1.5,
          stagger: 0.1,
          ease: "power2.Out",
        }
      );
    });

    return () => {
      context.kill();
    };
  });
}

export const textSplitTransition = (el, yposition = 200) => {
  const split = new SplitType(el);

  gsap.from(split.chars, {
    y: yposition,
    skewX: 50,
    rotation: 20,
    duration: 1,
    stagger: 0.05,
    ease: "power3.inOut",
  });
};

export const textGsapTransition = (el) => {
  const tl = gsap.timeline();

  tl.from(el, { y: 200, duration: 1, ease: "power2.Out", rotateX: 90 }).to(el, {
    delay: 1,
    y: 0,
    rotateX: 0,
    duration: 2,
    ease: "power2.Out",
  });

  return tl;
};

export const detailTextSplitTransition = (el, duration = 1) => {
  const split = new SplitType(el);

  gsap.from(split.chars, {
    y: 50,
    rotateX: 90,
    duration: duration,
    stagger: 0.01,
    ease: "power3.inOut",
  });

  return () => {
    split.revert();
  };
};

export const numberSplitAnimation = (el) => {
  const split = new SplitType(el);

  gsap.from(split.chars, {
    x: -200,
    duration: 1,
    stagger: 0.05,
    ease: "power3.inOut",
  });

  return () => {
    split.revert();
  };
};
