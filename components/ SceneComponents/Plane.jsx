import { useBackNavigationStore } from "@/store/BackNavigation";
import { useNavigationStore } from "@/store/Navigation";
import { useIsActiveStore } from "@/store/isActive";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import { LinearFilter } from "three";
import images from "../../data/data";

const Plane = ({ hover, router, texture, width, height, active, ...props }) => {
  const $mesh = useRef();
  const { viewport } = useThree();
  const tex = useTexture(texture);
  tex.minFilter = LinearFilter;
  const { isActive, setIsActive } = useIsActiveStore();
  const { isClicked, setIsClicked } = useBackNavigationStore();
  const { isClickedIndex } = useNavigationStore();

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  /*--------------------
  Animate Plane to full screen
  --------------------*/

  useEffect(() => {
    /*--------------------
  Animate Plane to the other page
  --------------------*/
    if ($mesh.current.material) {
      //  Setting the 'uZoomScale' uniform in the 'Plane' component to resize the texture proportionally to the dimensions of the viewport.
      $mesh.current.material.uniforms.uZoomScale.value.x =
        viewport.width / width;
      $mesh.current.material.uniforms.uZoomScale.value.y =
        viewport.height / height;

      if (isActive === true && isClicked === false) {
        gsap.to($mesh.current.material.uniforms.uProgress, {
          value: isActive ? 1 : 0,
          duration: 1.7,
          ease: "power2.inOut,",
        });

        gsap.to($mesh.current.material.uniforms.uRes.value, {
          x: isActive ? viewport.width : width,
          y: isActive ? viewport.height : height,
          duration: 1.7,
          ease: "power2.inOut,",
          onComplete: async () => {
            if (isActive) {
              await preloadImage(images[isClickedIndex].image);
              router.push(`works/${isClickedIndex}`);
            }
            setTimeout(() => {
              setIsActive(false);
            }, 700);
          },
        });
      }

      /*--------------------
  Animate Plane back to its original position
  --------------------*/

      if (isClicked === true && isActive === false) {
        let time = setTimeout(() => {
          gsap.from($mesh.current.material.uniforms.uProgress, {
            value: 1,
            duration: 1.7,
            ease: "power2.inOut,",
          });
          gsap.to($mesh.current.material.uniforms.uProgress, {
            value: 0,
            duration: 1.7,
            ease: "power2.inOut,",
            onComplete: () => {
              setIsClicked(false);
            },
          });
          gsap.from($mesh.current.material.uniforms.uRes.value, {
            x: viewport.width,
            y: viewport.height,
            duration: 1.7,
            ease: "power2.inOut,",
          });

          gsap.to($mesh.current.material.uniforms.uRes.value, {
            x: width,
            y: height,
            duration: 1.7,
            ease: "power2.inOut,",
          });
        }, 1000);

        return () => {
          clearTimeout(time);
        };
      }
    }
  }, [
    viewport,
    isActive,
    isClicked,
    isClickedIndex,
    setIsActive,
    router,
    width,
    height,
  ]);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uProgress: { value: 0 },
        uZoomScale: { value: { x: 1, y: 1 } },
        uTex: { value: tex },
        uRes: { value: { x: 1, y: 1 } },
        uImageRes: {
          value: { x: tex.source.data.width, y: tex.source.data.height },
        },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        uniform float uProgress;
        uniform vec2 uZoomScale;

        void main() {
          vUv = uv;
          vec3 pos = position;
          float angle = uProgress * 3.14159265 / 2.;
          float wave = cos(angle);
          float c = sin(length(uv - vec2(1.0, 1.0)) * 10. + uProgress * 12.) * .5 + .5;
          vec2 modifiedUv = vec2(1.0 - uv.x, 1.0 - uv.y);
          pos.x *= mix(1., uZoomScale.x + wave * c, uProgress);
          pos.y *= mix(1., uZoomScale.y + wave * c, uProgress);
      
          gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
        }
      `,
      fragmentShader: /* glsl */ `
      uniform sampler2D uTex;
      uniform vec2 uRes;
      uniform vec2 uZoomScale;
      uniform vec2 uImageRes;

      /*------------------------------
      Background Cover UV
      --------------------------------
      u = basic UV
      s = screensize
      i = image size
      ------------------------------*/
      vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
        float rs = s.x / s.y; // Aspect screen size
        float ri = i.x / i.y; // Aspect image size
        vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
        vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
        return u * s / st + o;
      }

      varying vec2 vUv;
        void main() {
          vec2 uv = CoverUV(vUv, uRes, uImageRes);
          vec3 tex = texture2D(uTex, uv).rgb;
          gl_FragColor = vec4( tex, 1.0 );
        }
      `,
    }),
    [tex]
  );

  return (
    <mesh ref={$mesh} {...props}>
      <planeGeometry args={[width, height, 30, 30]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
};

export default Plane;
