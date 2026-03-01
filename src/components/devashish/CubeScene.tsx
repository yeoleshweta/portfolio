"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./CubeScene.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const cubies = Array.from({ length: 27 }, (_, index) => {
  const x = (index % 3) - 1;
  const y = Math.floor(index / 3) % 3 - 1;
  const z = Math.floor(index / 9) - 1;
  const accent = Math.abs(x) + Math.abs(y) + Math.abs(z) >= 2 && (x + y + z) % 2 === 0;

  return {
    id: `cubie-${index}`,
    x,
    y,
    z,
    accent,
  };
});

export default function CubeScene() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const cube = root.querySelector<HTMLElement>("[data-cube]");
      const items = gsap.utils.toArray<HTMLElement>("[data-cubie]", root);

      if (!cube || items.length === 0) {
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .set(items, {
          opacity: 0,
          scale: 0.72,
          rotateX: () => gsap.utils.random(-70, 70),
          rotateY: () => gsap.utils.random(-90, 90),
          z: () => gsap.utils.random(-240, 240),
        })
        .to(cube, { autoAlpha: 1, duration: 0.01 })
        .to(
          items,
          {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            z: 0,
            duration: 1.35,
            stagger: {
              each: 0.025,
              from: "center",
              grid: [3, 9],
            },
          },
          0,
        )
        .fromTo(
          cube,
          { rotateX: -24, rotateY: 28, rotateZ: -6 },
          { rotateX: -17, rotateY: 36, rotateZ: -4, duration: 1.6 },
          0,
        );

      gsap.to(cube, {
        rotateY: "+=360",
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      gsap.to(cube, {
        rotateX: "+=8",
        rotateZ: "-=6",
        yoyo: true,
        repeat: -1,
        duration: 4.8,
        ease: "sine.inOut",
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        animation: gsap.timeline().to(cube, {
          xPercent: 18,
          yPercent: -12,
          scale: 0.72,
          rotateX: -8,
          rotateY: 96,
        }),
      });

      const handleMove = (event: PointerEvent) => {
        const bounds = root.getBoundingClientRect();
        const px = (event.clientX - bounds.left) / bounds.width - 0.5;
        const py = (event.clientY - bounds.top) / bounds.height - 0.5;

        gsap.to(cube, {
          rotationX: -17 - py * 10,
          rotationZ: -4 + px * 6,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      root.addEventListener("pointermove", handleMove);

      return () => {
        root.removeEventListener("pointermove", handleMove);
      };
    },
    { scope: rootRef },
  );

  return (
    <div className={styles.stage} ref={rootRef}>
      <div className={styles.cubeWrap} data-cube>
        {cubies.map((cubie) => (
          <div
            key={cubie.id}
            className={styles.cubie}
            data-cubie
            style={
              {
                "--x": cubie.x,
                "--y": cubie.y,
                "--z": cubie.z,
              } as CSSProperties
            }
          >
            <span className={`${styles.face} ${styles.front} ${cubie.accent ? styles.accent : ""}`} />
            <span className={`${styles.face} ${styles.back} ${cubie.accent ? styles.accentDark : ""}`} />
            <span className={`${styles.face} ${styles.right} ${cubie.accent ? styles.accentDark : ""}`} />
            <span className={`${styles.face} ${styles.left} ${cubie.accent ? styles.accent : ""}`} />
            <span className={`${styles.face} ${styles.top} ${cubie.accent ? styles.accentLight : ""}`} />
            <span className={`${styles.face} ${styles.bottom} ${cubie.accent ? styles.accentDeep : ""}`} />
          </div>
        ))}
      </div>
      <div className={styles.badge}>
        <span>Hover to play</span>
        <span className={styles.badgeArrow}>↗</span>
      </div>
    </div>
  );
}
