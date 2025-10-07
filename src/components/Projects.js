"use client";

import Product from "./product/Product";
import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const dataArr = [
  {
    src: "uploads/1759663245533.png",
    tool: "Wordpress",
    link: "https://thepizzabox.co.uk/",
    state: "Completed",
    color: "bg-green-500",
    alt: "Wordpress Project",
    width: 800,
    height: 600,
  },
  {
    src: "uploads/1759663798558.png",
    tool: "Wordpress",
    link: "https://ursports.co/",
    state: "Completed",
    color: "bg-green-500",
    alt: "Wordpress Project",
    width: 800,
    height: 600,
  },
  {
    src: "uploads/1759664802629.png",
    tool: "Shopify",
    link: "https://www.finelinesuk.com/",
    state: "Completed",
    color: "bg-green-500",
    alt: "Shopify Project",
    width: 800,
    height: 600,
  },
  {
    src: "uploads/1759721449338.webp",
    tool: "Wordpress",
    link: "https://remitrio.com/",
    state: "Completed",
    color: "bg-green-500",
    alt: "Wordpress Project",
    width: 800,
    height: 600,
  },
  {
    src: "uploads/1759721672336.webp",
    tool: "Shopify",
    link: "https://www.highlandredstone.com/",
    state: "Completed",
    color: "bg-green-500",
    alt: "Shopify Project",
    width: 800,
    height: 600,
  },
  {
    src: "uploads/1759722346562.webp",
    tool: "Shopify",
    link: "https://3hscents.com/",
    state: "Completed",
    color: "bg-green-500",
    alt: "Shopify Project",
    width: 800,
    height: 600,
  },
  {
    src: "uploads/1759722525772.webp",
    tool: "Wordpress",
    link: "https://paklovebeauty.co.uk/",
    state: "Completed",
    color: "bg-green-500",
    alt: "Wordpress Project",
    width: 800,
    height: 600,
  },
  {
    src: "uploads/1759722719910.webp",
    tool: "Wordpress",
    link: "https://voguemensalon.vip/",
    state: "Completed",
    color: "bg-green-500",
    alt: "Wordpress Project",
    width: 800,
    height: 600,
  },
    {
    src: "uploads/1759663245533.png",
    tool: "Wordpress",
    link: "https://thepizzabox.co.uk/",
    state: "Completed",
    color: "bg-green-500",
    alt: "Wordpress Project",
    width: 800,
    height: 600,
  },
];

const MemoizedProduct = memo(Product);

const Projects = () => {
  const itemsPerPage = 9;
  const [projectsList, setProjectsList] = useState([]);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(itemsPerPage);
  const projectsRef = useRef(null);

  // ✅ Initialize data once
  useEffect(() => {
    setProjectsList(dataArr);
  }, []);

  // ✅ Show initial projects
  useEffect(() => {
    if (projectsList.length > 0) {
      setDisplayedProjects(projectsList.slice(0, itemsPerPage));
      setCurrentIndex(itemsPerPage);
    }
  }, [projectsList]);

  // ✅ Scroll-based reveal animation (GSAP + ScrollTrigger)
  useEffect(() => {
    if (!projectsRef.current) return;

    const ctx = gsap.context((self) => {
      const cards = self.selector(".product-card");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, projectsRef);

    return () => ctx.revert();
  }, [displayedProjects]);

  // ✅ Load more projects
  const loadMoreProjects = useCallback(() => {
    const nextIndex = currentIndex + 4;
    const newProjects = projectsList.slice(currentIndex, nextIndex);
    if (!newProjects.length) return;

    setDisplayedProjects((prev) => [...prev, ...newProjects]);
    setCurrentIndex(nextIndex);

    // Smooth scroll to new content
    setTimeout(() => {
      const lastCard = document.querySelector(".product-card:last-child");
      if (lastCard) {
        lastCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 300);
  }, [currentIndex, projectsList]);

  // ✅ Memoized cards
  const projectItems = useMemo(
    () =>
      displayedProjects.map((item, index) => (
        <div
          key={`${item.link}-${index}`}
          className="product-card opacity-0 transform transition-all duration-300 border border-transparent"
        >
          <MemoizedProduct
            src={item.src}
            tool={item.tool}
            link={item.link}
            st={item.state}
            clr={item.color}
            domain={item.link}
          />
        </div>
      )),
    [displayedProjects]
  );

  return (
    <div
      ref={projectsRef}
      className="flex flex-col items-center p-2 lg:px-20 pt-28 pb-28 w-full bg-[#060010]"
    >
      {/* Header */}
      <div className="outfit-light flex flex-col justify-start md:w-[100%]">
        <p className="pb-2 text-[#c7c7c7]">Feature Projects</p>
        <p className="md:text-2xl md:w-[70%] lg:text-2xl lg:w-[50%] text-white">
          I crafted digital solutions that showcase my passion and expertise in Web Design & Development!
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-10">
        {projectItems}
      </div>

      {/* Load More */}
      {currentIndex < projectsList.length && (
        <div className="w-full flex justify-end mt-8">
          <button
            onClick={loadMoreProjects}
            className="bg-black text-white hover:bg-white hover:text-black px-4 py-2 transition-all duration-300"
          >
            Load More Projects
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
