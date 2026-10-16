"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/lenisRef";

gsap.registerPlugin(ScrollTrigger);

function hasOwnScroll(node: HTMLElement) {
  let el: HTMLElement | null = node;
  while (el && el !== document.body) {
    const { overflowX, overflowY } = getComputedStyle(el);
    const scrollsX =
      (overflowX === "auto" || overflowX === "scroll") &&
      el.scrollWidth > el.clientWidth + 1;
    const scrollsY =
      (overflowY === "auto" || overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight + 1;
    if (scrollsX || scrollsY) return true;
    el = el.parentElement;
  }
  return false;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
      prevent: (node) => {
        return (
          !!node.closest(
            "#klyro-widget, .klyro-widget, [data-klyro], [data-lenis-prevent]",
          ) || hasOwnScroll(node)
        );
      },
    });

    setLenis(lenis);

    const handleScroll = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", handleScroll);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
