import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

export function AnimationToWorkPage(lineRef, fixedImageRef, isScrolling) {
  gsap.registerPlugin(ScrollTrigger);

  const router = useRouter();

  /*-------------
  Transition animation to works page
  -------------- */
  useGSAP(
    () => {
      if (!lineRef.current || !fixedImageRef.current) return;

      if (isScrolling) {
        let context = gsap.context(() => {
          /*---------
          Fixed image animation
          ----------- */
          const fixedImageRefElement = fixedImageRef.current;

          // Pre-set the fixed image height to 0%
          gsap.set(fixedImageRefElement, {
            height: "0%",
          });

          /*---------
          Line animation
          ----------- */
          const lineRefElement = lineRef.current.children;

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
            },
            "0.2"
          );

          // Navigate to /works after the animations complete
          tl.add(() => {
            router.push("/works");
          });
        });

        return () => {
          context.kill();
        };
      }
    },
    { dependencies: [isScrolling] }
  );
}

export function AnimationFromWorkPage(lineRef2, fixedImageRef2) {
  useGSAP(() => {
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
        delay: 0.2,
        height: "0%",
        duration: 1,
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
