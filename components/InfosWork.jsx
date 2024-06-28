import images from "@/app/data/data";
import { useIsActiveStore } from "@/store/isActive";
import gsap from "gsap";
import { useEffect, useRef } from "react";

import { useBackNavigationStore } from "@/store/BackNavigation";
import { detailTextSplitTransition } from "@/utils/Animation";
import { useGSAP } from "@gsap/react";

const InfosWork = ({ slideIndexRef, infosRef, slideIndex }) => {
  const { isActive } = useIsActiveStore();
  const image = images[slideIndex];
  const p1 = useRef(null);
  const p2 = useRef(null);
  const p3 = useRef(null);
  const p4 = useRef(null);
  const { isClicked } = useBackNavigationStore();

  /*----------------
  Animations infos
  ------------------ */
  // Animation when isActive is true
  useGSAP(
    () => {
      if (isActive) {
        gsap.to(infosRef.current, {
          opacity: 0,
          duration: 0,
        });
        gsap.to(slideIndexRef.current, {
          opacity: 0,
          duration: 0,
        });
      }
    },
    { dependencies: [isActive], scope: infosRef.current, revertOnUpdate: false }
  );

  // Animation when isClicked is true
  useGSAP(
    () => {
      if (isClicked) {
        gsap.to(infosRef.current, {
          opacity: 1,
          delay: 2,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(slideIndexRef.current, {
          opacity: 1,
          delay: 2,
          duration: 1,
          ease: "power2.out",
        });
      }
    },
    {
      dependencies: [isClicked],
      scope: infosRef.current,
      revertOnUpdate: false,
    }
  );

  useGSAP(
    () => {
      if (!isActive && !isClicked) {
        gsap.to(infosRef.current, {
          opacity: 1,
          delay: 1,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(slideIndexRef.current, {
          opacity: 1,
          delay: 1,
          duration: 1,
          ease: "power2.out",
        });
      }
    },
    {
      dependencies: [isActive, isClicked],
      scope: infosRef.current,
      revertOnUpdate: false,
    }
  );

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
      className="absolute top-[72.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[400px] pl-6 pt-2 pb-2 mt-7 space-y-1 opacity-0 -z-0"
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
