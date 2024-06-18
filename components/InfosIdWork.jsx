import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

const InfosIdWork = ({ image, containerRef }) => {
  const infosContentRef = useRef();
  const { isClicked } = useBackNavigationStore();

  /*-------------------
  Infos Content on page load
--------------------*/

  useGSAP(() => {
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
  });

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (isClicked) {
      gsap.to(infosContentRef.current, {
        opacity: 0,
        duration: 0,
      });
    }
  }, [isClicked]);

  return (
    <div
      ref={infosContentRef}
      className="absolute bottom-0 left-0 transform  h-screen w-[35%] px-10 py-20 flex flex-col bg-white z-50 "
    >
      <div>
        <p className="text-6xl px-2 font-light">{image.number}.</p>
        <h1 className="text-9xl italic leading-[6.5rem]">{image.title}</h1>
      </div>
      <div className="mt-16 mb-5">
        <p className="text-lg tracking-wider uppercase">Rebranding</p>
        <p className="text-sm opacity-40">May 2021</p>
      </div>
      <div className="font-semibold">
        <p>{image.subtitle}</p>
      </div>
      <div className="h-[3px] w-full bg-black  mt-5 mb-5"></div>
      <div className="grid grid-cols-2 gap-20">
        <div className="flex flex-col gap-10">
          <div className="mb-10">
            <span className="font-semibold">Client:</span>
            <p>{image.clientInfos}</p>
          </div>
          <div>
            <span className="font-semibold">Brief:</span>
            <p>{image.brief}</p>
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <div>
            <span className="font-semibold">Demographic:</span>
            <p>{image.demographic}</p>
          </div>
          <div className="">
            <span className="font-semibold">Concept:</span>
            <p>{image.concept}</p>
          </div>
          <div className="">
            <span className="font-semibold">Delivrables:</span>
            <p>{image.deliverables1}</p>
            <p>{image.deliverables2}</p>
            <p>{image.deliverables3}</p>
          </div>
          <Link
            href={"https://margritt.com/"}
            className="hover font-semibold cursor-pointer text-lg"
          >
            Visit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfosIdWork;
