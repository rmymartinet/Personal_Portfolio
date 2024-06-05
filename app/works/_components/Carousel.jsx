import { useNavigationStore } from "@/stateStore/Navigation";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import images from "../../data/data";
import CarouselItem from "./CarouselItems";

/*------------------------------
Plane Settings
------------------------------*/
const planeSettings = {
  width: 3,
  height: 3,
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
  const { isClickedIndex } = useNavigationStore();
  const isClickedIndexIsNull = isClickedIndex === null ? 0 : isClickedIndex;
  const [slideIndex, setSlideIndex] = useState(isClickedIndexIsNull);
  let isAnimating = useRef(false);
  const { viewport } = useThree();

  const progress = useRef(0);
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
      duration: 1,
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
      duration: 1,
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
    progress.current = progress.current += wheelProgress;

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
        {images.map((item, index) => (
          <CarouselItem
            router={router}
            width={planeSettings.width}
            height={planeSettings.height}
            setActivePlane={setActivePlane}
            activePlane={activePlane}
            slideIndex={slideIndex}
            key={item.image}
            item={item}
            index={index}
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
