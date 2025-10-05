'use client';
import { useEffect } from "react";
import gsap from "gsap";

export const useGsapGlobal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll("*"); // Select all elements

    gsap.from(elements, {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, []);
};
