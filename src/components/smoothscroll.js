// components/SmoothScroll.js
"use client"; // Ensure this runs only on the client side
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "@studio-freight/lenis";

const SmoothScroll = () => {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.1, // Adjust easing for smooth effect
      smoothWheel: true, // Enable smooth scrolling for mouse wheel events
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", () => ScrollTrigger.update());

    // Use GSAP ticker for smoother frame updates
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Cleanup function to remove event listeners and destroy Lenis instance
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SmoothScroll;
