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
  const y = (Math.floor(index / 3) % 3) - 1;
  const z = Math.floor(index / 9) - 1;
  const accent =
    Math.abs(x) + Math.abs(y) + Math.abs(z) >= 2 && (x + y + z) % 2 === 0;

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

      // Proximity hover logic using ticker for performance
      const mouse = { x: 0, y: 0, active: false };

      const handleMove = (event: PointerEvent) => {
        const bounds = root.getBoundingClientRect();
        mouse.x = event.clientX - bounds.left;
        mouse.y = event.clientY - bounds.top;
        mouse.active = true;

        const px = mouse.x / bounds.width - 0.5;
        const py = mouse.y / bounds.height - 0.5;

        // Tilt the entire container
        gsap.to(cube, {
          rotationX: -17 - py * 30,
          rotationZ: -4 + px * 20,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const updateProximity = () => {
        if (!mouse.active) return;

        items.forEach((item, i) => {
          const cubie = cubies[i];
          const itemBounds = item.getBoundingClientRect();
          const bounds = root.getBoundingClientRect();
          const itemCenterX =
            itemBounds.left + itemBounds.width / 2 - bounds.left;
          const itemCenterY =
            itemBounds.top + itemBounds.height / 2 - bounds.top;

          const dx = itemCenterX - mouse.x;
          const dy = itemCenterY - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 220;

          if (distance < maxDist) {
            const power = (1 - distance / maxDist) * 140;
            const angle = Math.atan2(dy, dx); // Corrected from Math.atan1

            gsap.to(item, {
              x: cubie.x * 72 + Math.cos(angle) * power,
              y: cubie.y * 72 + Math.sin(angle) * power,
              z: cubie.z * 72 + power * 0.6,
              rotateX: Math.cos(angle) * power * 0.5,
              rotateY: Math.sin(angle) * power * 0.5,
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            });
          } else {
            // Return to base position
            gsap.to(item, {
              x: cubie.x * 72,
              y: cubie.y * 72,
              z: cubie.z * 72,
              rotateX: 0,
              rotateY: 0,
              duration: 0.7,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });
      };

      gsap.ticker.add(updateProximity);

      // Enhanced Scroll Scattering (Higher-quality scattering)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      scrollTl
        .to(cube, {
          xPercent: 30,
          yPercent: -10,
          scale: 0.6,
          rotateX: -10,
          rotateY: 110,
        })
        .to(
          items,
          {
            x: (i) => cubies[i].x * 320 + gsap.utils.random(-100, 100), // More spread
            y: (i) => cubies[i].y * 320 + gsap.utils.random(-100, 100),
            z: (i) => cubies[i].z * 320 + gsap.utils.random(-100, 100),
            rotateX: () => gsap.utils.random(-360, 360),
            rotateY: () => gsap.utils.random(-360, 360),
            duration: 1,
            stagger: {
              amount: 0.3,
              from: "center",
            },
          },
          0,
        );

      const handlePointerLeave = () => {
        mouse.active = false;
        // Reset all cubies when mouse leaves the stage
        items.forEach((item, i) => {
          const cubie = cubies[i];
          gsap.to(item, {
            x: cubie.x * 72,
            y: cubie.y * 72,
            z: cubie.z * 72,
            rotateX: 0,
            rotateY: 0,
            duration: 1,
            ease: "expo.out",
            overwrite: "auto",
          });
        });
      };

      root.addEventListener("pointermove", handleMove);
      root.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        root.removeEventListener("pointermove", handleMove);
        root.removeEventListener("pointerleave", handlePointerLeave);
        gsap.ticker.remove(updateProximity);
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
            <span
              className={`${styles.face} ${styles.front} ${cubie.accent ? styles.accent : ""}`}
            />
            <span
              className={`${styles.face} ${styles.back} ${cubie.accent ? styles.accentDark : ""}`}
            />
            <span
              className={`${styles.face} ${styles.right} ${cubie.accent ? styles.accentDark : ""}`}
            />
            <span
              className={`${styles.face} ${styles.left} ${cubie.accent ? styles.accent : ""}`}
            />
            <span
              className={`${styles.face} ${styles.top} ${cubie.accent ? styles.accentLight : ""}`}
            />
            <span
              className={`${styles.face} ${styles.bottom} ${cubie.accent ? styles.accentDeep : ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
