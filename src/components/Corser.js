"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function Cursor() {
  useEffect(() => {
    let posX = 0,
      posY = 0;
    let mouseX = 0,
      mouseY = 0;

    const animateCursor = gsap.to(".cursor", {
      duration: 0.018,
      repeat: -1,
      onRepeat: function () {
        posX += (mouseX - posX) / 8;
        posY += (mouseY - posY) / 8;
        gsap.set(".cursor", { left: posX - 1, top: posY - 2 });
      },
    });

    const updateMousePosition = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", updateMousePosition);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      animateCursor.kill(); // Cleanup animation
    };
  }, []);

  return <div className="cursor hidden lg:block"></div>;
}
