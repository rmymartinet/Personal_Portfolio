import { dynamicTextAndImg, nextWorkAnimation } from "@/utils/Animation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const DynamicTextContainer = ({
  textContainerRef,
  imagesRefs,
  scrollRef,
  nextImage,
  nextWork,
}) => {
  const divRefs = useRef([]);
  const jref = useRef();
  const router = useRouter();

  useEffect(() => {
    divRefs.current = divRefs.current.slice(0, 8);
  }, [imagesRefs]);

  /*---------------
   Animate textContainer and imgContainer 
------------------*/

  useGSAP(() => dynamicTextAndImg({ imagesRefs, divRefs, scrollRef }), {
    dependencies: [imagesRefs, divRefs, scrollRef],
  });

  useGSAP(() => nextWorkAnimation({ divRefs, jref, nextWork, router }), {
    dependencies: [nextWork, divRefs, jref, router],
  });

  return (
    <>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div
        ref={textContainerRef}
        className="absolute right-0 p-20 w-1/2 text-2xl"
      >
        {[...Array(9).keys()].map((index) => (
          <div
            ref={(el) => (divRefs.current[index] = el)}
            key={index}
            className="h-[80vh] flex flex-col items-center gap-20 justify-center text-center"
          >
            <h1 className="text-2xl"></h1>
          </div>
        ))}
      </div>
      <div
        ref={jref}
        className="fixed bottom-0 w-full h-0 z-50"
        style={{
          backgroundImage: `url(${nextImage.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </>
  );
};

export default DynamicTextContainer;
