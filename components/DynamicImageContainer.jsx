import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const DynamicImageContainer = ({
  imgContainerRef,
  imagesArray,
  imagesRefs,
}) => {
  const bgColor = [
    "bg-indigo-200",
    "bg-slate-200",
    "bg-blue-200",
    "bg-slate-200",
    "bg-neutral-200",
  ];
  return (
    <>
      <div
        ref={imgContainerRef}
        className="relative w-full h-full overflow-hidden"
      >
        {imagesArray.map((image, index) => (
          <div
            className={`absolute bottom-0 w-full h-full flex items-center px-10 overflow-hidden z-50 ${bgColor[index]}`}
          >
            <Image
              ref={imagesRefs[index]}
              className="shadow-2xl rounded-2xl"
              alt="Dynamic Image"
              src={image}
              layout="responsive"
              width={700}
              height={700}
              sizes="70vw"
              style={{
                width: "70%",
                height: "auto",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default DynamicImageContainer;
