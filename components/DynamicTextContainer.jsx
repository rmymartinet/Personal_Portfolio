import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const DynamicTextContainer = ({ textContainerRef, imagesRefs }) => {
  const divRefs = useRef([]);

  useEffect(() => {
    divRefs.current = divRefs.current.slice(0, imagesRefs.length);
  }, [imagesRefs]);

  /*---------------
   Animate textContainer and imgContainer 
------------------*/
  useGSAP(() => {
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
    });
  });
  return (
    <>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div
        ref={textContainerRef}
        className="absolute right-0 p-20 w-1/2 text-2xl "
      >
        {["Title 1", "Title 2", "Title 3", "Title 3", "Title 3"].map(
          (title, index) => (
            <div
              ref={(el) => (divRefs.current[index] = el)}
              key={index}
              className="h-[80vh] flex flex-col items-center gap-20 justify-center text-center"
            >
              <h1 className="text-2xl">{title}</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                ullam atque dolorem quia modi assumenda ab, at vero odit
                perspiciatis maiores aliquam deserunt error? Asperiores
                voluptatibus laboriosam rerum dolores qui!
              </p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default DynamicTextContainer;
