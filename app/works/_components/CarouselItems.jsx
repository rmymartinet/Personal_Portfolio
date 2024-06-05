import { useNavigationStore } from "@/stateStore/Navigation";
import { useIsActiveStore } from "@/stateStore/isActive";
import { useIsHoverStore } from "@/stateStore/isHover";
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
  }, [activePlane, index]);

  /*------------------------------
  Animation slide
  ------------------------------*/

  // Initial setting of the position and scale based on the active slide
  useEffect(() => {
    if ($root.current) {
      gsap.set($root.current.position, {
        x: slideIndex === index ? 0 : -40,
      });
      gsap.set($root.current.scale, {
        y: slideIndex === index ? 1 : 0,
      });
    }
  }, [slideIndex]);

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
