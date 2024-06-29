"use client";

import Nav from "@/components/Nav/Nav";
import CustomScrollbar from "@/components/WorksIdComponents/CustomScrollBar";
import DynamicImageContainer from "@/components/WorksIdComponents/DynamicImageContainer";
import DynamicTextContainer from "@/components/WorksIdComponents/DynamicTextContainer";
import InfosIdWork from "@/components/WorksIdComponents/InfosWorkId";
import images from "@/data/data";
import { useBackNavigationStore } from "@/store/BackNavigation";
import { useHomeNavigationStore } from "@/store/useHomeNavigation";
import { useParamsId } from "@/store/useParamsId";
import {
  backFromWork,
  backFromWorkIdToHome,
  imagesAndTextScroll,
  resizeFlipContainer,
} from "@/utils/Animation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, Flip, Observer);

export default function Work({ params }) {
  const image = images[params.id];

  const { setIsIndex } = useParamsId();

  useEffect(() => {
    setIsIndex(images[params.id]);
  }, [images, params.id, setIsIndex]);

  const { isClicked } = useBackNavigationStore();
  const { isHomeClicked } = useHomeNavigationStore();

  const containerRef = useRef();
  const imgContainerRef = useRef();
  const textContainerRef = useRef();
  const flipContainerRef = useRef();
  const scrollRef = useRef();
  const intialImageRef = useRef();

  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [isHomeAnimationDone, setIsHomeAnimationDone] = useState(false);

  const body = document.body;

  const imagesArray = useMemo(
    () =>
      Object.keys(image)
        .filter((key) => key.startsWith("img"))
        .map((imageKey) => images[params.id][imageKey]),
    [images, params.id]
  );

  const imagesRefs = imagesArray.map(() => useRef(null));
  const nextWork = parseInt(params.id) + 1;
  const nextImage = images[nextWork];

  /*------------------------
  Resize the flip container and animate the infos content
  ----------------------------*/
  useEffect(() => {
    document.body.classList.add("no-scroll");

    const timeoutId = setTimeout(() => {
      document.body.classList.remove("no-scroll");
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      document.body.classList.remove("no-scroll");
    };
  }, []);

  /*------------------------
  Resize the flip container and animate the infos content
  ----------------------------*/
  useGSAP(resizeFlipContainer(flipContainerRef, containerRef), {
    scope: containerRef.current,
  });
  /*----------------
  Animate the images and text on scroll
  ----------------*/
  useGSAP(imagesAndTextScroll(textContainerRef, imgContainerRef, image, body), {
    scope: containerRef.current,
  });

  /*----------------
  Click Back from Work [id] to Works
  --------------- */

  useGSAP(
    () =>
      backFromWork({
        isClicked,
        imgContainerRef,
        flipContainerRef,
        setIsAnimationDone,
      }),
    {
      dependencies: [isClicked, imgContainerRef],
      scope: containerRef.current,
      revertOnUpdate: false,
    }
  );

  /*----------------
  Click Back from Work [id] to Home
  --------------- */

  useGSAP(
    () =>
      backFromWorkIdToHome({
        isHomeClicked,
        imgContainerRef,
        flipContainerRef,
        setIsHomeAnimationDone,
      }),
    {
      dependencies: [isHomeClicked, imgContainerRef],
      scope: containerRef.current,
    }
  );

  return (
    <>
      <Nav
        imageIndex={image}
        isAnimationDone={isAnimationDone}
        isHomeAnimationDone={isHomeAnimationDone}
      />

      <div className="no-scroll" ref={containerRef}>
        <div
          ref={flipContainerRef}
          className="fixed top-0 w-full h-screen overflow-hidden z-50 will-change-transform	"
          style={{
            backgroundImage: `url(${image.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <InfosIdWork image={image} containerRef={containerRef} />
          <DynamicImageContainer
            image={image}
            imgContainerRef={imgContainerRef}
            imagesRefs={imagesRefs}
            imagesArray={imagesArray}
            intialImageRef={intialImageRef}
          />
        </div>
        <DynamicTextContainer
          textContainerRef={textContainerRef}
          imagesRefs={imagesRefs}
          body={body}
          scrollRef={scrollRef}
          nextWork={nextWork}
          nextImage={nextImage}
        />
        <CustomScrollbar scrollRef={scrollRef} />
      </div>
    </>
  );
}
