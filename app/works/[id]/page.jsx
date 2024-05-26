"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * !TODO: Améliorer le chargement de l'image au premier rendu / Scene
 * !TODO: Voir  pour la taille de l'image par rapport à la Scene
 * !TODO: Faire la transition entre l'image et la scene
 */

export default function Work() {
  return (
    <>
      <div className="">
        <div className=" relative flex items-end justify-around h-screen w-[100vw">
          <div className="flex w-full h-screen  items-center justify-center">
            {/* <Canvas>
              <Suspense fallback={null}>
                <CarouselItem />
              </Suspense>
            </Canvas> */}
            <img
              className="w-full h-full object-cover"
              src="https://raw.githubusercontent.com/supahfunk/webgl-carousel/main/public/img/1.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
