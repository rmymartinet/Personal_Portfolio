import { useNavigationStore } from "@/store/Navigation";
import { useIsActiveStore } from "@/store/isActive";
import { useIsHoverStore } from "@/store/isHover";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Plane from "./Plane";

const CarouselItem = ({
  index,
  width,
  height,
  setActivePlane,
  activePlane,
  slideIndex,
  item,
  router,
}) => {
  const $root = useRef();
  const { isActive, setIsActive } = useIsActiveStore();
  const { setIsClickedIndex } = useNavigationStore();
  const { isHover, setIsHover } = useIsHoverStore();

  useEffect(() => {
    if (activePlane === index) {
      setIsActive(true);
      setIsHover(false);
    }
  }, [activePlane, index, setIsActive, setIsHover]);

  /*------------------------------
  Animation slide
  ------------------------------*/

  // Initial setting of the position and scale based on the active slide
  useEffect(() => {
    if ($root.current) {
      const tl = gsap.timeline();
      if (slideIndex === index) {
        tl.to($root.current.position, {
          x: 0,
          duration: 1,
          ease: "power2.out",
        });
      } else {
        tl.to($root.current.position, {
          x: -10,
          duration: 1,
          ease: "power2.out",
        });
      }
    }
  }, [slideIndex, index]);

  useEffect(() => {
    if (slideIndex !== index && isActive) {
      gsap.to($root.current.position, {
        x: -1000,
        duration: 0,
      });
    }
  }, [isActive]);

  /*------------------------------
  Hover effect
  ------------------------------*/
  useEffect(() => {
    const hoverScale = isHover && !isActive ? 1.1 : 1;
    gsap.to($root.current.scale, {
      x: hoverScale,
      y: hoverScale,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [isHover, isActive]);

  return (
    <group
      ref={$root}
      onClick={() => {
        setActivePlane(index);
        setIsClickedIndex(index);
      }}
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}
    >
      <Plane
        width={width}
        height={height}
        texture={item.image}
        router={router}
      />
    </group>
  );
};

export default CarouselItem;
