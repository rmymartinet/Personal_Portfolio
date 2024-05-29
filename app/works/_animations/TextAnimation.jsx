import gsap from "gsap";
import SplitType from "split-type";

export const textSplitTransition = (el, yposition = 200) => {
  const split = new SplitType(el);

  gsap.from(split.chars, {
    y: yposition,
    skewX: 50,
    rotation: 20,
    duration: 1,
    stagger: 0.05,
    ease: "power3.inOut",
  });
};

export const textGsapTransition = (el) => {
  const tl = gsap.timeline();

  tl.from(el, { y: 200, duration: 1, ease: "power2.Out" }).to(el, {
    y: 0,
    duration: 1,
    ease: "power2.Out",
  });

  return tl;
};
