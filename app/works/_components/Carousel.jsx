import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { usePrevious } from "react-use";
import images from "../../data/data";
import CarouselItem from "./CarouselItems";

/**
 * !TODO Corriger l'apprition flash des images entre le scroll
 */

/*------------------------------
Plane Settings
------------------------------*/
const planeSettings = {
  width: 2.5,
  height: 2.5,
};

/*------------------------------
Gsap Defaults
------------------------------*/
gsap.defaults({
  duration: 2.5,
  ease: "power3.out",
});

/*------------------------------
Carousel
------------------------------*/
const Carousel = () => {
  const router = useRouter();
  const [$root, setRoot] = useState();
  const [activePlane, setActivePlane] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const prevActivePlane = usePrevious(activePlane);
  let isAnimating = useRef(false);
  const { viewport } = useThree();

  const progress = useRef(0);
  const speedWheel = 0.01;
  const $items = useMemo(() => {
    if ($root) return $root.children;
  }, [$root]);

  /*--------------------
  AnimateSlide
  --------------------*/

  const showSlide = (index) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const slide = $items[index];

    gsap.to(slide.position, {
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  };

  function hideSlide(index) {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const slide = $items[index];

    gsap.to(slide.position, {
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }

  /*--------------------
  Handle Wheel
  --------------------*/
  const handleWheel = (e) => {
    if (activePlane !== null) return;
    if (isAnimating.current) return;
    const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
    const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX;
    progress.current = progress.current + wheelProgress * speedWheel;

    if (progress.current > 0 && slideIndex < $items.length - 1) {
      hideSlide(slideIndex);
      showSlide(slideIndex + 1);
      setSlideIndex(slideIndex + 1);
    } else if (progress.current < 0 && slideIndex > 0) {
      hideSlide(slideIndex);
      setSlideIndex(slideIndex - 1);
      showSlide(slideIndex - 1);
    }
  };

  /*--------------------
  Render Plane Events
  --------------------*/
  const renderPlaneEvents = () => {
    return (
      <mesh position={[0, 0, -0.01]} onWheel={handleWheel}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial transparent={true} opacity={0} />
      </mesh>
    );
  };

  /*--------------------
  Render Slider
  --------------------*/
  const renderSlider = () => {
    return (
      <group ref={setRoot}>
        {images.map((item, i) => (
          <CarouselItem
            router={router}
            width={planeSettings.width}
            height={planeSettings.height}
            setActivePlane={setActivePlane}
            activePlane={activePlane}
            slideIndex={slideIndex}
            key={item.image}
            item={item}
            index={i}
            isAnimating={isAnimating}
          />
        ))}
      </group>
    );
  };

  return (
    <group>
      {renderPlaneEvents()}
      {renderSlider()}
    </group>
  );
};

export default Carousel;
