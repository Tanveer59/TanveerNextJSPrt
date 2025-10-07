"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { IoLogoLinkedin } from "react-icons/io5";

const CardNav = ({
  logo = "/TLOGO-1.svg",
  logoAlt = "Tanveer Logo",
  baseColor = "#ffffff",
  menuColor = "#000",
  buttonBgColor = "#000",
  buttonTextColor = "#fff",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const router = useRouter();

  const items = [
    {
      label: "Main Menu",
      bgColor: "#f3f4f6",
      textColor: "#000",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Resume", href: "/resume" },
        { label: "Certificate", href: "/certificate" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      label: "Socials",
      bgColor: "#111827",
      textColor: "#fff",
      links: [
        { label: "GitHub", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Instagram", href: "#" },
      ],
    },
    {
      label: "Contact Info",
      bgColor: "#e5e7eb",
      textColor: "#000",
      links: [
        { label: "tanveerwebdev@gmail.com", href: "mailto:tanveerwebdev@gmail.com" },
        { label: "+92 323-5623393", href: "tel:+923235623393" },
      ],
    },
  ];

  const setCardRef = (index) => (el) => {
    if (el) cardsRef.current[index] = el;
  };

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const content = navEl.querySelector(".card-nav-content");
    if (content) {
      content.style.height = "auto";
      const h = content.scrollHeight + 60; // plus header height
      return h;
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 40, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease: "power3.out" });
    tl.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.1,
      },
      "-=0.1"
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => tl && tl.kill();
  }, []);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    const content = navRef.current?.querySelector(".card-nav-content");

    if (!isExpanded) {
      setIsExpanded(true);
      setIsHamburgerOpen(true);
      gsap.set(content, { display: "flex", opacity: 1 });
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.reverse();
      tl.eventCallback("onReverseComplete", () => {
        gsap.set(content, { display: "none" });
        setIsExpanded(false);
      });
    }
  };

  const handleNavigation = (href) => {
    toggleMenu();
    router.push(href);
  };

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-4 w-[90%] max-w-[900px] z-[99]">
      <nav
        ref={navRef}
        className="rounded-xl shadow-lg overflow-hidden relative transition-all"
        style={{ backgroundColor: baseColor }}
      >
        {/* Top Bar */}
        <div className="flex justify-between items-center h-[60px] px-4 relative z-[2]">
          {/* Hamburger */}
          <div
            className="flex flex-col justify-center items-center cursor-pointer gap-[5px]"
            style={{ color: menuColor }}
            onClick={toggleMenu}
          >
            <span
              className={`block w-[28px] h-[2px] bg-current transition-all duration-300 ${
                isHamburgerOpen ? "translate-y-[5px] rotate-45" : ""
              }`}
            ></span>
            <span
              className={`block w-[28px] h-[2px] bg-current transition-all duration-300 ${
                isHamburgerOpen ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            ></span>
          </div>


          {/* CTA */}
          <button
            className="hidden md:inline-flex items-center gap-1 px-4 py-1 rounded-md font-medium transition-colors duration-300"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Tanveer Ahmad <IoLogoLinkedin />
          </button>
        </div>

        {/* Dropdown Content */}
        <div
          className="card-nav-content hidden flex-col md:flex-row gap-3 p-3"
          style={{ opacity: 0 }}
        >
          {items.map((item, idx) => (
            <div
              key={item.label}
              ref={setCardRef(idx)}
              className="flex flex-col flex-1 gap-2 p-4 rounded-lg"
              style={{
                backgroundColor: item.bgColor,
                color: item.textColor,
              }}
            >
              <div className="text-lg font-semibold">{item.label}</div>
              <div className="flex flex-col gap-1">
                {item.links.map((lnk, i) => (
                  <button
                    key={i}
                    onClick={() => handleNavigation(lnk.href)}
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity text-left"
                  >
                    <GoArrowUpRight /> {lnk.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
