import { useBackNavigationStore } from "@/store/BackNavigation";
import { useHomeNavigationStore } from "@/store/useHomeNavigation";
import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

const InfosIdWork = ({ image, containerRef }) => {
  const infosContentRef = useRef();
  const { isClicked } = useBackNavigationStore();
  const { isHomeClicked } = useHomeNavigationStore();

  /*-------------------
  Infos Content on page load
--------------------*/

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
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
    });

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (isClicked || isHomeClicked) {
      gsap.to(infosContentRef.current, {
        opacity: 0,
        duration: 0,
      });
    }
  }, [isClicked, isHomeClicked]);

  return (
    <div
      ref={infosContentRef}
      className="absolute bottom-0 left-0 transform h-screen px-10 pr-20 py-20 flex flex-col bg-white w-[fit-content] z-50"
    >
      <div>
        <p className="text-6xl px-2 font-light">{image.number}.</p>
        <h1 className="text-[7vw] italic leading-[6.5rem]">{image.title}</h1>
      </div>

      <div className="relative mt-20">
        <div className="absolute left-0 w-full">
          <div className="mt-16 mb-5">
            <p className="text-lg tracking-wider uppercase">Rebranding</p>
            <p className="text-sm opacity-40">May 2021</p>
          </div>
          <div className="font-semibold">
            <p>{image.subtitle}</p>
          </div>
          <div className="h-[3px] w-full bg-black  mt-5 mb-5"></div>
          <div className="grid grid-cols-2 gap-20 ">
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
            <div className="flex flex-col gap-12 ml-10">
              <div className="">
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
      </div>
    </div>
  );
};

export default InfosIdWork;
