import useStore from "@/stateStore/CanvaDimension";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Plane from "./Plane";

const CarouselItem = ({
  index,
  width,
  height,
  setActivePlane,
  activePlane,
  slideIndex,
  isAnimating,
  item,
}) => {
  const $root = useRef();
  const [hover, setHover] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isCloseActive, setCloseActive] = useState(false);
  const { viewport } = useThree();
  const timeoutID = useRef();
  const { setIsClicked } = useStore();

  useEffect(() => {
    if (activePlane === index) {
      setIsActive(activePlane === index);
      setCloseActive(true);
    } else {
      setIsActive(null);
    }
  }, [activePlane, index]);

  useEffect(() => {
    if ($root.current) {
      gsap.killTweensOf($root.current.position);
      gsap.killTweensOf($root.current.scale);

      if (slideIndex === index) {
        gsap.to($root.current.position, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.inOut",
          onComplete: () => {
            isAnimating.current = false;
          },
        });

        gsap.to($root.current.scale, {
          x: 1,
          y: 1,
          duration: 1.5,
          ease: "power3.inOut",
          onComplete: () => {
            isAnimating.current = false;
          },
        });
      } else {
        gsap.to($root.current.position, {
          x: slideIndex % 2 !== 0 ? -100 : 100,
          opacity: 0,
          duration: 1.5,
          ease: "power3.inOut",
          onComplete: () => {
            isAnimating.current = false;
          },
        });
        gsap.to($root.current.scale, {
          x: 0,
          y: 0,
          duration: 1.5,
          ease: "power3.inOut",
          onComplete: () => {
            isAnimating.current = false;
          },
        });
      }
    }
  }, [slideIndex, isAnimating]);

  /*------------------------------
  Hover effect
  ------------------------------*/
  // useEffect(() => {
  //   const hoverScale = hover && !isActive ? 1.1 : 1;
  //   gsap.to($root.current.scale, {
  //     x: hoverScale,
  //     y: hoverScale,
  //     duration: 0.5,
  //     ease: "power3.out",
  //   });
  // }, [hover, isActive]);

  const handleClose = (e) => {
    e.stopPropagation();
    if (!isActive) return;
    setActivePlane(null);
    setHover(false);
    clearTimeout(timeoutID.current);
    timeoutID.current = setTimeout(() => {
      setCloseActive(false);
    }, 1500); // The duration of this timer depends on the duration of the plane's closing animation.
  };

  return (
    <group
      ref={$root}
      onClick={() => {
        setActivePlane(index);
        setIsClicked(true);
      }}
      // onPointerEnter={() => setHover(true)}
      // onPointerLeave={() => setHover(false)}
    >
      <Plane
        width={width}
        height={height}
        texture={item.image}
        active={isActive}
      />

      {isCloseActive ? (
        <mesh position={[0, 0, 0.01]} onClick={handleClose}>
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial transparent={true} opacity={0} color={"red"} />
        </mesh>
      ) : null}
    </group>
  );
};

export default CarouselItem;
