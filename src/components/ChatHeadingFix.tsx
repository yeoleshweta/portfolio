"use client";

import { useEffect } from "react";

/** Klyro injects its own h1. Keep the page to a single h1 in the hero. */
export default function ChatHeadingFix() {
  useEffect(() => {
    const demote = () => {
      document.querySelectorAll("h1").forEach((heading) => {
        if (heading.closest("#main-content")) return;
        const next = document.createElement("h2");
        next.innerHTML = heading.innerHTML;
        for (const attr of heading.attributes) {
          next.setAttribute(attr.name, attr.value);
        }
        heading.replaceWith(next);
      });
    };

    demote();
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.closest("#main-content")) return;
          if (node.matches("h1")) {
            demote();
            return;
          }
          if (node.querySelector("h1")) demote();
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
