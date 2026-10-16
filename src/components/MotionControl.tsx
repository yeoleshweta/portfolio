"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";

const STORAGE_KEY = "animations-paused";

type MotionState = {
  /** OS reduced motion or the visitor's pause choice. */
  motionOff: boolean;
  userPaused: boolean;
  togglePaused: () => void;
};

const MotionContext = createContext<MotionState>({
  motionOff: false,
  userPaused: false,
  togglePaused: () => undefined,
});

export function useMotionOff() {
  return useContext(MotionContext).motionOff;
}

export function useMotionControl() {
  return useContext(MotionContext);
}

export default function MotionControl({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion() ?? false;
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    try {
      setUserPaused(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setUserPaused(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduce);
    document.documentElement.classList.toggle("animations-paused", userPaused);
  }, [reduce, userPaused]);

  const togglePaused = useCallback(() => {
    setUserPaused((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* storage unavailable; the choice still applies for this visit */
      }
      return next;
    });
  }, []);

  return (
    <MotionContext.Provider
      value={{ motionOff: reduce || userPaused, userPaused, togglePaused }}
    >
      {children}
    </MotionContext.Provider>
  );
}
