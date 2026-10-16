"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLenis } from "@/lib/lenisRef";
import { scrollToSection } from "@/lib/scrollToSection";

/** After a cross-page navigation to /#section, scroll once the target exists. */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;

    let frames = 0;
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tryScroll = () => {
      const ready = document.getElementById(id);
      const lenisReady = reduce || getLenis();
      if (ready && lenisReady) {
        scrollToSection(id, false);
        return;
      }
      if (frames++ < 40) raf = requestAnimationFrame(tryScroll);
    };
    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
