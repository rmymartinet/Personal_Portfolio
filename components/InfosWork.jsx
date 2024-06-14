import images from "@/app/data/data";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useNavigationStore } from "@/stateStore/Navigation";
import { useIsActiveStore } from "@/stateStore/isActive";
import gsap from "gsap";
import { useEffect } from "react";

const InfosWork = ({ setShowImage, slideIndexRef, infosRef, slideIndex }) => {
  const { isActive } = useIsActiveStore();
  const { isClicked } = useBackNavigationStore();
  const { isClickedIndex } = useNavigationStore();
  const image = images[slideIndex];
  const timeOut = [750, 770, 900];

  /*----------------
  Animations infos
  ------------------ */

  useEffect(() => {
    let animation;

    if (!isActive) {
      animation = gsap.fromTo(
        infosRef.current,
        {
          opacity: 0,
        },
        {
          delay: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      );
      animation = gsap.fromTo(
        slideIndexRef.current,
        {
          opacity: 0,
        },
        {
          delay: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      );
    } else {
      if (animation) {
        animation.kill();
      }

      gsap.to(infosRef.current, {
        opacity: 0,
        duration: 0,
      });
      gsap.to(slideIndexRef.current, {
        opacity: 0,
        duration: 0,
      });
    }
    return () => {
      if (animation) {
        animation.kill();
      }
    };
  }, [isActive]);

  useEffect(() => {
    let timeoutId;

    if (isClicked) {
      setShowImage(true);
      timeoutId = setTimeout(() => {
        setShowImage(false);
      }, timeOut[isClickedIndex] || 0);
    }

    return () => clearTimeout(timeoutId);
  }, [isClicked]);

  return (
    <div
      ref={infosRef}
      className="absolute top-[72.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[400px] pl-6 pt-2 pb-2 mt-7 space-y-1"
      style={{ backgroundColor: "#FCFCFC" }}
    >
      <p className="font-semibold">Title</p>
      <div
        className="flex flex-wrap text-sm gap-2"
        style={{ color: "#969696" }}
      >
        <p>{`Year : ${image.year}`}</p>
        <p>|</p>
        <p>{`Role : ${image.role} `}</p>
        <p>{`Type : ${image.type}`}</p>
        <p>|</p>
        <p>{`Client : ${image.client}`}</p>
      </div>
    </div>
  );
};

export default InfosWork;
