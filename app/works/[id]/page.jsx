"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Scene = dynamic(() => import("../../works/_components/Scene"), {
  ssr: false,
});

export default function Work() {
  const flipRef = useRef();

  return (
    <div className="w-full h-screen bg-blue-500 flex items-center justify-center">
      <Scene canvasCount={1} />
    </div>
  );
}
