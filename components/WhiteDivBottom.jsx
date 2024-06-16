import { AnimationToWorkPage } from "@/lib/Animation";
import Image from "next/image";
import { useRef } from "react";
const WhiteDivBottom = ({ isScrolling }) => {
  const lineRef = useRef(null);
  const fixedImageRef = useRef(null);

  AnimationToWorkPage(lineRef, fixedImageRef, isScrolling);
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[405px] h-[405px] z-50">
        <div
          ref={fixedImageRef}
          className="absolute bottom-0 left-0 w-full h-0 bg-white"
        >
          <Image
            className="object-cover h-full w-full"
            src="/images/margritt.jpg"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div ref={lineRef} className="absolute flex w-full h-screen z-20">
        <div className="bg-white absolute bottom-0 left-0 w-1/4  flex-1 shadow-xl"></div>
        <div className="bg-white absolute bottom-0 left-[25%] w-1/4  flex-1 shadow-xl"></div>
        <div className="bg-white absolute bottom-0 left-[50%] w-1/4  flex-1 shadow-xl"></div>
        <div className="bg-white absolute bottom-0 left-[75%] w-1/4  flex-1 shadow-xl"></div>
      </div>
    </>
  );
};

export default WhiteDivBottom;
