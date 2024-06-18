import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const DynamicTextContainer = ({ textContainerRef, imagesRefs, scrollRef }) => {
  const divRefs = useRef([]);

  useEffect(() => {
    divRefs.current = divRefs.current.slice(0, imagesRefs.length);
  }, [imagesRefs]);

  /*---------------
   Animate textContainer and imgContainer 
------------------*/
  useGSAP(
    () => {
      const images = imagesRefs
        .map((ref) => ref.current)
        .filter((el) => el !== null);

      const triggers = divRefs.current.filter((el) => el !== null);

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
          const scrollRefChildren = gsap.utils.toArray(
            scrollRef.current.children
          );

          const childrenToAnimate = scrollRefChildren.slice(
            index * 6,
            index * 6 + 6
          );

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
        }
      });
    },
    { dependencies: [imagesRefs, scrollRef] }
  );
  return (
    <>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div
        ref={textContainerRef}
        className="absolute right-0 p-20 w-1/2 text-2xl "
      >
        {[...Array(5).keys()].map((index) => (
          <div
            ref={(el) => (divRefs.current[index] = el)}
            key={index}
            className="h-[80vh] flex flex-col items-center gap-20 justify-center text-center"
          >
            <h1 className="text-2xl"></h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default DynamicTextContainer;
