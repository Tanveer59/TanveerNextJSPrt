"use client";
import { useEffect, useRef, useState } from "react";
import "./hero.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tektur, Rajdhani } from "next/font/google";
import DarkVeil from "./Darkvail";
import BlurText from "./HeroText";
import localFont from "next/font/local";
import StarBorder from "../button";
import SplashCursor from "./splashCursor";
const lucina = localFont({
    src: "./fonts/Luciana.otf",
    weight: "700",
});
// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);


const rajdhani = Rajdhani({
    subsets: ['latin'],
    weight: '400'
})

const tanveerekturFont = Tektur({
    subsets: ["latin"],
    weight: "400",
});

const Hero = () => {
    const heroTextRef = useRef(null);
    const backgroundRef = useRef(null);
    const descriptionRef = useRef(null);
    const buttonsRef = useRef(null);
    const [gradientAngle, setGradientAngle] = useState(290); // Initial angle

    useEffect(() => {

        // Animate description after title
        gsap.to(descriptionRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 1.2,
            ease: "power3.out"
        });

        // Animate buttons after description
        gsap.to(buttonsRef.current, {
            opacity: 1,
            duration: 0.8,
            delay: 1.5,
            ease: "power3.out"
        });

    }, []);

    return (
        <section
  ref={backgroundRef}
  className="background relative bg-cover bg-fixed w-full flex items-center justify-center overflow-hidden"
>
  {/* Background Layer */}
  <div className="absolute inset-0 z-0">
    <DarkVeil />
    <SplashCursor />
  </div>

  {/* Content Layer */}
  <div className="flex w-full  flex-col md:flex-row justify-center md:items-center content relative z-10">
    {/* Left content */}
    <div className="leftBar px-4 md:pl-20 flex items-center w-full text-center flex-col md:w-screen lg:w-[70vw] justify-center md:items-center lg:pr-6 min-h-[100vh] gap-[3vh]">

      <BlurText
        text="Code. Design. Innovate."
        delay={150}
        animateBy="words"
        direction="top"
        className={`${tanveerekturFont.className} flex justify-center`}
    />
      <h1
        ref={descriptionRef}
        className={`${rajdhani.className} text-white md:text-center lg:text-center md:text-2xl lg:text-[24px] mt-[-20px] w-[90%] opacity-0`}
      >
        I'm Tanveer, a Front-end Web Architect that enhances user experience and drives business growth.
      </h1>

      <div
        ref={buttonsRef}
        className="flex flex-col sm:flex-row gap-4 md:gap-8 lg:gap-6 w-full sm:w-auto"
      >
  
    <StarBorder
    as="button"
    className="custom-class"
    color="cyan"
    speed="5s"
    >
            <a
            href="#"
            className="w-full sm:w-auto transition delay-150 duration-300 ease-in-out shadow-md rounded-sm hover:text-white p-2 md:p-4 lg:p-3 cursor-pointer md:text-2xl lg:text-[24px] font-light text-center"
            >
            Contact Us &#8599;
            </a>
    </StarBorder>
    <StarBorder
    as="button"
    className="custom-class"
    color="cyan"
    speed="5s"
    >
                <a
          target="_blank"
          href="https://linkedin.com/in/tanveer-ahmad-9620a12b5"
          className="w-full sm:w-auto transition delay-150 duration-300 ease-in-out shadow-md rounded-sm hover:text-white p-2 md:p-4 lg:p-3 cursor-pointer md:text-2xl lg:text-[24px] font-light text-center"
        >
          LinkedIn &#8599;
        </a>
    </StarBorder>

      </div>
    </div>
  </div>
</section>

    );
};

export default Hero;
