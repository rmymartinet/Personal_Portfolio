import { preloadImage } from "@/components/PreloadImg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP);

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

/*----------------
  Work Page Animation
  ------------------ */

export const hoverAnimation = (isHover, infosRef) => () => {
  if (isHover) {
    gsap.to(infosRef.current, {
      top: "74.5%",
      duration: 0.5,
      ease: "power3.out",
    });
  } else {
    gsap.to(infosRef.current, {
      top: "72.5%",
      duration: 0.5,
      ease: "power3.out",
    });
  }
};

/*----------------
  Used by InfosWork Animation 
   ------------------ */

export const activeAnimation =
  (isActive, ...refs) =>
  () => {
    if (isActive) {
      refs.forEach((ref) => {
        gsap.to(ref.current, {
          opacity: 0,
          duration: 0,
        });
      });
    }
  };

export const clickedAnimation = (isClicked, blockInvisibleRef) => () => {
  if (isClicked === true) {
    gsap.set(blockInvisibleRef.current, {
      opacity: 0,
      duration: 0,
      onComplete: () => {
        setTimeout(() => {
          gsap.set(blockInvisibleRef.current, {
            opacity: 1,
            duration: 0,
          });
        }, 3000);
      },
    });
  }
};

/*----------------
  page [id] Animation 
   ------------------ */
export const resizeFlipContainer = (flipContainerRef, containerRef) => {
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
};

export const imagesAndTextScroll = (
  textContainerRef,
  imgContainerRef,
  images,
  body
) => {
  if (textContainerRef.current && imgContainerRef.current) {
    const bgColor = [
      "rgb(224 231 255);",
      "rgb(226 232 240))",
      "rgb(219 234 254)",
      "rgb(226 232 240))",
      "rgb(245 245 245)",
    ];

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
};

export const backFromWork = ({
  isClicked,
  imgContainerRef,
  flipContainerRef,
  setIsAnimationDone,
}) => {
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
};

export const backFromWorkIdToHome = ({
  isHomeClicked,
  imgContainerRef,
  flipContainerRef,
}) => {
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
};

/*----------------
  Dynamic Text and Image Animation
   ------------------ */
export const dynamicTextAndImg = ({ imagesRefs, divRefs, scrollRef }) => {
  const images = imagesRefs
    .map((ref) => ref.current)
    .filter((el) => el !== null);

  const triggers = divRefs.current.slice(0, 6).filter((el) => el !== null);
  triggers.forEach((trigger, index) => {
    gsap.fromTo(
      images[index],
      {
        yPercent: 15,
      },
      {
        yPercent: 0,
        scrollTrigger: {
          trigger: trigger,
          start: "top 105%",
          end: "+=200%",
          scrub: 5,
        },
      }
    );

    /*---------------
Scroll Animation trigger
-------------------*/

    if (scrollRef && scrollRef.current) {
      const scrollRefChildren = gsap.utils.toArray(scrollRef.current.children);

      const childrenToAnimate = scrollRefChildren.slice(
        index * 6,
        index * 6 + 6
      );

      let ctx = gsap.context(() => {
        gsap.to(childrenToAnimate, {
          stagger: 0.2,
          backgroundColor: "red",
          scrollTrigger: {
            trigger: trigger,
            start: "top 105%",
            end: "+=200%",
            scrub: 1,
          },
        });
      });

      return () => {
        ctx.revert();
      };
    }
  });
};

export const nextWorkAnimation = ({ divRefs, jref, nextWork, router }) => {
  const triggers = divRefs.current.slice(5, 6).filter((el) => el !== null);
  const endTriggers = divRefs.current.slice(7, 8).filter((el) => el !== null);
  gsap.to(jref.current, {
    height: "100%",
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: triggers,
      start: "top top",
      endTrigger: endTriggers,
      end: "bottom bottom",
      scrub: 1,
      onLeave: () => {
        setTimeout(() => {
          router.push(`/works/${nextWork}`);
        }, 2000);
      },
    },
  });
};

/*----------------
 InfosWorkId
   ------------------ */

export const animateOnLoad = (infosContentRef) => {
  gsap.fromTo(
    infosContentRef.current,
    {
      xPercent: -100,
    },
    {
      xPercent: 0,
      duration: 2,
      ease: "power2.out",
    }
  );
};

export const animateOnScroll = (infosContentRef, containerRef) => {
  gsap.fromTo(
    infosContentRef.current,
    { xPercent: 0 },
    {
      xPercent: -500,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    }
  );
};

export const animateOnNavigationChange = (
  isClicked,
  isHomeClicked,
  infosContentRef
) => {
  if (isClicked || isHomeClicked) {
    gsap.to(infosContentRef.current, {
      opacity: 0,
      duration: 0,
    });
  }
};
