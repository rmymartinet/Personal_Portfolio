import { AnimationFromWorkPage } from "@/lib/Animation";
import { useWorkNavigation } from "@/stateStore/useWorkNavigation";
import { useRef } from "react";
const WhiteDivTop = () => {
  const lineRef = useRef(null);
  const fixedImageRef = useRef(null);
  const { work } = useWorkNavigation();

  AnimationFromWorkPage(lineRef, fixedImageRef);
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] z-50">
        <div
          ref={fixedImageRef}
          className="absolute top-0 left-0 w-full h-0 bg-white"
        >
          <img
            className="h-full w-full object-cover"
            src={`/images/${work}.jpg`}
            alt="Description de l'image"
            rel="preload"
          />
        </div>
      </div>
      <div ref={lineRef} className="absolute top-0 left-0 w-full h-screen">
        <div className="bg-white  absolute left-0 w-1/4  flex-1 shadow-xl"></div>
        <div className="bg-white absolute left-[25%] w-1/4  flex-1 shadow-xl"></div>
        <div className="bg-white absolute left-[50%] w-1/4  flex-1 shadow-xl"></div>
        <div className="bg-white absolute left-[75%] w-1/4  flex-1 shadow-xl"></div>
      </div>
    </>
  );
};

export default WhiteDivTop;
