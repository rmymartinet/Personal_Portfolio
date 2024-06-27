import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const DynamicTextContainer = ({
  textContainerRef,
  imagesRefs,
  scrollRef,
  nextImage,
  nextWork,
}) => {
  const divRefs = useRef([]);
  const jref = useRef();
  const router = useRouter();

  useEffect(() => {
    divRefs.current = divRefs.current.slice(0, 8);
  }, [imagesRefs]);

  /*---------------
   Animate textContainer and imgContainer 
------------------*/
  useEffect(() => {
    const images = imagesRefs
      .map((ref) => ref.current)
      .filter((el) => el !== null);

    const triggers = divRefs.current.slice(0, 6).filter((el) => el !== null);
    triggers.forEach((trigger, index) => {
      gsap.fromTo(
        images[index],
        {
          yPercent: 15,
        },
        {
          yPercent: 0,
          scrollTrigger: {
            trigger: trigger,
            start: "top 105%",
            end: "+=200%",
            scrub: 5,
          },
        }
      );

      /*---------------
  Scroll Animation trigger
  -------------------*/

      if (scrollRef && scrollRef.current) {
        const scrollRefChildren = gsap.utils.toArray(
          scrollRef.current.children
        );

        const childrenToAnimate = scrollRefChildren.slice(
          index * 6,
          index * 6 + 6
        );

        let ctx = gsap.context(() => {
          gsap.to(childrenToAnimate, {
            stagger: 0.2,
            backgroundColor: "red",
            scrollTrigger: {
              trigger: trigger,
              start: "top 105%",
              end: "+=200%",
              scrub: 1,
            },
          });
        });

        return () => {
          ctx.revert();
        };
      }
    });
  }, [imagesRefs, scrollRef]);

  useEffect(() => {
    const triggers = divRefs.current.slice(5, 6).filter((el) => el !== null);
    const endTriggers = divRefs.current.slice(7, 8).filter((el) => el !== null);

    gsap.to(jref.current, {
      height: "100%",
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: triggers,
        start: "top top",
        endTrigger: endTriggers,
        end: "bottom bottom",
        scrub: 1,
        onLeave: () => {
          setTimeout(() => {
            router.push(`/works/${nextWork}`);
          }, 2000);
        },
      },
    });
  }, [nextWork, router]);

  return (
    <>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div
        ref={textContainerRef}
        className="absolute right-0 p-20 w-1/2 text-2xl"
      >
        {[...Array(9).keys()].map((index) => (
          <div
            ref={(el) => (divRefs.current[index] = el)}
            key={index}
            className="h-[80vh] flex flex-col items-center gap-20 justify-center text-center"
          >
            <h1 className="text-2xl"></h1>
          </div>
        ))}
      </div>
      <div
        ref={jref}
        className="fixed bottom-0 w-full h-0 z-50"
        style={{
          backgroundImage: `url(${nextImage.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </>
  );
};

export default DynamicTextContainer;
