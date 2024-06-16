import images from "@/app/data/data";
import { useBackNavigationStore } from "@/stateStore/BackNavigation";
import { useNavigationStore } from "@/stateStore/Navigation";
import { useIsActiveStore } from "@/stateStore/isActive";
import gsap from "gsap";
import { useEffect, useRef } from "react";

import { detailTextSplitTransition } from "@/lib/Animation";

const InfosWork = ({ setShowImage, slideIndexRef, infosRef, slideIndex }) => {
  const { isActive } = useIsActiveStore();
  const { isClicked } = useBackNavigationStore();
  const { isClickedIndex } = useNavigationStore();
  const image = images[slideIndex];
  const timeOut = [750, 770, 900];
  const p1 = useRef(null);
  const p2 = useRef(null);
  const p3 = useRef(null);
  const p4 = useRef(null);

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

  useEffect(() => {
    // Remettre le texte à son état non divisé
    p1.current.textContent = image.year;
    p2.current.textContent = image.role;
    p3.current.textContent = image.type;
    p4.current.textContent = image.client;

    // Appeler la fonction detailTextSplitTransition et obtenir la fonction de nettoyage
    const cleanup1 = detailTextSplitTransition(p1.current);
    const cleanup2 = detailTextSplitTransition(p2.current);
    const cleanup3 = detailTextSplitTransition(p3.current);
    const cleanup4 = detailTextSplitTransition(p4.current);

    // Retourner une fonction de nettoyage qui appelle toutes les fonctions de nettoyage
    return () => {
      cleanup1();
      cleanup2();
      cleanup3();
      cleanup4();
    };
  }, [slideIndex]);

  return (
    <div
      ref={infosRef}
      className="absolute top-[72.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[400px] pl-6 pt-2 pb-2 mt-7 space-y-1"
      style={{ backgroundColor: "#FCFCFC" }}
    >
      <p className="font-semibold">{image.title}</p>
      <div className="flex flex-wrap text-sm gap-2 overflow-hidden opacity-40">
        <p className="flex gap-2 overflow-hidden">
          Year : <span ref={p1}> {image.year} </span>
        </p>
        <p>|</p>
        <p className="flex gap-2 overflow-hidden">
          Role : <span ref={p2}> {image.role} </span>
        </p>
        <p className="flex gap-2 overflow-hidden">
          Type : <span ref={p3}> {image.type} </span>
        </p>
        <p>|</p>
        <p className="flex gap-2 overflow-hidden">
          Client : <span ref={p4}> {image.client} </span>
        </p>
      </div>
    </div>
  );
};

export default InfosWork;
